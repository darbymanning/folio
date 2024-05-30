import { send } from "$lib/mail.server.js"
import { fail } from "@sveltejs/kit"

export const actions = {
  async default({ request }) {
    const data = await request.formData()

    const [name, email, message] = [data.get("name"), data.get("email"), data.get("message")]

    if (!name || !email || !message) {
      return fail(400, {
        name,
        email,
        message,
        missing: true,
      })
    }

    try {
      await send({
        TextBody: `
New contact message submission from ${name}.

Name: ${name}
Email: ${email}
Message: ${message}
`.trim(),
      })

      return { sent: true }
    } catch (error) {
      console.error(error)
      return fail(500, { failed: true })
    }
  },
}
