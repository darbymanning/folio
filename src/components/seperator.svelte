<script lang="ts">
  import { cn } from "$lib/utils"

  interface Props {
    class?: string
  }

  let { class: classname }: Props = $props()
</script>

<hr class={cn("border-t border-gray-400/15", classname)} />
