// post: domain//api/contact
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  //1. create a transporter
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
    from: "sunebellee@gmail.com",
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  //3. Actually send email
  await transporter.sendMail(mailOptions);
};
export default sendEmail;

// const emailing = async (req, res) => {
//   const contact = req.body;
//   // console.log(contact);
//   try {
//     await sendEmail({
//       to: "matkiengtronvo@gmail.com",
//       subject: `${contact.name}  ${contact.email}`,
//       text: contact.message + " " + contact.date,
//     });
//     await sendEmail({
//       to: contact.email,
//       subject: "Sunebelle's Thanks",
//       text: `Hi ${contact.name}. I will contact you as soon as possible. Thank you again`,
//     });
//     res.status(200).json({
//       status: "success",
//       message: "successfull sent email to user",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default emailing;
