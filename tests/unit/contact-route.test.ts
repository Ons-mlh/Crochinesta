import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const { sendEmail, Resend } = vi.hoisted(() => ({
  sendEmail: vi.fn(),
  Resend: vi.fn(),
}));

vi.mock("resend", () => ({ Resend }));

let post: typeof import("../../src/app/api/contact/route").POST;

beforeAll(async () => {
  vi.stubEnv("RESEND_API_KEY", "test-api-key");
  vi.stubEnv("CONTACT_FROM_EMAIL", "website@example.com");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", undefined);
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", undefined);
  ({ POST: post } = await import("../../src/app/api/contact/route"));
});

afterAll(() => vi.unstubAllEnvs());

beforeEach(() => {
  vi.clearAllMocks();
  Resend.mockImplementation(() => ({ emails: { send: sendEmail } }));
  sendEmail.mockResolvedValue({ data: { id: "test-email-id" }, error: null });
});

function postContact(body: string) {
  return post(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    }),
  );
}

describe("POST /api/contact", () => {
  it("sends a valid contact message through the mocked provider", async () => {
    const response = await postContact(
      JSON.stringify({
        name: "Ada Lovelace",
        email: "ada@example.com",
        subject: "A question",
        message: "I would like to ask about a custom piece.",
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendEmail.mock.calls[0][0]).toMatchObject({
      from: "website@example.com",
      replyTo: "ada@example.com",
      subject: "A question",
    });
  });

  it("returns field errors for an invalid payload without sending email", async () => {
    const response = await postContact(
      JSON.stringify({
        name: "A",
        email: "not-an-email",
        subject: "",
        message: "short",
      }),
    );

    expect(response.status).toBe(400);
    expect((await response.json()).fieldErrors).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON without sending email", async () => {
    const response = await postContact("{");

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Request body must be valid JSON.",
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("returns a gateway error when the email provider fails", async () => {
    sendEmail.mockResolvedValue({ data: null, error: new Error("provider down") });

    const response = await postContact(
      JSON.stringify({
        name: "Ada Lovelace",
        email: "ada@example.com",
        subject: "",
        message: "I would like to ask about a custom piece.",
      }),
    );

    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({ error: expect.any(String) });
    expect(sendEmail).toHaveBeenCalledOnce();
  });

  it("escapes user content in the email and removes subject newlines", async () => {
    const response = await postContact(
      JSON.stringify({
        name: "<img src=x onerror=alert(1)>",
        email: "ada+offers@example.com",
        subject: "Order\r\nBcc: attacker@example.com",
        message: '<script>alert("x")</script> & thank you.',
      }),
    );
    const email = sendEmail.mock.calls[0][0];

    expect(response.status).toBe(200);
    expect(email.subject).toBe("Order Bcc: attacker@example.com");
    expect(email.html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(email.html).toContain(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; thank you.",
    );
    expect(email.html).toContain("mailto:ada%2Boffers@example.com");
    expect(email.html).not.toContain("<script>");
  });

  it("returns a gateway error when the email provider throws", async () => {
    sendEmail.mockRejectedValue(new Error("provider unavailable"));

    const response = await postContact(
      JSON.stringify({
        name: "Ada Lovelace",
        email: "ada-throw@example.com",
        subject: "",
        message: "I would like to ask about a custom piece.",
      }),
    );

    expect(response.status).toBe(502);
    expect(sendEmail).toHaveBeenCalledOnce();
  });
});
