<script lang="ts">
  import "../app.css"
  import { page } from "$app/stores"
  import { projects } from "$lib/data.json"
  import { fly } from "svelte/transition"
  import { afterNavigate, beforeNavigate } from "$app/navigation"
  import Contact from "../components/contact.svelte"
  import Seperator from "$components/seperator.svelte"
  import "locomotive-scroll/locomotive-scroll.css"
  import { cn, is_reduced_motion } from "$lib/utils"

  let locomotive_scroll: import("locomotive-scroll").default | undefined

  afterNavigate(async () => {
    if (is_reduced_motion()) return

    const { default: LocomotiveScroll } = await import("locomotive-scroll")
    locomotive_scroll = new LocomotiveScroll({ autoStart: false })
    locomotive_scroll.start()
  })

  beforeNavigate(() => {
    locomotive_scroll?.destroy()
  })

  let { children } = $props()

  // eslint-disable-next-line svelte/valid-compile
  const is_project_page = $derived($page.route.id?.includes("/projects/"))

  function is_project(slug: string) {
    return $page.params.slug === slug
  }
</script>

<svelte:head>
  <title>Darby Manning</title>
  <meta
    name="description"
    content="A seasoned, self-taught Software Engineer with experience in both agencies and private companies, using technology to solve real-world problems."
  />
</svelte:head>

<nav
  class="print:hidden border-b gap-4 border-gray-400/15 sticky top-0 bg-black/50 backdrop-blur-xl z-10 min-h-24 items-center flex"
>
  <div
    class="p-10 py-6 max-w-7xl mx-auto w-full flex justify-between flex-wrap items-center gap-y-4"
  >
    <ol class="flex gap-10 font-mono font-light flex-wrap">
      {#if is_project_page}
        <li><a href="/">Resume</a></li>
      {:else}
        <li><a data-scroll-to data-scroll-to-offset="-100" href="#resume">Resume</a></li>
      {/if}
      <li><a data-scroll-to data-scroll-to-offset="-100" href="#projects">Projects</a></li>
      <li><a data-scroll-to data-scroll-to-offset="-100" href="#contact">Contact</a></li>
    </ol>
    {#if is_project_page}
      <ol class="flex font-mono font-light overflow-auto py-2" transition:fly={{ y: -100 }}>
        {#each projects as project}
          <li>
            <a
              class={cn(
                { "bg-gray-400/15": is_project(project.slug) },
                "p-3 px-6 font-semibold rounded-full whitespace-nowrap -outline-offset-3"
              )}
              href="/projects/{project.slug}">{project.name}</a
            >
          </li>
        {/each}
      </ol>
    {/if}
  </div>
</nav>

<main class="max-w-7xl mx-auto relative grid gap-10 md:gap-40">
  {@render children()}
  <Seperator class="print:hidden" />
  <Contact />
  <footer class="print:hidden p-10 text-center grid gap-10">
    <Seperator />
    <span class="text-gray-500">
      <figure class="text-4xl">👋</figure>
      Yup, that's all...
    </span>
  </footer>
</main>
