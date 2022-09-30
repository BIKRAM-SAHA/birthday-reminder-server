require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conn2db = require("./config/db");
const bodyparser = require("body-parser");
const birthdayRoute = require("./routes/birthdaysRoute");
const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middleware.js/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
conn2db();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", userRoute);
app.use("/birthday", birthdayRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
  console.log(process.env.STATUS);
});
