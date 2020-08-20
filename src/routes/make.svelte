<script context="module">
  import { client, VALIDATE_TOKEN } from "./../graphql/client";
  import { gql } from "apollo-boost";

  // gather if user is logged on, if not, redirect
  export async function preload(page, session) {
    try {
      await client.query({ query: VALIDATE_TOKEN });
    } catch (e) {
      console.log("er223");
      this.redirect(301, "logon");
    }
  }
</script>

<script>

</script>

<!-- Create a posting. -->
<!-- This URL path redirects to /~place/make/:_userid/:newGeneratedPostId -->
<h1>{'hey'}</h1>
