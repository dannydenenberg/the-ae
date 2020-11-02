<script>
  import { onMount } from "svelte";

  import { checkIfLoggedOn, redirectTo } from "./../utils/client-requests";

  onMount(() => {
    checkIfLoggedOn().then(async (a) => {
      // if person is NOT logged in
      if (!a) {
        alert("Please log in.");
        redirectTo("/logon");
      }
    });
  });
</script>

<h1>Here is where you can see your account posts/settings.</h1>
