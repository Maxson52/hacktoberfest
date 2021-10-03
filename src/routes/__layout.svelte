<script context="module">
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });
</script>

<script>
  import { goto } from '$app/navigation';

  import { user } from '$lib/stores/stores';

  import PageTransition from '$lib/components/PageTransition.svelte';
  import Button from '$lib/components/Button.svelte';

  import { SignOut } from '$lib/utils/Auth';

  import { browser } from '$app/env';
  import { onMount } from 'svelte';

  export let key;

  let isDarkMode = true;

  onMount(() => {
    isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
    if (isDarkMode == false) [document.body.classList.add('light-mode')];
  });

  function changeTheme() {
    if (isDarkMode) {
      if (browser) document.body.classList.add('light-mode');
      isDarkMode = false;
    } else {
      if (browser) document.body.classList.remove('light-mode');
      isDarkMode = true;
    }
    localStorage.setItem('isDarkMode', isDarkMode);
  }
</script>

<nav>
  <div class="dropdown">
    <img src="../../static/favicon.png" alt="Spooky" />
    <div class="dropdown-content left">
      <p on:click={() => goto('/')}>Home</p>
      <p on:click={() => goto('/guidelines')}>Guidelines</p>
      <p on:click={() => goto('/help')}>Help</p>
      <p on:click={() => changeTheme()}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </p>
    </div>
  </div>

  <h1>Spooktober</h1>

  <div>
    {#if $user}
      <a
        href="/"
        on:click={() => {
          SignOut();
        }}>Sign Out</a
      >
    {:else}
      <a href="/login">Log in</a>
      <Button onclick={() => goto('/signup')} style="height: 35px;"
        >Sign Up</Button
      >
    {/if}
  </div>
</nav>

<PageTransition refresh={key}>
  <slot />
</PageTransition>

<style>
  nav {
    padding: 10px 20px;
    z-index: 100;

    width: calc(100vw - 10px);

    background-color: var(--background);

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: -webkit-sticky;
    position: sticky;
    top: -1px;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
  }

  @media only screen and (max-width: 600px) {
    h1 {
      display: none;
    }
  }

  img {
    height: 50px;

    cursor: pointer;
  }

  a {
    padding: 0 15px;

    font-size: 1.2em;

    text-decoration: none;

    cursor: pointer;

    color: var(--text);

    transition: color 0.2s;
  }

  a:hover {
    color: var(--primary);
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: block;
    position: absolute;
    min-width: 160px;
    padding: 12px 16px;
    z-index: 1;

    visibility: hidden;
    opacity: 0;

    transition: visibility 0s, opacity 0.24s ease;

    font-size: 1.2em;

    border: 1px solid var(--primary);
    border-radius: 5px;
    background-color: var(--background);
    color: var(--text);
  }

  .dropdown-content.left {
    left: 0;
  }

  .dropdown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
  }

  p:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
