const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    email: String,
    subject: String,
    itinerary: [
      {
        activity: String,
        date: String,
        time: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", emailSchema);
