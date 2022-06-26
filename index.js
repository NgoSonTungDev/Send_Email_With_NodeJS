const express = require("express");
var nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());


app.post("/sendMail", async (req, res) => {
  const { email } = req.body;
  const option = {
    service: "gmail",
    auth: {
      user: "tungdeveloper01@gmail.com",
      pass: "tungdev3901",
    },
  };
  var transporter = await nodemailer.createTransport(option);

  await transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Kết nối thành công!");
      var mail = {
        from: "tungdeveloper01@gmail.com",
        to: `${email}`,
        subject: "Thư được gửi bằng Node.js",
        text: "Toidicode.com học lập trình online miễn phí",
      };

     transporter.sendMail(mail, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is runing path ${PORT}`));
