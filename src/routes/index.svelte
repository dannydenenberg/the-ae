<script context="module">
  import { HELLO, client, DO } from "./../graphql/client";

  export async function preload(page, session) {
    // let data = await client.query({ query: HELLO });
    let data = await client.mutate({ mutation: DO });
    return data;
  }
</script>

<script>
  export let data;

  let send = async () => {
    let data = await client.query({ query: HELLO });
    console.log(data);
  };
</script>

<style>
  body {
    font: times;
    color: red;
  }
</style>

<svelte:head>
  <title />
</svelte:head>
You should
<a href="/about">see grass.</a>
or see
<a href="/form">forms</a>

<pre>{JSON.stringify(data)}</pre>

<div>
  <button on:click={send}>req</button>
</div>
