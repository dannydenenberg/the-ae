<script>
  import AlertBox from "./../components/AlertBox.svelte";
  import { POST } from "./../utils/client-requests";

  let error_boolean = false;
  let graphqlERROR = false;
  let doneSigningUp = false;

  /** Data **/
  let email;
  let password;

  function handleSubmit(event) {
    POST("/api/makeperson", { user: { email, password } }).then((a) => {
      if (a.error) {
        alert(`ERROR: ${a.message}`);
        error_boolean = true;
      } else {
        console.log("User created.");
        doneSigningUp = true;
      }
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

<h1>Join the ae</h1>

{#if !doneSigningUp}
  {#if graphqlERROR}
    <AlertBox>There was an error in creating your account.</AlertBox>
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

{#if doneSigningUp}
  <p>
    Your account was created. Please check your email for a
    <strong>verification link</strong>
    .
  </p>
{/if}
