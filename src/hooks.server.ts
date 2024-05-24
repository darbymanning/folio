import { dev } from "$app/environment"
import { SHOW_PRIVATE_DATA_PARAM, MOBILE_NUMBER, EMAIL, ADDRESS } from "$env/static/private"

const SHOW_COOKIE_NAME = "show-private-data"

export async function handle({ event, resolve }) {
  const show_private_data =
    event.cookies.get(SHOW_COOKIE_NAME) || event.url.searchParams.has(SHOW_PRIVATE_DATA_PARAM)

  if (show_private_data) {
    event.locals.private_data = {
      email: EMAIL,
      mobile: MOBILE_NUMBER,
      address: ADDRESS,
    }

    event.cookies.set(SHOW_COOKIE_NAME, "true", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: !dev,
    })
  }

  return resolve(event)
}
