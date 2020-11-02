<script>
  import { onMount } from "svelte";
  import {
    checkIfLoggedOn,
    GET,
    POST,
    redirectTo,
  } from "./../utils/client-requests";

  onMount(() => {
    // Check for too big of a file upload.
    // If too big, alert the user and clear the field.
    let uploadField = document.getElementById("file");

    uploadField.onchange = function () {
      let twoMB = 2 * 1024 * 1024; // 2 MB
      if (this.files[0].size > twoMB) {
        alert("File is too big!");
        this.value = "";
      }
    };

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
  <label for="price">Choose a title:</label>
  $<input
    type="text"
    width="22px"
    name="price"
    placeholder="price...(optional)" />
  <br />
  <label for="area">Choose an area:</label>
  <select name="area">
    <!-- `i` is the index in the array (0, 1,2,3) -->
    {#each areas as { hostname, region, description, _id }, i}
      <option value={_id}>{hostname} ({region}) -- {_id}</option>
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
  <input type="file" id="file" accept="image/*" name="images" multiple />
  <br /><br />
  <input type="submit" />
</form>
