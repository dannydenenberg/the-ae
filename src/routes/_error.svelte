<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<span>{status}</span>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
