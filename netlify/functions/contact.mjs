
import { Resend } from "resend";

const json = (statusCode, payload) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

export async function handler(event) {
  // Only POST requests are allowed
  if (event.httpMethod !== "POST") {
    return json(405, {
      error: "Use POST to send a message.",
    });
  }

  // Read form data
  let input;

  try {
    input = JSON.parse(event.body || "{}");
  } catch {
    return json(400, {
      error: "The form data could not be read.",
    });
  }

  // Extract and validate fields
  const name = String(input.name || "").trim();
  const email = String(input.email || "").trim();
  const subject = String(input.subject || "")
      .replace(/[\r\n]+/g, " ")
      .trim();
  const message = String(input.message || "").trim();

  // Honeypot spam protection
  if (input.website) {
    return json(400, {
      error: "The form submission was rejected.",
    });
  }

  if (
      !name ||
      name.length > 100 ||
      !subject ||
      subject.length > 180 ||
      !message ||
      message.length > 5000
  ) {
    return json(400, {
      error: "Please check the name, subject, and message.",
    });
  }

  if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return json(400, {
      error: "Please enter a valid email address.",
    });
  }

  // Check environment variables
  if (
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_TO_EMAIL ||
      !process.env.CONTACT_FROM_EMAIL
  ) {
    console.error("Email environment variables are missing.");

    return json(503, {
      error: "Email service is not configured yet.",
    });
  }

  // Send email through Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend delivery error:", error);

      return json(502, {
        error: "Email delivery failed. Please try again later.",
      });
    }

    return json(200, {
      ok: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error(
        "Contact function error:",
        error?.message || error
    );

    return json(500, {
      error: "Something went wrong. Please try again.",
    });
  }
}
