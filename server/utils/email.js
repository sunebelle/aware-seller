import nodemailer from "nodemailer";
import ejs from "ejs";
import { convert } from "html-to-text";

//https://www.tabnine.com/code/javascript/functions/html-to-text/fromStringhttps://www.tabnine.com/code/javascript/functions/html-to-text/fromString
export default class Email {
  constructor(user, data, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.data = data;
    this.from = `Sunebelle <${process.env.EMAIL_FROM}>`;
  }

  //  create a transporter : mailgun or sendgrid
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }

    return nodemailer.createTransport({
      // mailtrap
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Send the actual email
  async send(path, subject) {
    try {
      // 1) Render HTML based on a ejs path
      const html = await ejs.renderFile(path, {
        firstName: this.firstName,
        url: this.url,
        products: this.data.products,
        totalAmount: this.data.totalAmount,
        discount: this.data.discount,
        shippingFree: this.data.shippingFree,
        subject,
      });
      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html),
      };

      // 3) Create a transport and send email
      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }

    // // 2) Define email options
    // const mailOptions = {
    //   from: this.from,
    //   to: this.to,
    //   subject,
    //   html,
    //   text: convert(html),
    // };

    // // 3) Create a transport and send email
    // await this.newTransport().sendMail(mailOptions);
  }

  async sendCheckout() {
    await this.send("./views/checkout.ejs", "Xác nhận đơn hàng");
  }

  // send resetPassword email
}
