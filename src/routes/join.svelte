<script>
  import { client } from "./../graphql/client";
  import AlertBox from "./../components/AlertBox.svelte";

  const MAKE_USER = `
    mutation CreateMessage($user: UserInput) {
      makeUser(user: $user) {
        _id
      }
    }
  `;

  let error_boolean = false;
  let graphqlERROR = false;
  let doneSigningUp = false;

  /** Data **/
  let email;
  let password;

  function handleSubmit(event) {
    let res = client
      .mutate(MAKE_USER, { user: { email, password } })
      .then((data) => {
        console.log(data);
        doneSigningUp = true;
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
