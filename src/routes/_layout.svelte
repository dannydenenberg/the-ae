<script context="module">
  export let segment;
  export async function preload(page, session) {
    console.log("page:");
    console.log(page);

    console.log("session:");
    console.log(session);
  }
</script>

<script>
  import { onMount } from "svelte";
  export let segment;
  onMount(() => {
    console.log(`segment: ${segment}`);
  });
</script>

<style>
  .global-header {
    *zoom: 1;
    border-bottom: 1px #ccc solid;
    background: #eee;
    height: 100%;
    line-height: 1.925em;
    min-height: 1.6em;
    padding: 0.3125em 0;
    width: 100%;
    z-index: 1003;
  }
  .header-logo {
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
    background-color: #fff;
    border: 1px solid #ccc;
    float: left;
    line-height: 1;
    margin: 0 5px;
    padding: 0.25em;
    text-decoration: none;
  }

  main {
    background: white;
    color: #222;
    font-family: "Arial", sans-serif;
  }
  .breadcrumbs-container {
    float: left;
    font-size: 0.9375em;
    min-height: 1.3em;
    position: relative;
  }

  .user-actions {
    float: right;
    list-style: none;
    margin: 0;
    display: flex;
    margin-right: 10px;
  }

  .userlinks .user:first-child {
    padding-left: 0;
    padding-right: 0.5em;
  }

  .userlinks {
    float: right;
    padding: 0;
    position: absolute;
    *position: static;
    right: 0;
  }

  ul.breadcrumbs {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    line-height: 0;
  }
</style>

<main>
  <header class="global-header">
    <a class="header-logo" name="logoLink" href="/">AE</a>
    <nav class="breadcrumbs-container">
      <ul class="breadcrumbs">
        <li class="crumb area">
          <p>
            <a href="/">omaha</a>

            <span class="breadcrumb-arrow">&gt;</span>
          </p>
        </li>

        <li class="crumb section">
          <p>
            <a href="/search/ccc">community</a>

            <span class="breadcrumb-arrow">&gt;</span>
          </p>
        </li>

        <li class="crumb category">
          <p><a href="/search/mis">missed connections</a></p>
        </li>
      </ul>
    </nav>

    <div class="userlinks">
      <ul class="user-actions">
        <li class="user post">
          <a href="https://post.craigslist.org/c/oma">post</a>
        </li>
        |&nbsp;
        <li class="user account">
          <a href="https://accounts.craigslist.org/login/home">account</a>
        </li>
      </ul>
    </div>
  </header>
  <slot />
</main>
