import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  //1. create a transporter : mailgun or sendgrid
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //2. define the email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  //3. Actually send email
  await transporter.sendMail(mailOptions);
};
export default sendEmail;
