<script context="module">
  import { HELLO, client, DO } from "./../graphql/client";
  export async function preload(page, session) {
    // let data = await client.query({ query: HELLO });
    let data = await client.mutate({ mutation: DO });
    return { data, jwtData: session.jwtData };
  }
</script>

<script>
  export let data;
  export let jwtData;

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
  <title>root</title>
</svelte:head>
You should
<a href="/about">see grass.</a>
or see
<a href="/form">forms</a>

<ul>
  <li>
    <a href="/join">join</a>
  </li>
  <li>
    <a href="/verify?_id=jas8f&code=asdl">verify</a>
  </li>
  <li>
    <a href="/logon">logon</a>
  </li>
  <li>
    <a href="/make">make</a>
  </li>
</ul>

<p>
  or check out
  <a href="/files">files.</a>
</p>

<pre>{JSON.stringify(data)}</pre>

<div>
  <button on:click={send}>req</button>
</div>

<div>Cookie is validated: {jwtData}</div>

<!-- <LoadingDots /> -->
