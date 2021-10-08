<script context="module">
  export const load = async ({ page }) => ({
    props: {
      key: page.path
    }
  });
</script>

<script>
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';

  import { user } from '$lib/stores/stores';

  import PageTransition from '$lib/components/PageTransition.svelte';
  import Button from '$lib/components/Button.svelte';

  import { SignOut } from '$lib/utils/Auth';

  import { browser } from '$app/env';
  import { onMount } from 'svelte';

  export let key;

  let isDarkMode = true;

  // Intro Modal
  let open = false;

  onMount(() => {
    isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));

    if (isDarkMode == null) {
      localStorage.setItem('isDarkMode', true);
      isDarkMode = true;
    }

    if (!isDarkMode) [document.body.classList.add('light-mode')];

    // Have seen the welcome message
    open = JSON.parse(localStorage.getItem('newUser'));

    if (open == null) open = true;
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

  function updateNewUser() {
    open = false;
    localStorage.setItem('newUser', false);
  }
</script>

<nav>
  <div class="dropdown">
    <img src="/favicon.png" alt="Spooky" />
    <div class="dropdown-content left">
      <p on:click={() => goto('/')}>Home</p>
      <p on:click={() => goto('/guidelines')}>Guidelines</p>
      <p on:click={() => goto('/help')}>Help</p>
      <p on:click={() => changeTheme()}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </p>
    </div>
  </div>

  <h1>Spooked!</h1>

  <div>
    {#if $user}
      <a
        href="/"
        on:click={() => {
          SignOut();
          location.reload();
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

{#if !$user && open}
  <section class="new" transition:fade={{ duration: 250 }}>
    <div class="container">
      <span
        class="close"
        on:click={() => {
          updateNewUser();
        }}>×</span
      >
      <div class="content">
        <h3>New Here?</h3>
        <p>
          The place to read and write scary stories. They'll leave you Spooked!
        </p>
        <p>
          Check out the <a
            href="/help"
            on:click={() => {
              updateNewUser();
            }}>help</a
          > page to learn what Spooked is about.
        </p>
      </div>
    </div>
  </section>
{/if}

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

  nav h1 {
    font-size: 3rem;
    margin: 0;
  }

  @media only screen and (max-width: 600px) {
    nav h1 {
      display: none;
    }
  }

  nav img {
    height: 50px;

    cursor: pointer;
  }

  nav a {
    padding: 0 15px;

    font-size: 1.2em;

    text-decoration: none;

    cursor: pointer;

    color: var(--text);

    transition: color 0.2s;
  }

  nav a:hover {
    color: var(--primary);
  }

  nav .dropdown {
    position: relative;
    display: inline-block;
  }

  nav .dropdown-content {
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

  nav .dropdown-content.left {
    left: 0;
  }

  nav .dropdown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
  }

  nav p:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  /* Modal styles */
  section.new {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.4);
    /* backdrop-filter: blur(4px); */
    width: 100vw;
    height: 100vh;

    z-index: 1000;
  }

  .new .container {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;

    background-color: var(--dp01);

    border-radius: 10px;

    margin: 10px 0;
    padding: 25px 40px;

    border: 1px solid var(--dp02);

    box-shadow: var(--shadow);

    max-width: 98vw;
    width: 50vw;

    height: 500px;

    font-size: 1.8rem;
  }

  @media only screen and (max-width: 600px) {
    .new .container {
      width: 90vw;
    }
  }

  .new h3 {
    font-size: 4rem;
  }

  .new .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80%;
  }

  .close {
    color: var(--subtext);
    font-size: 3rem;
    cursor: pointer;
    margin: 5px 0;
  }

  .close:hover {
    color: var(--subtextHover);
  }

  .new a {
    color: var(--primary);
  }

  .new a:hover {
    color: var(--secondary);
  }
</style>
