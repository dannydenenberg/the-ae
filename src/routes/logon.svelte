<script context="module">
  import { client, VALIDATE_TOKEN, LOG_ON_USER } from "./../graphql/client";
  import { JWT_COOKIE_NAME } from "./../utils/constants";

  export async function preload(page, session) {
    console.log(session.cookieIsValidated, "<--!!+");
    return {
      doneLoggingOn: session.cookieIsValidated,
    };
  }
</script>

<script>
  import AlertBox from "./../components/AlertBox.svelte";

  let error_boolean = false;
  let graphqlERROR = false;
  export let doneLoggingOn;

  /** Data **/
  let email;
  let password;

  function handleSubmit(event) {
    client
      .mutate({
        mutation: LOG_ON_USER,
        variables: { user: { email, password } },
      })
      .then((data) => {
        console.log(data);
        doneLoggingOn = true;
      })
      .catch((error) => {
        console.log("errors!!!");
        console.log(error);
        graphqlERROR = true;
      });
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

    <button type="submit">Create account</button>

    {#if error_boolean}
      <pre>OH NO! AN ERRROR!</pre>
    {/if}
  </form>
{/if}

{#if doneLoggingOn}
  <p>You are logged on.</p>
{/if}
