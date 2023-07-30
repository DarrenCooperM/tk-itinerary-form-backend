const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Email = require("../schema/emailSchema"); // import the model

router.post("/send-email", async (req, res) => {
  let { email, subject, itinerary } = req.body;

  console.log("Received POST request:", req.body);

  // Save the data to MongoDB
  const newEmail = new Email({
    email,
    subject,
    itinerary,
  });

  try {
    await newEmail.save();
  } catch (err) {
    return res.status(500).send("Failed to save email details.");
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  let mailOptions = {
    from: "dcoopermatila@gmail.com", // sender
    to: email, // receiver
    subject: subject,
    html: `
        <div style="font-family: Arial, sans-serif; margin: 0 auto; padding: 20px; max-width: 600px;">
          <h2 style="text-align: center;">Your Itinerary for ${subject}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="border: 1px solid #ddd; padding: 8px;">Activity</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Date</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Time</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${itinerary
                .map(
                  (item) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.activity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.date}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.time}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <p style="text-align: center; margin-top: 30px;">Thank you for using our service. Have a great day!</p>
        </div>
      `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    res.send("Email sent: " + info.response);
  } catch (err) {
    res.status(500).send("Failed to send email.");
  }
});

router.get("/sent-emails", async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (err) {
    res.status(500).send("Failed to fetch emails.");
  }
});

router.delete("/delete-email/:id", async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).send("No email found.");

    await Email.deleteOne({ _id: req.params.id });

    console.log(
      `Email with ID: ${req.params.id} has been deleted. Email details: `,
      email
    );

    res.json({ message: "Email deleted." });
  } catch (err) {
    return res.status(500).send("Failed to delete email.");
  }
});

module.exports = router;
