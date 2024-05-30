<script lang="ts">
  import Projects from "$components/projects.svelte"
  import Resume from "../components/resume.svelte"
  import Seperator from "$components/seperator.svelte"

  let { data } = $props()
</script>

<Resume {...data} />
<Seperator />
<Projects {...data} />
