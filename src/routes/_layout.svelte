<script>
  let gatherHeaderInfo = async () => {
    console.log("in gatherHeaderInfo");

    let page = { path: "" };

    if (typeof window !== "undefined") {
      page = {
        path: window.location.pathname || "",
      };
    }

    if (isListingF(page.path)) {
      let listingID = page.path.split("/")[2];

      let res = await fetch(`/api/listing?listingID=${listingID}`, {
        method: "post",
      });
      let json = await res.json();

      console.log(json);

      hostname = json.area.hostname;
      category = json.category;
      topic = json.attributes.topic;
      isListing = true;

      console.log("is listings!");
    } else if (isSearchF(page.path)) {
      console.log("is search!!");
    }
  };

  // path looks like this
  // (1) /~uno/search?aslfjkjh
  // (2) /listing/89asfiy9sadf98ys8f

  function isSearchF(path) {
    return path.split("/")[2] == "search";
  }

  function isListingF(path) {
    return path.split("/")[1] == "listing";
  }

  import { onMount } from "svelte";
  export let segment;
  export let category, topic, hostname, isListing;

  onMount(() => {
    gatherHeaderInfo();
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

{#if segment == 'listing'}
  <div style="display:none">{gatherHeaderInfo()}</div>
  <p>listing!!</p>
{/if}
{#if segment != 'listing'}
  <div style="display:none">{gatherHeaderInfo()}</div>
  <p>search!!</p>
{/if}
<main>
  <header class="global-header">
    <a class="header-logo" name="logoLink" href="/">AE</a>
    <nav class="breadcrumbs-container">
      <ul class="breadcrumbs">
        <li class="crumb area">
          <p>
            {#if isListing}<a href="/~{hostname}">{hostname}</a>{/if}
            <span class="breadcrumb-arrow">&gt;</span>
          </p>
        </li>

        <li class="crumb section">
          <p>
            {#if isListing}
              <a
                href="/~{hostname}/search?topic={topic.abbreviation}">{topic.description}</a>
            {/if}
            <span class="breadcrumb-arrow">&gt;</span>
          </p>
        </li>

        <li class="crumb category">
          <p>
            {#if isListing}
              <a
                href="/~{hostname}/search?category={category.abbreviation}">{category.description}</a>
            {/if}
          </p>
        </li>
      </ul>
    </nav>

    <div class="userlinks">
      <ul class="user-actions">
        <li class="user post"><a href="/make">post</a></li>
        |&nbsp;
        <li class="user account"><a href="/account">account</a></li>
      </ul>
    </div>
  </header>
  <slot />
</main>
