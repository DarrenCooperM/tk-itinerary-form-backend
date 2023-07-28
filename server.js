const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const app = express();
app.use(cors());
app.use(express.json());

const sendEmail = require("./routes/SendEmail");

app.use("/post", sendEmail);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
