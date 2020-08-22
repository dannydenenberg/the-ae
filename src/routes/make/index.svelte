<script context="module">
  import { client, VALIDATE_TOKEN } from "../../graphql/client";
  import { JWT_COOKIE_NAME } from "../../utils/constants";

  // gather if user is logged on, if not, redirect
  export async function preload(page, session) {
    try {
      let data = await client.query(VALIDATE_TOKEN, {
        token: session.cookies[JWT_COOKIE_NAME],
      });

      const postID = "hello";

      // logged in and authorized
      console.log("🎻 worked!!");
      console.log(data);

      // redirect
      this.redirect(200, `/make/${postID}`);
    } catch (e) {
      // not logged in or not authorized
      console.log("redirect");
      console.log(e);
      this.redirect(301, "logon");
    }
  }
</script>

<script>

</script>

<!-- Create a posting. -->
<!-- This URL path redirects to /~place/make/:_userid/:newGeneratedPostId -->
<h1>{'hey'}</h1>
