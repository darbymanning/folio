import { test, expect } from "@playwright/test"

test("allows a user to submit a contact form", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("link", { name: "Contact" }).click()

  await page.getByRole("textbox", { name: "Name", exact: true }).click()
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Joe Bloggs")
  await page.getByLabel("Email").click()
  await page.getByLabel("Email").fill("joe@bloggs.example")
  await page.getByLabel("Message").click()
  await page.getByLabel("Message").fill("Ah hey man, love your site.")
  await page.getByRole("button", { name: "Send message" }).click()

  await expect(page.getByText("Thank you for your message.")).toBeVisible()
  await expect(page.getByTestId("honeypot")).not.toBeVisible()
})

test("pretends the form is submitted when a honeypot field is filled", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("link", { name: "Contact" }).click()

  await page.getByRole("textbox", { name: "Name", exact: true }).click()
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Joe Bloggs")
  await page.getByLabel("Email").click()
  await page.getByLabel("Email").fill("joe@bloggs.example")
  await page.getByLabel("Message").click()
  await page
    .getByLabel("Message")
    .fill("Ah hey man, love your site. I'm definitely not a bot ... heh")
  await page.getByLabel("First name").fill("I'm a bot")
  await page.getByRole("button", { name: "Send message" }).click()

  // Pretend message is sent
  await expect(page.getByText("Thank you for your message.")).toBeVisible()

  // Honeypot testid is visible
  await expect(page.getByTestId("honeypot")).toBeVisible()
})
