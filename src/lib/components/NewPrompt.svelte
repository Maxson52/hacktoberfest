<script>
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';

  import { user } from '$lib/stores/stores';

  import CreatePrompt from '$lib/utils/CreatePrompt';

  import Button from './Button.svelte';

  let title = '';
  let body = '';

  let focused = false;

  async function createPrompt() {
    if (!$user) {
      goto('/login');
    } else if (title.length > 3 && body.length > 10) {
      let confirmed = confirm(
        "Confirm that you've followed all post guidelines!"
      );

      if (confirmed) {
        const { error } = await CreatePrompt(title, body);

        if (error) {
          alert(error);
        } else {
          location.reload();
        }
      } else {
        return;
      }
    } else {
      alert(
        "Your prompt doesn't meet the character minimum or an unexpected error occured!"
      );
    }
  }
</script>

<section class={focused ? 'expand' : ''}>
  <input
    type="text"
    placeholder="Title"
    bind:value={title}
    on:focus={() => (focused = true)}
  />

  {#if focused}
    <textarea
      in:fade
      type="text"
      placeholder="Short introduction of the story. Keep it open and brief, you want as many creative endings as possible!"
      bind:value={body}
    />
    <div class="btn" in:fade>
      <Button
        onclick={() => createPrompt()}
        style="height: 40px; grid-column: 2;">Submit prompt</Button
      >
    </div>
  {/if}
</section>

<style>
  section {
    display: inline-block;

    background-color: var(--dp01);

    overflow-y: hidden;

    margin: 10px 0;
    padding: 25px 40px;

    border: 1px solid var(--dp02);
    box-shadow: var(--shadow);
    border-radius: 10px;

    width: 100%;

    max-height: 110px;

    transition: border 0.2s;
    transition: max-height 0.5s ease;
  }

  section.expand {
    max-height: 700px;
  }

  textarea,
  input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid var(--dp03);
    color: var(--text);
    appearance: none;
    border-radius: 0.2rem;
    background-color: var(--dp01);

    resize: vertical;
  }

  textarea {
    margin: 5px 0 5px 0;
  }

  textarea:focus,
  input:focus {
    outline: none;
    border: 2px solid var(--primary);
  }
</style>
