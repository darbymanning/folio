<script lang="ts">
  import type data from "$lib/data.json"
  import { format_list } from "$lib/utils"
  import { onMount } from "svelte"

  interface Props {
    projects: (typeof data)["projects"]
    exclude?: string
    title?: string
  }

  let { projects, exclude, title = "Projects" }: Props = $props()

  let printing = $state(false)

  onMount(() => {
    const set_printing = {
      true: () => (printing = true),
      false: () => (printing = false),
    }
    window.addEventListener("beforeprint", set_printing.true)
    window.addEventListener("afterprint", set_printing.false)

    return () => {
      window.removeEventListener("beforeprint", set_printing.true)
      window.removeEventListener("afterprint", set_printing.false)
    }
  })
</script>

{#snippet project(project: Props["projects"][number])}
  <a href={printing ? project.url : `/projects/${project.slug}`} class="grid">
    <h2 class="heading-2">{project.name} - {format_list(project.outputs)}</h2>
    <div class="hidden print:grid gap-2 text-lg">
      <strong class="text-bold">{project.url.replace("https://", "")}</strong>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html project.headline}
      <ul class="list-box">
        {#each project.headline_points as point}
          <li>{point}</li>
        {/each}
      </ul>
    </div>
    <dl class="mt-4">
      <dt class="font-bold text-gray-400">Techologies</dt>
      <dd>{format_list(project.stack)}</dd>
    </dl>
  </a>
{/snippet}

<section class="p-10 grid print:gap-8 gap-20 relative break-before-page" id="projects">
  <h1
    data-scroll
    data-scroll-speed="0.01"
    data-scroll-css-progress
    class="heading-1 opacity-[var(--progress)]"
  >
    {title}
  </h1>
  <ol class="group grid gap-12">
    {#each projects as p, index}
      {#if p.slug !== exclude}
        <li
          data-scroll
          data-scroll-css-progress
          data-scroll-speed={index * 0.01}
          class="project opacity-[var(--progress)] hover:opacity-100"
        >
          {@render project(p)}
        </li>
      {/if}
    {/each}
  </ol>
</section>
