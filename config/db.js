const mongoose = require("mongoose");

const connDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(conn.connection.host);
};

module.exports = connDB;
