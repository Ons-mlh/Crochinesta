"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
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

type FormField = keyof ContactFormValues;
type FieldErrors = Partial<Record<FormField, string>>;
type ApiResponse = {
  error?: string;
  fieldErrors?: FieldErrors;
};

const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/;

const inputClassName =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 font-sans text-sm text-[var(--primary)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20";

function validate(values: ContactFormValues, includeSubject: boolean): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2 || name.length > 150) {
    errors.name = "Enter a name between 2 and 150 characters.";
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (includeSubject && values.subject.length > 150) {
    errors.subject = "Subject must be 150 characters or fewer.";
  }
  if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Your message needs at least ${MESSAGE_MIN_LENGTH} characters.`;
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Your message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }

  return errors;
}

export default function ContactForm({
  includeSubject = true,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validationErrors = validate(form, includeSubject);

  function updateField(field: FormField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setServerErrors((current) => ({ ...current, [field]: undefined }));
    setStatusMessage("");
  }

  function markTouched(field: FormField) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);
    setServerErrors({});
    setStatusMessage("");

    const errors = validate(form, includeSubject);
    if (Object.keys(errors).length > 0) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }

    setIsSubmitting(true);

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
        setServerErrors(result.fieldErrors ?? {});
        setStatusMessage(
          result.error ?? "We could not send your message. Please try again.",
        );
        requestAnimationFrame(() => {
          formRef.current
            ?.querySelector<HTMLElement>('[aria-invalid="true"]')
            ?.focus();
        });
        return;
      }

      setIsSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setHasSubmitted(false);
    } catch {
      setStatusMessage(
        "We could not send your message. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function startAnotherMessage() {
    setIsSuccess(false);
    setStatusMessage("");
    requestAnimationFrame(() => document.getElementById("name")?.focus());
  }

  function renderField(
    field: FormField,
    label: string,
    type: "text" | "email" | "textarea",
    options: { required?: boolean; rows?: number; hint?: string } = {},
  ) {
    const errorId = `${field}-error`;
    const hintId = `${field}-hint`;
    const shouldShowError = Boolean(touched[field] || hasSubmitted);
    const error = serverErrors[field] ??
      (shouldShowError ? validationErrors[field] : undefined);
    const hasHint = field === "message" || Boolean(options.hint);
    const describedBy = [error ? errorId : undefined, hasHint ? hintId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;
    const maxLength =
      field === "name" ? 150 : field === "email" ? 254 : field === "subject" ? 150 : MESSAGE_MAX_LENGTH;
    const commonProps = {
      id: field,
      name: field,
      value: form[field],
      onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => updateField(field, event.target.value),
      onBlur: () => markTouched(field),
      placeholder: label,
      required: options.required,
      maxLength,
      "aria-invalid": Boolean(error),
      "aria-describedby": describedBy,
      className: `${inputClassName} ${error ? "border-red-600 focus:ring-red-600/20" : ""}`,
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
        {field === "message" ? (
          <div className="mt-1 flex items-start justify-between gap-3 font-sans text-xs text-(--muted-foreground)">
            <p id={hintId}>
              {form.message.trim().length < MESSAGE_MIN_LENGTH
                ? `At least ${MESSAGE_MIN_LENGTH} characters`
                : "A little more detail helps us reply"}
            </p>
            <span
              aria-label={`${form.message.length} of ${MESSAGE_MAX_LENGTH} characters`}
              className={
                form.message.length >= MESSAGE_MAX_LENGTH - 100
                  ? "shrink-0 font-medium text-amber-700"
                  : "shrink-0"
              }
            >
              {form.message.length} / {MESSAGE_MAX_LENGTH}
            </span>
          </div>
        ) : options.hint ? (
          <p id={hintId} className="mt-1 font-sans text-xs text-(--muted-foreground)">
            {options.hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="mt-1 font-sans text-xs text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  if (isSuccess) {
    return (
      <section
        aria-labelledby="contact-success-title"
        className="rounded-2xl border border-(--border) bg-white p-6 text-center shadow-sm sm:p-8"
        role="status"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto h-11 w-11 text-green-700"
          strokeWidth={1.7}
        />
        <h2
          id="contact-success-title"
          className="mt-4 font-serif text-2xl text-(--primary)"
        >
          Message sent
        </h2>
        <p className="mx-auto mt-2 max-w-sm font-sans text-sm leading-relaxed text-(--muted-foreground)">
          Thank you for reaching out! We’ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={startAnotherMessage}
          className="mt-6 rounded-full border border-(--border) px-5 py-2.5 font-sans text-sm font-semibold text-(--primary) transition-colors hover:bg-(--accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2"
        >
          Send another message
        </button>
      </section>
    );
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      noValidate
    >
      {renderField("name", "Name", "text", { required: true })}
      {renderField("email", "Email", "email", { required: true })}
      {includeSubject
        ? renderField("subject", "Subject (optional)", "text")
        : null}
      {renderField("message", "Message", "textarea", {
        required: true,
        rows: includeSubject ? 5 : 4,
      })}

      {statusMessage ? (
        <p
          className="font-sans text-sm text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {statusMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full bg-(--primary) py-3 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary) focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
