"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormProps = {
  includeSubject?: boolean;
};

type ApiResponse = {
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
};

const inputClassName =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 font-sans text-sm text-[var(--primary)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20";

export default function ContactForm({
  includeSubject = true,
}: ContactFormProps) {
  const [form, setForm] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<ApiResponse["fieldErrors"]>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function updateField(field: keyof ContactFormValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setStatusMessage("");
    setIsSuccess(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: includeSubject ? form.subject : "",
          message: form.message,
        }),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setStatusMessage(
          result.error ?? "We could not send your message. Please try again.",
        );
        return;
      }

      setIsSuccess(true);
      setStatusMessage("Thank you for reaching out! We’ll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatusMessage(
        "We could not send your message. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderField(
    field: keyof ContactFormValues,
    label: string,
    type: "text" | "email" | "textarea",
    options: { required?: boolean; rows?: number } = {},
  ) {
    const errorId = `${field}-error`;
    const commonProps = {
      id: field,
      name: field,
      value: form[field],
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => updateField(field, event.target.value),
      placeholder: label,
      required: options.required,
      maxLength:
        field === "name"
          ? 150
          : field === "email"
            ? 254
            : field === "subject"
              ? 150
              : 5000,
      "aria-invalid": Boolean(fieldErrors[field]),
      "aria-describedby": fieldErrors[field] ? errorId : undefined,
      className: inputClassName,
    };

    return (
      <div key={field}>
        <label className="sr-only" htmlFor={field}>
          {label}
        </label>
        {type === "textarea" ? (
          <textarea {...commonProps} rows={options.rows ?? 4} />
        ) : (
          <input {...commonProps} type={type} />
        )}
        {fieldErrors[field] ? (
          <p id={errorId} className="mt-1 font-sans text-xs text-red-600">
            {fieldErrors[field]}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      {renderField("name", "Name", "text", { required: true })}
      {renderField("email", "Email", "email", { required: true })}
      {includeSubject
        ? renderField("subject", "Subject (optional)", "text")
        : null}
      {renderField("message", "Message", "textarea", {
        required: true,
        rows: includeSubject ? 5 : 4,
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full bg-(--primary) py-3 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>

      <p
        className="font-sans text-sm text-(--primary)"
        role={statusMessage ? (isSuccess ? "status" : "alert") : undefined}
        aria-live={statusMessage ? (isSuccess ? "polite" : "assertive") : undefined}
      >
        {statusMessage}
      </p>
    </form>
  );
}
