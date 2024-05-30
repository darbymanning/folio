<script lang="ts">
  import Seperator from "$components/seperator.svelte"
  import Link from "$components/link.svelte"
  import Projects from "$components/projects.svelte"
  import { format_list } from "$lib/utils.js"

  let { data } = $props()
</script>

{#key data.project.slug}
  <section class="grid gap-10 md:gap-40">
    <header class="grid md:grid-cols-[2fr_1fr] grid-rows-[auto_1fr]">
      <div
        class="grid gap-4 font-mono p-10 h-[50vh] max-h-[600px] col-span-full items-end animate-[fade-in_1s_200ms_ease-out_forwards] opacity-0"
      >
        {#if data.project.logo}
          <img
            fetchpriority="high"
            class="w-96 max-h-32 max-w-[60vw] h-auto size-full"
            src={data.project.logo}
            alt="{data.project.name} Logo"
          />
        {:else}
          <h1 class="heading-1">{data.project.name}</h1>
        {/if}
      </div>

      <Seperator class="col-span-full" />

      <div
        class="grid gap-3 p-10 content-start animate-[fade-in_1s_300ms_ease-out_forwards] opacity-0 text-lg prose"
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html data.project.headline}
      </div>

      <aside
        class="p-10 md:border-l border-gray-400/15 grid gap-4 content-start justify-items-start"
      >
        <ul class="list-box animate-[fade-in_1s_500ms_ease-out_forwards] opacity-0">
          {#each data.project.stack as stack}
            <li>{stack}</li>
          {/each}
        </ul>
        <span class="text-gray-400 animate-[fade-in_1s_550ms_ease-out_forwards] opacity-0">
          {format_list(data.project.works)}
        </span>
        <Link
          href={data.project.url}
          class="animate-[fade-in_1s_600ms_ease-out_forwards] opacity-0"
        >
          {new URL(data.project.url).host}
        </Link>
        {#if data.project.agency || data.project.credits}
          <Seperator class="w-14 my-4 animate-[fade-in_1s_650ms_ease-out_forwards] opacity-0" />
          {#if data.project.agency}
            <p
              class="text-sm flex font-mono gap-1.5 animate-[fade-in_1s_700ms_ease-out_forwards] opacity-0"
            >
              <span class="text-gray-400">Agency:</span>
              {#if data.project.agency.url}
                <Link href={data.project.agency.url}>
                  {data.project.agency.name}
                </Link>
              {:else}
                {data.project.agency.name}
              {/if}
            </p>
          {/if}
          {#if data.project.credits}
            <p
              class="text-sm flex font-mono items-start flex-col animate-[fade-in_1s_750ms_ease-out_forwards] opacity-0"
            >
              <span class="text-gray-400">Credits:</span>
              {#each data.project.credits as credit}
                <Link href={credit.url}
                  >{credit.name} <span class="text-gray-600">/</span>
                  <span class="text-gray-400">{credit.role}</span></Link
                >
              {/each}
            </p>
          {/if}
        {/if}
      </aside>
    </header>

    {#if data.project.image}
      <figure
        class="p-4 md:p-10 md:opacity-[var(--progress)]"
        data-scroll
        data-scroll-speed="0.1"
        data-scroll-offset="0,100%"
        data-scroll-css-progress
      >
        <img
          loading="lazy"
          class="xl:w-[calc(100%+200px)] xl:-mx-[100px] xl:max-w-none rounded-3xl animate-[fade-in_1s_500ms_ease-out_forwards] opacity-0"
          src={data.project.image}
          alt={data.project.name}
        />
      </figure>
    {/if}

    {#if data.project.content}
      <div
        class="2xl:w-4/5 3xl:w-3/5 p-10 animate-[fade-in_1s_800ms_ease-out_forwards] opacity-0 grid gap-3 text-lg prose"
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html data.project.content}
      </div>
    {/if}

    <Seperator />

    <Projects projects={data.projects} exclude={data.project.slug} title="More Projects…" />
  </section>
{/key}
