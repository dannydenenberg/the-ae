<script>
  import LoadingDots from "../components/random/LoadingDots.svelte";
  import { POST } from "../utils/client-requests";
  import { onMount } from "svelte";

  export let loading = true;
  export let verified = false;

  onMount(() => {
    console.log(`SEARCH: ${`/api/verifyperson${window.location.search}`}`);
    POST(`/api/verifyperson${window.location.search}`).then((a) => {
      console.log("GOT A");
      console.log(a);
      if (!a.error) {
        verified = true;
      }

      loading = false;
    });
  });
</script>

<h1>Verify user</h1>

<p>
  {#if loading}
    <LoadingDots />
  {/if}

  {#if verified && !loading}
    ✅ You are verified! Good to go.
  {:else}⁉️ Something went wrong. Verification failed.{/if}
</p>
