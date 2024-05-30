import { error } from "@sveltejs/kit"
import data from "$lib/data.json"

export async function load({ params }) {
  const project = data.projects.find((project) => project.slug === params.slug)

  if (project) {
    return { project, projects: data.projects }
  } else {
    error(404, "Cannot find a project with this slug.")
  }
}
