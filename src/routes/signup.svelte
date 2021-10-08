<script>
  import { SignUp } from '$lib/utils/Auth';

  import Button from '$lib/components/Button.svelte';

  let email = '';
  let password = '';

  async function onSubmit() {
    let msg = '';
    const { user, session, error } = await SignUp(email, password);

    if (error) {
      msg = error.message + ` - (Error code: ${error.status})`;
    } else {
      msg = 'Check your email!';
    }

    alert(msg);
  }
</script>

<section>
  <form on:submit|preventDefault={() => onSubmit()}>
    <h1>Sign Up</h1>

    <label for="email">Email:</label>
    <input type="email" name="email" bind:value={email} />

    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={password} />

    <Button
      onclick={() => onSubmit()}
      style="width: 150px; height: 40px; margin: 20px 0; padding: 5px 0;"
      >Sign Up</Button
    >
  </form>
</section>

<style>
  section {
    overflow-y: hidden;
    overflow-x: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: left;

    height: 80%;
    width: 90%;
  }

  input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid var(--dp01);
    color: var(--text);
    appearance: none;
    border-radius: 0.2rem;
    background-color: var(--dp01);
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input:focus {
    outline: none;
    border: 2px solid var(--primary);
  }

  @media only screen and (max-width: 600px) {
    section {
      margin: 0 10vw;
    }
    input {
      width: 90%;
    }
  }

  label {
    font-size: 1.3rem;
  }
</style>
