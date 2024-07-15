import { send } from "$lib/mail.server.js"
import { label_id } from "$lib/utils.js"
import { fail } from "@sveltejs/kit"

export const actions = {
  async default({ request }) {
    const data = await request.formData()

    // Pretend to spam bots that the form was sent
    if (data.get("first_name")) return { sent: true, honey: true }

    const [name, email, message] = [
      data.get(label_id("name")),
      data.get(label_id("email")),
      data.get(label_id("message")),
    ]

    if (!name || !email || !message) {
      return fail(400, {
        name,
        email,
        message,
        missing: true,
      })
    }

    try {
      const result = await send({
        TextBody: `
New contact message submission from ${name}.

Name: ${name}
Email: ${email}
Message: ${message}
`.trim(),
      })

      if ("error" in result) return fail(500, { failed: true })
      if (result.ErrorCode) return fail(400, { failed: true })

      return { sent: true }
    } catch (error) {
      console.error(error)
      return fail(500, { failed: true })
    }
  },
}
