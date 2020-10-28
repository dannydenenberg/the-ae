<script>
  import LoadingDots from "../components/random/LoadingDots.svelte";
  import { POST } from "../utils/client-requests";

  export let loading = true;
  export let verified = false;

  (async () => {
    POST(`/verify${window.location.search}`).then((a) => {
      if (!a.error) {
        verified = true;
      }

      loading = false;
    });
  })();
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
