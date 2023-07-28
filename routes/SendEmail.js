const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-email", async (req, res) => {
  let { email, subject, itinerary } = req.body;

  console.log("Received POST request:", req.body);

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
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${itinerary
              .map(
                (item) => `
              <tr>
                <td>${item.activity}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.description}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    res.send("Email sent: " + info.response);
  } catch (err) {
    res.status(500).send("Failed to send email.");
  }
});

module.exports = router;
