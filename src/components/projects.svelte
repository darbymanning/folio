<script lang="ts">
  import type data from "$lib/data.json"
  import { format_list } from "$lib/utils"

  interface Props {
    projects: (typeof data)["projects"]
    exclude?: string
    title?: string
  }

  let { projects, exclude, title = "Projects" }: Props = $props()
</script>

{#snippet project({ name, slug, outputs, stack })}
  <a href="/projects/{slug}" class="grid">
    <h2 class="heading-2">{name}</h2>
    <span class="font-semibold text-gray-400">{format_list(outputs)}</span>
    <span class="mt-4">{format_list(stack)}</span>
  </a>
{/snippet}

<section class="print:hidden p-10 grid gap-20 relative" id="projects">
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
