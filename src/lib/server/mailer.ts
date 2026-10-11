import "server-only";
import nodemailer from "nodemailer";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "0");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const to = process.env.CONTACT_NOTIFICATION_TO ?? "danielhachac@gmail.com";

  if (!host || !port || !user || !pass || !from) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    );
  }

  return { host, port, user, pass, from, to };
}

function createSmtpTransport() {
  const config = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return { config, transporter };
}

export async function sendContactNotificationEmail(payload: {
  name: string;
  email: string;
  country: string;
  phone?: string;
  businessInquiry: string;
  projectDetails: string;
  expectedStartDate?: string;
  expectedEndDate?: string;
}) {
  const { config, transporter } = createSmtpTransport();

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: payload.email,
    subject: `New contact form submission from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Country: ${payload.country}`,
      `Phone: ${payload.phone || "Not provided"}`,
      `Business inquiry: ${payload.businessInquiry}`,
      `Project details: ${payload.projectDetails}`,
      `Expected start date: ${payload.expectedStartDate || "Not provided"}`,
      `Expected end date: ${payload.expectedEndDate || "Not provided"}`,
    ].join("\n"),
  });
}

export async function sendPasswordResetEmail(email: string, code: string) {
  const { config, transporter } = createSmtpTransport();

  await transporter.sendMail({
    from: config.from,
    to: email,
    subject: "Your portfolio password reset code",
    text: [
      `Your password reset code is: ${code}`,
      "",
      "This code expires in 5 minutes and can only be used once.",
      "If you did not request this change, you can ignore this email.",
    ].join("\n"),
  });
}
