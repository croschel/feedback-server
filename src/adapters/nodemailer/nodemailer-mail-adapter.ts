import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "24fc0f46b62e1c",
    pass: "ac1dc210fed97e",
  },
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendEmail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Caique Roschel <croschel000@gmail.com>",
      subject,
      html: body,
    });
  }
}
