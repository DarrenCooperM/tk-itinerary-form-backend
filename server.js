const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const sendEmail = require("./routes/SendEmail");

app.use("/post", sendEmail);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
