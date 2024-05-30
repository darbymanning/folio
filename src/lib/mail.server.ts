import { ServerClient } from "postmark"
import { EMAIL, POSTMARK_API_TOKEN } from "$env/static/private"

const client = new ServerClient(POSTMARK_API_TOKEN)

type Options = Parameters<typeof client.sendEmail>[0]

type AtLeastOneBody = Pick<Options, "TextBody" | "HtmlBody">
type EmailArgs = Partial<Options> & AtLeastOneBody

export async function send(args: EmailArgs) {
  const Contact = `Darby Manning <${EMAIL}>`

  const options: Options = {
    From: Contact,
    To: Contact,
    Subject: "Contact form submission",
    MessageStream: "contact-enquiries",
    ...args,
  }

  return await client.sendEmail(options)
}
