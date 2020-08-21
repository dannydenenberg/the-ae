<script context="module">
  import { client, VALIDATE_TOKEN } from "./../graphql/client";

  /**
   * sometimes doesn't send cocokies b/c it sends the fetch FROM the server
   * and the server doesn't hold the cookies
   */

  // gather if user is logged on, if not, redirect
  export async function preload(page, session) {
    try {
      let data = await client.query(VALIDATE_TOKEN);

      console.log("🎻 worked!!");
      console.log(data);
    } catch (e) {
      console.log("redirect");
      this.redirect(301, "logon");
    }
  }
</script>

<script>

</script>

<!-- Create a posting. -->
<!-- This URL path redirects to /~place/make/:_userid/:newGeneratedPostId -->
<h1>{'hey'}</h1>
