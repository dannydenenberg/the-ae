<script>
  import { onMount } from "svelte";
  import {
    checkIfLoggedOn,
    GET,
    POST,
    redirectTo,
  } from "./../utils/client-requests";

  onMount(() => {
    checkIfLoggedOn().then(async (a) => {
      // if person is NOT logged in
      if (!a) {
        alert("Please log in.");
        redirectTo("/logon");
      }
    });

    GET("/api/categories").then((a) => {
      categories = a;
      console.log(a);
    });

    GET("/api/areas").then((a) => {
      areas = a;
    });
  });

  // = [{abbreviation: "acb", description: "Bikes"}]
  export let categories = [];
  export let languages = ["en"];
  // export let isSeller = false;
  export let areas = [];
</script>

<h1>Make a listing.</h1>

<form method="post" action="/api/make" enctype="multipart/form-data">
  <!-- <input type="text" name="username" /> -->
  <label for="title">Choose a title:</label>
  <input type="text" name="title" placeholder="title..." />
  <br />

  <textarea
    name="description"
    placeholder="Enter a description..."
    rows="10"
    cols="30" />

  <br />
  <label for="area">Choose an area:</label>
  <select name="area">
    <!-- `i` is the index in the array (0, 1,2,3) -->
    {#each areas as { hostname, region, description }, i}
      <option value={hostname}>{hostname} ({region})</option>
    {/each}
  </select>

  <br />
  <label for="category">Choose a category:</label>
  <select name="category">
    <!-- `i` is the index in the array (0, 1,2,3) -->
    {#each categories as { abbreviation, description }, i}
      <option value={abbreviation}>{description}</option>
    {/each}
  </select>
  <br />
  <label for="langauge">Choose a language:</label>
  <select name="language">
    <!-- `i` is the index in the array (0, 1,2,3) -->
    {#each languages as l}
      <option value={l}>{l}</option>
    {/each}
  </select>
  <br />
  <label for="images">Choose image(s) (or none): </label>
  <input type="file" accept="image/*" name="images" multiple />
  <br /><br />
  <input type="submit" />
</form>
