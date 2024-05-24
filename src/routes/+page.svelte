<script lang="ts">
  export let data
</script>

{#snippet role_snippet({ title, company, company_url, start, end, bullets })}
  <div class="flex gap-2 text-xl items-center flex-wrap">
    <h2 class="font-mono">
      {title}
    </h2>
    <figure class="text-gray-600">/</figure>
    {#if company_url}
      <a
        href={company_url}
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono text-gray-500 hover:underline hover:brightness-150"
      >
        {company}
      </a>
    {:else}
      <span class="font-mono text-gray-500">{company}</span>
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

<div class="max-w-7xl mx-auto relative grid md:grid-cols-[2fr_1fr] h-screen grid-rows-[auto_1fr]">
  <header class="grid gap-4 font-mono border-b border-gray-300/15 p-10 pt-48 col-span-full">
    <h1 class="text-6xl">Darby Manning</h1>
    <span class="text-gray-400">Software Engineer</span>
    <ul class="flex items-center space-x-4">
      <li class="size-6">
        <a href="https://github.com/darbymanning" target="_blank" class="hover:brightness-75">
          <img alt="View my GitHub profile" src="/github.svg" />
        </a>
      </li>
      <li class="size-6">
        <a href="https://x.com/LittleDotDarby" target="_blank" class="hover:brightness-75">
          <img alt="View my Twitter profile" src="/x.svg" />
        </a>
      </li>
    </ul>
  </header>

  <main class="grid gap-20 p-10 content-start">
    <p class="text-lg">
      A seasoned self-taught Software Engineer, with experience in agencies and private companies
      using technology to solve real-world problems.
    </p>
    <section class="grid gap-8">
      <h1 class="font-mono text-3xl">Employment</h1>
      <ol class="grid gap-4">
        {#each data.roles as role}
          <li>
            {@render role_snippet(role)}
          </li>
        {/each}
      </ol>
    </section>
  </main>

  <aside class="p-10 md:border-l border-gray-300/15 grid gap-10 content-start">
    {#if data.locals.private_data}
      <div class="grid gap-2 font-mono">
        <div class="grid">
          <a
            class="hover:underline hover:brightness-75"
            href="tel:{data.locals.private_data.mobile.replaceAll(' ', '')}"
            >{data.locals.private_data.mobile}</a
          >
          <a
            class="hover:underline hover:brightness-75"
            href="mailto:{data.locals.private_data.email}">{data.locals.private_data.email}</a
          >
        </div>
        <address class="whitespace-break-spaces">
          {data.locals.private_data.address}
        </address>
      </div>
    {/if}

    {#each data.skills as s}
      <ul class="list-box">
        {#each s as skill}
          <li>{skill}</li>
        {/each}
      </ul>
    {/each}
  </aside>

  <img
    class="rounded-full right-0 -translate-y-16 size-[80vw] max-h-[600px] max-w-[600px] opacity-30 absolute pointer-events-none -z-10"
    src="me.jpg"
    alt="A truly beautiful man"
  />
</div>

<style>
  .list-box {
    margin-left: var(--spacing-4);
    position: relative;

    li::before {
      position: absolute;
      left: calc(-1 * var(--spacing-4));
      margin-top: 0.6em;
      content: "";
      display: block;
      width: var(--spacing-2);
      height: var(--spacing-2);
      background-color: var(--color-gray-600);
    }
  }
</style>
