import { expect, test } from "@playwright/test";

const localizedContactPages = [
  {
    locale: "en",
    direction: "ltr",
    name: "Name",
    email: "Email",
    message: "Message",
    heading: "Get in touch",
  },
  {
    locale: "fr",
    direction: "ltr",
    name: "Nom",
    email: "E-mail",
    message: "Message",
    heading: "Contactez-nous",
  },
  {
    locale: "ar",
    direction: "rtl",
    name: "الاسم",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    heading: "تواصلوا معنا",
  },
] as const;

test("contact page supports English, French, and Arabic", async ({ page }) => {
  for (const { locale, direction, name, email, message, heading } of localizedContactPages) {
    await page.goto(`/${locale}/contact`);

    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", direction);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(page.getByLabel(name)).toBeVisible();
    await expect(page.getByLabel(email)).toBeVisible();
    await expect(page.getByLabel(message)).toBeVisible();
  }
});

test("language switcher keeps the current page across locales", async ({ page }) => {
  await page.goto("/en/contact");

  for (const locale of ["fr", "ar", "en"] as const) {
    await page.getByRole("button", { name: /language|langue|اللغة/i }).click();
    await page.getByRole("group", { name: /language|langue|اللغة/i })
      .getByRole("button", { name: new RegExp(`\\b${locale}\\b`, "i") })
      .click();

    await expect(page).toHaveURL(new RegExp(`/${locale}/contact$`));
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  }
});

test("contact form translates string field errors returned by the API", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({
        fieldErrors: { name: "Name must be between 2 and 150 characters." },
      }),
    });
  });

  await page.goto("/fr/contact");
  await page.getByLabel("Nom").fill("A");
  await page.getByLabel("E-mail").fill("ada@example.com");
  await page.getByLabel("Message").fill("Question sur une création au crochet.");
  await page.getByRole("button", { name: "Envoyer le message" }).click();

  await expect(page.getByText("Le nom doit contenir au moins 2 caractères.")).toBeVisible();
});

test("visitor can submit the contact form", async ({ page }) => {
  let submittedBody: unknown;

  await page.route("**/api/contact", async (route) => {
    expect(route.request().method()).toBe("POST");
    submittedBody = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  await page.goto("/contact");
  await expect(page).toHaveURL(/\/en\/contact$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page
    .getByLabel("Message")
    .fill("I would like to ask about a custom crochet piece.");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(
    page.getByText(
      "Thank you for reaching out! We'll get back to you within 24 hours. ✧",
    ),
  ).toBeVisible();
  expect(submittedBody).toEqual({
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "I would like to ask about a custom crochet piece.",
  });
});
