<script lang="ts">
  import type { Snippet } from "svelte"
  import { cn } from "$lib/utils"

  interface Props {
    children: Snippet
    href: string
    class?: string
  }

  let { children, href, class: classname }: Props = $props()

  const target = href.startsWith("http") ? "_blank" : "_self"
  const rel = href.startsWith("http") ? "noopener noreferrer" : ""
</script>

<a
  class={cn(classname, "flex gap-2 items-center font-mono hover:brightness-90 group")}
  {rel}
  {target}
  {href}
>
  {@render children()}
  <span
    class="scale-125 top-0.5 rotate-45 -translate-x-3.5 relative group-hover:translate-none group-hover:rotate-none transition-all opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus:rotate-none group-focus:translate-none"
    >&#8599;</span
  >
</a>
