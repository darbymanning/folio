<script lang="ts">
  import { page } from "$app/stores"

  // eslint-disable-next-line svelte/valid-compile
  const message = $derived($page.error?.message)
</script>

<section class="p-10 py-32 grid gap-2 justify-items-start">
  <h1 class="text-8xl font-mono">{$page.status}</h1>
  <p>{message}</p>
  <a href="/" class="bg-gray-400/15 px-6 py-2 mt-6">Back to home</a>
</section>
