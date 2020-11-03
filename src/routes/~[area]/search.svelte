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

    // gather categories/topic
    let allCategories = [];
    let allTopics = [];

    try {
      let res = await this.fetch("/api/categories");
      let json = await res.json();
      allCategories = json;
      allCategories.push({ abbreviation: "", description: "all" });

      res = await this.fetch("/api/topics");
      json = await res.json();
      allTopics = json;
    } catch {
      error = true;
    }

    console.log("LISTINGS");
    console.log(listings);

    return {
      allCategories,
      allTopics,
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

  export let allCategories;
  export let allTopics;

  export let listings;
  export let error;
  export let hostname;
  export let category;
  export let topic;
  export let pagination;
  export let textQuery;

  // which topic and category is selected in the header options
  let categoryToTopic = (cat) => {
    for (let i = 0; i < allTopics.length; i++) {
      if (allTopics[i].categories.includes(cat)) {
        return allTopics[i];
      }
    }
    return {};
  };
  export let topicSelected = "",
    categorySelected = "";
  if (category) {
    categorySelected = category;
    topicSelected = categoryToTopic(category).abbreviation;
  } else {
    categorySelected = "";

    if (topic) {
      topicSelected = topic;
    } else {
      topicSelected = allTopics[0].abbreviation;
    }
  }

  onMount(() => {
    if (error) {
      alert("there was an error.");
    }

    console.log("ALL CATEGORIES THEN ALL TOPICS");
    console.log(allCategories);
    console.log(allTopics);

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

  #breadcrumbs {
    margin-top: -28px;
  }

  #breadcrumbs a {
    text-decoration: none;
  }
</style>

<div id="breadcrumbs">
  <form action="/~{hostname}/search" method="GET">
    <a href="/~{hostname}">{hostname}</a>

    {'>'}

    <!-- when the topic changes, i change the categories back to "all" -->
    <select
      name="topic"
      onchange="document.getElementById('catselect').selectedIndex={allCategories.length - 1};this.form.submit()">
      {#each allTopics as { abbreviation, description }, i}
        {#if abbreviation == topicSelected}
          <option value={abbreviation} selected>{description}</option>
        {:else}
          <option value={abbreviation}>{description}</option>
        {/if}
      {/each}
    </select>
    {'>'}
    <select id="catselect" name="category" onchange="this.form.submit()">
      {#each allCategories as { abbreviation, description }, i}
        {#if abbreviation == categorySelected}
          <option value={abbreviation} selected>{description}</option>
        {:else}
          <option value={abbreviation}>{description}</option>
        {/if}
      {/each}
    </select>
  </form>
</div>

<h1>Search here.</h1>

<p>form here. method is GET. everything will be gotten in PRELOAD.</p>

<form action="/~{hostname}/search" method="GET">
  <input
    id="query"
    type="text"
    name="query"
    placeholder="query..."
    value={textQuery || ''} />
  <button type="submit">Search</button>
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
</form>
