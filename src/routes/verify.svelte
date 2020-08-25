<script context="module">
  import { client, VERIFY_USER } from "./../graphql/client";

  // page.query should be {_id: ..., code: ...}
  export async function preload(page, session) {
    return new Promise((resolve, reject) => {
      client
        .mutate({ mutation: VERIFY_USER, variables: page.query })
        .then((data) => {
          resolve(data);
          console.log(`data`, data);
        })
        .catch((err) => {
          reject({ error: err });
          console.log("err", err);
        });
    });
  }
</script>

<script>
  export let data;
</script>

<h1>Verify user</h1>

<p>
  {#if data.verifyUser}
    ✅ You are verified! Good to go.
  {:else}⁉️ Something went wrong. Verification failed.{/if}
</p>
