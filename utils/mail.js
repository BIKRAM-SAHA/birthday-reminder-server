const nodemailer = require("nodemailer");
const birthdayModel = require("../models/birthdayModel");
const userModel = require("../models/userModel");

const mail = async () => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const userList = await userModel.find().select("-password");
  userList.forEach(async (user) => {
    const birthdayList = await birthdayModel.find({ user: user._id });
    const birthdaysToday = birthdayList.filter((birthday) => {
      const dob = new Date(birthday.dob);
      const tommorrow = new Date(new Date().setDate(new Date().getDate() + 1));
      if (
        dob.getMonth() === tommorrow.getMonth() &&
        dob.getDate() === tommorrow.getDate()
      ) {
        return true;
      }
      return false;
    });
    const mailBody = birthdaysToday
      .map((birthday) => {
        return `<li>${birthday.name} DOB: ${new Date(
          birthday.dob
        ).toDateString()}</li>`;
      })
      .join(" ");

    // send mail with defined transport object
    let info = await transporter.sendMail(
      {
        from: `"Bikram" ${process.env.EMAIL}`, // sender address
        to: `${user.email}`,
        subject: "Birthday Reminder",
        html: `<h2>Birthdays tommorrow ${birthdaysToday.length}</h2>
              <br/>
              <p>
                <ul>
                  ${mailBody}
                <ul>
              </p>`,
      },
      function (err) {
        if (err) {
          if (
            err.response ===
            "501 5.1.6 Recipient addresses in single label domains not accepted"
          ) {
            console.log(`Email address not ok! for ${user._id} ${user.name}`);
          } else {
            console.log(err);
          }
        }
      }
    );
    // console.log("Reminder sent: %s", info.messageId);
  });
};

module.exports = { mail };
