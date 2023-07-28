const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Email", emailSchema);
