<script context="module">
  import { client, VALIDATE_TOKEN } from "./../graphql/client";
  import { gql } from "apollo-boost";

  // gather if user is logged on, if not, redirect
  export async function preload(page, session) {
    try {
      // const data = await client.query({ query: VALIDATE_TOKEN });
      let query = `
  query ValidateUserToken {
    validateToken(a: "String") {
      iat
      _id
    }
  }
`;
      let data = await this.fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      console.log("DATA!:");
      console.log(await data.json());
    } catch (e) {
      console.log(e);
      this.redirect(301, "logon");
      console.log("error oops");
    }
  }
</script>

<script>

</script>

<!-- Create a posting. -->
<!-- This URL path redirects to /~place/make/:_userid/:newGeneratedPostId -->
<h1>{'hey'}</h1>
