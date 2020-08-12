<script>
  import { text } from "svelte/internal";

  let error_boolean = false;

  async function handleSubmit(event) {
    let email = event.target.email.value;
    let password = event.target.password.value;

    console.log(email, password);

    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.email.value);
    // console.log(event.target.password.value);
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

<form
  on:submit|preventDefault={handleSubmit}
  on:invalid={validateMessageEmail}
  on:changed={validateMessageEmail}
  on:input={validateMessageEmail}>
  <label for="email">Email</label>
  <input required type="email" id="email" />
  <br />
  <label for="password">Password</label>
  <input required type="password" id="password" />

  <button type="submit">Create account</button>

  {#if error_boolean}
    <pre>OH NO! AN ERRROR!</pre>
  {/if}
</form>
