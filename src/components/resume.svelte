<script lang="ts">
  import Link from "$components/link.svelte"
  import type { PageData } from "../routes/$types"
  import Seperator from "./seperator.svelte"

  let { roles, locals, skills, links }: PageData = $props()
</script>

{#snippet role_snippet({ title, company, start, end, bullets })}
  <div class="flex gap-2 text-xl items-center flex-wrap">
    <h2 class="font-mono">
      {title}
    </h2>
    <figure class="text-gray-600">/</figure>
    {#if company.url}
      <Link class="text-gray-500" href={company.url}>
        {company.name}
      </Link>
    {:else}
      <span class="font-mono text-gray-500">{company.name}</span>
    {/if}
  </div>
  <span class="text-gray-500 font-mono">
    <time>{start}</time> - <time>{end}</time>
  </span>
  {#if bullets}
    <ul class="list-box m-4">
      {#each bullets as bullet}
        <li>{bullet}</li>
      {/each}
    </ul>
  {/if}
{/snippet}

<section class="grid md:grid-cols-[2fr_1fr] grid-rows-[auto_1fr]" id="resume">
  <header
    data-scroll
    data-scroll-speed="0.2"
    class="grid gap-4 font-mono p-10 h-[50vh] max-h-[600px] content-end col-span-full"
  >
    <h1
      data-scroll
      data-scroll-speed="0.25"
      class="animate-[fade-in_1s_300ms_ease-out_forwards] opacity-0 heading-1"
    >
      Darby Manning
    </h1>
    <span
      data-scroll
      data-scroll-speed="0.2"
      class="animate-[fade-in_1s_350ms_ease-out_forwards] opacity-0 text-gray-400"
    >
      Software Engineer
    </span>
    <ul
      data-scroll
      data-scroll-css-progress
      data-scroll-speed="0.1"
      data-scroll-offset="0,20%"
      class="flex items-center space-x-4 opacity-[calc(1_-_var(--progress))]"
    >
      {#each links as link, index}
        {@const delay = 600 + index * 50}
        <li class="size-5">
          <a
            style="--delay: {delay}ms"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            class="animate-[fade-in_1s_var(--delay)_ease-out_forwards] opacity-0 hover:brightness-75"
          >
            <img alt="Find me on {link.name}" title="Find me on {link.name}" src={link.icon} />
          </a>
        </li>
      {/each}
    </ul>
  </header>

  <Seperator class="col-span-full" />

  <div
    class="grid gap-20 p-10 content-start animate-[fade-in_1s_500ms_ease-out_forwards] opacity-0"
  >
    <p class="text-lg">
      A seasoned self-taught Software Engineer, with experience in agencies and private companies
      using technology to solve real-world problems.
    </p>
    <section class="grid gap-8">
      <h1 class="heading-2">Employment</h1>
      <ol class="grid gap-4">
        {#each roles as role}
          <li>
            {@render role_snippet(role)}
          </li>
        {/each}
      </ol>
    </section>
  </div>

  <aside class="p-10 md:border-l border-gray-400/15">
    <div class="grid gap-10 content-start animate-[fade-in_1s_700ms_ease-out_forwards] opacity-0">
      {#if locals.private_data}
        <div class="grid gap-2 font-mono">
          <div class="grid justify-items-start">
            <Link href="tel:{locals.private_data.mobile.replaceAll(' ', '')}">
              {locals.private_data.mobile}
            </Link>
            <Link href="mailto:{locals.private_data.email}">
              {locals.private_data.email}
            </Link>
          </div>
          <address class="whitespace-break-spaces">
            {locals.private_data.address}
          </address>
        </div>
      {/if}
      {#each skills as s}
        <ul class="list-box">
          {#each s as skill}
            <li>{skill}</li>
          {/each}
        </ul>
      {/each}
    </div>
  </aside>

  <figure
    class="absolute pointer-events-none -z-10 right-0 -translate-y-16 animate-[fade-in_1s_600ms_ease-out_forwards] opacity-0"
  >
    <img
      fetchpriority="high"
      data-scroll
      data-scroll-speed="0.05"
      data-scroll-css-progress
      class="rounded-full size-[80vw] max-h-[700px] max-w-[700px] opacity-[calc(0.5_-_var(--progress))]"
      src="me.jpg"
      alt="A truly beautiful man"
    />
  </figure>
</section>
