import { ServerClient } from "postmark"
import { EMAIL, POSTMARK_API_TOKEN } from "$env/static/private"
import type { MessageSendingResponse } from "postmark/dist/client/models"

const client = new ServerClient(POSTMARK_API_TOKEN)

type Options = Parameters<typeof client.sendEmail>[0]

type AtLeastOneBody = Pick<Options, "TextBody" | "HtmlBody">
type EmailArgs = Partial<Options> & AtLeastOneBody

export async function send(args: EmailArgs): Promise<MessageSendingResponse | { error: true }> {
  const Contact = `Darby Manning <${EMAIL}>`

  const options: Options = {
    From: Contact,
    To: Contact,
    Subject: "Contact form submission",
    MessageStream: "contact-enquiries",
    ...args,
  }

  try {
    const result = await client.sendEmail(options)
    if (result instanceof Error) throw result
    return result
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}
