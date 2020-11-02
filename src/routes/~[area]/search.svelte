<script context="module">
  // `/search?category=apt&topic=xxx
  export async function preload(page, session) {
    let hostname = page.params.area; // uno, harvard, exeter, etc.
    let category = page.query.category;
    let topic = page.query.topic;
    let pagination = page.query.page;
    let textQuery = page.query.query;

    // turn the page.query object into URL string queries
    let otherQueries = Object.keys(page.query)
      .map((key) => `${key}=${page.query[key]}`)
      .join("&");

    let getSearchResultQuery = `/api/search?hostname=${hostname}&${otherQueries}`;

    let listings = [];
    let error = false;

    try {
      let res = await this.fetch(getSearchResultQuery);
      let json = await res.json();

      listings = json.listings;
    } catch {
      error = true;
    }

    return {
      listings,
      error,
      hostname,
      category,
      topic,
      pagination,
      textQuery,
    };
  }
</script>

<script>
  import { onMount } from "svelte";

  export let listings;
  export let error;
  export let hostname;
  export let category;
  export let topic;
  export let pagination;
  export let textQuery;

  onMount(() => {
    if (error) {
      alert("there was an error.");
    }

    console.log(listings);
  });
</script>

<style>
  #query {
    -webkit-flex-grow: 1;
    -moz-flex-grow: 1;
    -ms-flex-grow: 1;
    flex-grow: 1;
    font-size: 1.1em;
    height: 2em;
    line-height: 1.45em;
    min-width: 7em;
    padding: 0 3px 0 8px;
    width: 70%;
    vertical-align: top;

    border: 1px solid #ccc;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin: 0;
    padding: 2px;
  }

  #results {
    font-family: "Times", serif;
  }
</style>

<h1>Search here.</h1>

<p>form here. method is GET. everything will be gotten in PRELOAD.</p>

<form action="/~{hostname}/search" method="GET">
  <input
    id="query"
    type="text"
    name="query"
    placeholder="query..."
    value={textQuery || ''} />

  <!-- Hidden inputs to maintain category,topic,page queryies in URL -->
  <!-- This allows these queryies to stay in the URL after submitting. -->
  {#if topic}<input type="hidden" name="topic" value={topic} />{/if}
  {#if category}<input type="hidden" name="category" value={category} />{/if}
  {#if pagination}<input type="hidden" name="page" value={pagination} />{/if}

  <ul id="results">
    {#each listings as { title, attributes, _id }}
      <li><a href="/listing/{_id}">{title}</a></li>
    {/each}
  </ul>

  <button type="submit">Search</button>
</form>
