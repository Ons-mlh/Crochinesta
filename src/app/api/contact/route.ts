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

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: subject || `New contact message from ${values.name}`,
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(values.name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(values.email)}</p>`,
        `<p><strong>Message:</strong></p><p>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p>`,
      ].join(""),
      text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
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
