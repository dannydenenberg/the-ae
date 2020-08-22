<script context="module">
  import { client, VALIDATE_TOKEN } from "../../../graphql/client";
  import { JWT_COOKIE_NAME } from "../../../utils/constants";

  export async function preload(page, session) {
    console.log("🚙PAGE:");
    console.log(page);

    let exportedObject = {
      postID: page.params.postID,
    };

    try {
      client.query(VALIDATE_TOKEN, { token: session.cookies[JWT_COOKIE_NAME] });
      console.log("🎻 worked");
    } catch (e) {
      console.log("🚴‍♂️ error");
      console.log(e);
    }

    return exportedObject;
  }
</script>

<script>
  export let postID;
</script>

<svelte:head>
  <title>make</title>
</svelte:head>

<h1>Make</h1>

<p>
  Your
  <strong>post id</strong>
  is
  <code>{postID}</code>
</p>
