<script context="module">
  // the (optional) preload function takes a
  // `{ path, params, query }` object and turns it into
  // the data we need to render the page
  export async function preload(page, session) {
    // the `slug` parameter is available because this file
    // is called [slug].svelte
    const { listingID } = page.params;

    return { listingID };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { POST, redirectTo } from "./../../utils/client-requests";
  import LoadingDots from "./../../components/random/LoadingDots.svelte";

  onMount(() => {
    // you can use listingID here
    POST("/api/listing", { listingID }).then((a) => {
      console.log(a);
      if (a.error) {
        console.log("listing NOT found.");
        redirectTo("/listing-not-found");
      }
      listing = a;

      loading = false;
    });
  });

  export let listingID;
  export let listing = {};
  export let loading = true;
</script>

<style>
  #description {
    white-space: pre-wrap;
  }
  #listing {
    font-family: "Times New Roman", Times, serif;
  }

  #breadcrumbs {
    margin-top: -28px;
  }

  #breadcrumbs > a {
    text-decoration: none;
  }
</style>

{#if !loading}
  <div id="breadcrumbs">
    <a href="/~{listing.area.hostname}">{listing.area.hostname}</a>
    {'>'}
    <a
      href="/~{listing.area.hostname}/search?topic={listing.attributes.topic.abbreviation}">{listing.attributes.topic.description}</a>
    {'>'}
    <a
      href="/~{listing.area.hostname}/search?category={listing.category.abbreviation}">{listing.category.description}</a>
  </div>
{/if}

<div id="listing">
  {#if loading}
    <LoadingDots />
  {:else}
    <h2>
      {listing.title}

      {#if listing.attributes.price}
        --
        <small>${listing.attributes.price}</small>
      {/if}
    </h2>

    <p id="description">{listing.description}</p>

    {#each listing.images as src}
      <img {src} width="250" alt="listing image" />
    {/each}
  {/if}
</div>
