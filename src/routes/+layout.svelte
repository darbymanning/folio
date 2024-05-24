<script>
  import "../app.css"
  let { children } = $props()
</script>

<svelte:head>
  <title>Darby Manning</title>
  <meta
    name="description"
    content="A seasoned self-taught Software Engineer, with experience in agencies and private companies using technology to solve real-world problems."
  />
</svelte:head>

{@render children()}
