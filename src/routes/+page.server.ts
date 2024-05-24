import data from "./data.json"

export async function load({ locals }) {
  return { ...data, locals }
}
