<script>
  import { goto } from '$app/navigation';

  import { SignIn } from '$lib/utils/Auth';

  import Button from '$lib/components/Button.svelte';

  let email = '';
  let password = '';

  async function onSubmit() {
    let msg = '';
    const { user, session, error } = await SignIn(email, password);

    if (error) {
      msg = error.message + ` - (Error code: ${error.status})`;

      alert(msg);
    } else {
      goto('/');
    }
  }
</script>

<section>
  <form>
    <h1>Log In</h1>

    <label for="email">Email:</label>
    <input type="email" name="email" bind:value={email} />

    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={password} />

    <Button
      onclick={() => onSubmit()}
      style="width: 150px; height: 40px; margin: 20px 0; padding: 5px 0;"
      >Log In</Button
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
</style>
