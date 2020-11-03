<script context="module">
  export async function preload(page, session) {
    console.log(page);

    let hostname = page.params.area;
    let areas;

    let allCategories = [],
      allTopics = [],
      error;
    try {
      let res = await this.fetch("/api/categories");
      let json = await res.json();
      allCategories = json;

      console.log("all categories");
      console.log(allCategories);

      res = await this.fetch("/api/topics");
      json = await res.json();
      allTopics = json;

      console.log("all topics");
      console.log(allTopics);

      res = await this.fetch("/api/areas");
      json = await res.json();
      areas = json;

      console.log("all areas");
      console.log(areas);
    } catch {
      error = true;
    }

    let topicsPopulated = allTopics.map((topic) => {
      return {
        abbreviation: topic.abbreviation,
        description: topic.description,
        categories: allCategories.filter((category) =>
          topic.categories.includes(category.abbreviation),
        ),
      };
    });

    return {
      areas,
      topicsPopulated,
      allCategories,
      error,
      allTopics,
      hostname,
    };
  }
</script>

<script>
  import { onMount } from "svelte";

  export let allCategories, error, allTopics, hostname;

  export let topicsPopulated;
  export let areas;

  onMount(() => {
    if (error) {
      alert("There was an unexpected error in gathering data.");
    }

    console.log("topics Populated");
    console.log(topicsPopulated);
  });
</script>

<style>
  #flex-container {
    justify-content: space-between;
    display: flex;
    padding: 26px;
  }

  #areas {
    background: #f4f4f4;
    border-left: 1px #ccc solid;
    border-right: 1px #ccc solid;
    min-width: 10em;
    /* font-size: 70%; */
    line-height: 1.43em;
    /* margin-top: -3.75em; */
    /* min-height: 810px; */
    padding: 5px 0;
    text-align: center;
    vertical-align: top;
    width: 11%;
  }

  #areas ul {
    list-style: none;
    line-height: 16px;
    padding-left: 0;
    text-align: center;
  }

  #areas li {
    padding-bottom: 6px;
  }

  #flex-container a {
    text-decoration: none;
  }

  #flex-container a:hover {
    text-decoration: underline;
  }

  #title-heading {
    font-family: "Times New Roman", Times, serif;
  }

  #title {
    background: #f4f4f4;
    border-left: 1px #ccc solid;
    border-right: 1px #ccc solid;
    float: left;
    min-width: 10em;
    font-size: smaller;
    margin: 0;
    /* min-height: 820px; */
    text-align: center;
    width: 20%;
  }
</style>

<svelte:head>
  <title>root</title>
</svelte:head>

<div id="flex-container">
  <div id="title">
    <h1 id="title-heading">the ae</h1>
  </div>
  <div id="topics">
    {#each topicsPopulated as { abbreviation, description, categories }}
      <h3>
        <a href="/~{hostname}/search?topic={abbreviation}">{description}</a>
      </h3>
      <div id="categories">
        <ul>
          {#each categories as { abbreviation, description }}
            <li>
              <a
                href="/~{hostname}/search?category={abbreviation}">{description}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <div id="areas">
    <h4>locations</h4>
    <ul>
      {#each areas as { hostname, description }}
        <li><a href="/~{hostname}">{description}</a></li>
      {/each}
    </ul>
  </div>
</div>
