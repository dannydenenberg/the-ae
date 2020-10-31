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
  import { POST } from "./../../utils/client-requests";
  import LoadingDots from "./../../components/random/LoadingDots.svelte";

  onMount(() => {
    // you can use listingID here
    POST("/api/listing", { listingID }).then((a) => {
      console.log(a);
      if (a.error) {
        console.log("listing NOT found.");
      }
      listing = a;

      loading = false;
    });
  });
  export let listingID;
  export let listing = {};
  export let loading = true;
</script>

{#if loading}
  <LoadingDots />
{:else}
  <h1>{listing.title}</h1>

  <p>{listing.description}</p>

  {#each listing.images as src}
    <img {src} width="250" alt="listing image" />
  {/each}
{/if}
