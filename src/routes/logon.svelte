<script>
  import { checkIfLoggedOn, POST } from "./../utils/client-requests";
  import AlertBox from "./../components/AlertBox.svelte";
  import { onMount } from "svelte";

  let error_boolean = false;
  let graphqlERROR = false;
  export let doneLoggingOn;

  /** Data **/
  let email;
  let password;

  onMount(() => {
    let isLoggedOn = checkIfLoggedOn();
  });

  function handleSubmit(event) {
    console.log("in handle");
    let body = { user: { email, password } };
    POST("/api/logon", body).then((data) => {
      console.log("DATA::");
      console.log(data);

      if (!data.error) {
        doneLoggingOn = true;
      } else {
        error_boolean = true;
      }
    });
  }

  async function logOut() {
    await client.mutate({
      mutation: LOG_OUT,
    });

    doneLoggingOn = false;
  }

  function validateMessageEmail(event) {
    let textbox = event.target;
    error_boolean = false;
    if (textbox.value === "") {
      textbox.setCustomValidity("Required email address");
    } else if (textbox.validity.typeMismatch) {
      error_boolean = true;
      textbox.setCustomValidity("please enter a valid email address");
    } else if (textbox.value === "what") {
      textbox.setCustomValidity("not great");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
</script>

<h1>Log on</h1>

{#if !doneLoggingOn}
  {#if graphqlERROR}
    <AlertBox>There was an error in loggin you in.</AlertBox>
  {/if}

  <form
    on:submit|preventDefault={handleSubmit}
    on:invalid={validateMessageEmail}
    on:changed={validateMessageEmail}
    on:input={validateMessageEmail}>
    <label for="email">Email</label>
    <input required type="email" id="email" bind:value={email} />
    <br />
    <label for="password">Password</label>
    <input required type="password" id="password" bind:value={password} />

    <button type="submit">Log on</button>

    {#if error_boolean}
      <pre>OH NO! AN ERRROR!</pre>
    {/if}
  </form>
{/if}

{#if doneLoggingOn}
  <p>You are logged on.</p>
  <button on:click={logOut}>Log out</button>
{/if}
