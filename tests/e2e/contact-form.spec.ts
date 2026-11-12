import { expect, test } from "@playwright/test";

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
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Subject (optional)").fill("Custom order");
  await page
    .getByLabel("Message")
    .fill("I would like to ask about a custom crochet piece.");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByRole("heading", { name: "Message sent" })).toBeVisible();
  expect(submittedBody).toEqual({
    name: "Ada Lovelace",
    email: "ada@example.com",
    subject: "Custom order",
    message: "I would like to ask about a custom crochet piece.",
  });
});
