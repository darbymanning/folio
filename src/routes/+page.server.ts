import data from "$lib/data.json"

export async function load({ locals }) {
  return { ...data, locals }
}
