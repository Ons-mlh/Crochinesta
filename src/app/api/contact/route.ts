import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

type FieldErrors = Partial<
  Record<"name" | "email" | "subject" | "message", string>
>;

const EMAIL_PATTERN = /^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function validate(payload: ContactPayload): {
  values: { name: string; email: string; subject: string; message: string };
  errors: FieldErrors;
} {
  const values = {
    name: typeof payload.name === "string" ? payload.name.trim() : "",
    email: typeof payload.email === "string" ? payload.email.trim() : "",
    subject: typeof payload.subject === "string" ? payload.subject.trim() : "",
    message: typeof payload.message === "string" ? payload.message.trim() : "",
  };
  const errors: FieldErrors = {};

  if (values.name.length < 2 || values.name.length > 150) {
    errors.name = "Name must be between 2 and 150 characters.";
  }
  if (values.email.length > 254 || !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (values.subject.length > 150) {
    errors.subject = "Subject must be 150 characters or fewer.";
  }
  if (values.message.length < 10 || values.message.length > 5000) {
    errors.message = "Message must be between 10 and 5000 characters.";
  }

  return { values, errors };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json(
      { error: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const { values, errors } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fieldErrors: errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "crochinesta@gmail.com";

  if (!apiKey || !from) {
    console.error(
      "Contact email is not configured (RESEND_API_KEY/CONTACT_FROM_EMAIL).",
    );
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = values.subject.replace(/[\r\n]+/g, " ").trim();
  const escapedName = escapeHtml(values.name);
  const escapedEmail = escapeHtml(values.email);
  const escapedMessage = escapeHtml(values.message).replace(/\r?\n/g, "<br>");
  const replySubject = encodeURIComponent(
    `Re: ${subject || "Crochinesta contact form message"}`,
  );

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Arial, sans-serif; background-color: #f7f7f5; padding: 32px 16px; margin: 0;">
      <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5ddd7;">
        <div style="background-color: #4e1807; padding: 24px 32px; text-align: center;">
          <p style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 0.05em;">🧶 Crochinesta</p>
          <p style="margin: 4px 0 0; font-size: 12px; color: #efe9e4;">New contact form submission</p>
        </div>
        <div style="padding: 32px;">
          <p style="margin: 0 0 24px; font-size: 14px; color: #7c6f67; line-height: 1.6;">You've received a new message from your website contact form.</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-size: 12px; color: #7c6f67; text-transform: uppercase; letter-spacing: 0.05em; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-size: 14px; color: #4e1807; font-weight: 600;">${escapedName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; color: #7c6f67; text-transform: uppercase; letter-spacing: 0.05em; width: 80px; vertical-align: top; border-top: 1px solid #efe9e4;">Email</td>
              <td style="padding: 8px 0; font-size: 14px; color: #4e1807; border-top: 1px solid #efe9e4;"><a href="mailto:${escapedEmail}" style="color: #4e1807; text-decoration: underline;">${escapedEmail}</a></td>
            </tr>
          </table>
          ${subject ? `<p style="margin: 0 0 8px; font-size: 12px; color: #7c6f67; text-transform: uppercase; letter-spacing: 0.05em;">Subject</p><p style="margin: 0 0 24px; font-size: 14px; color: #4e1807;">${escapeHtml(subject)}</p>` : ""}
          <div>
            <p style="margin: 0 0 8px; font-size: 12px; color: #7c6f67; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <div style="background-color: #f0ebe7; border-radius: 12px; padding: 16px; font-size: 14px; color: #4e1807; line-height: 1.7;">${escapedMessage}</div>
          </div>
          <div style="text-align: center; margin-top: 28px;">
            <a href="mailto:${escapedEmail}?subject=${replySubject}" style="display: inline-block; background-color: #4e1807; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 24px; border-radius: 999px;">Reply to ${escapedName}</a>
          </div>
        </div>
        <div style="padding: 16px 32px; text-align: center; border-top: 1px solid #efe9e4;">
          <p style="margin: 0; font-size: 11px; color: #b8a898;">Sent from the Crochinesta website contact form</p>
        </div>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: subject || "New contact form submission",
      html,
      text: `Name: ${values.name.replace(/[\r\n]+/g, " ")}\nEmail: ${values.email}\n\n${values.message}`,
    });

    if (error) {
      console.error("Contact email provider rejected a message.", error);
      return NextResponse.json(
        { error: "We could not send your message. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact email provider request failed.", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
