<script>
  import { goto } from '$app/navigation';

  import { user } from '$lib/stores/stores';

  import CreateReply from '$lib/utils/CreateReply';

  import Button from './Button.svelte';

  export let slug;
  let comment = '';

  async function submitReply() {
    if (!$user) {
      goto('/login');
    } else if (comment.length > 25) {
      let confirmed = confirm(
        "Confirm that you've followed all post guidelines!"
      );
      if (confirmed) {
        const { error } = await CreateReply(slug, comment);

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
        "Your comment doesn't meet the 25 character minimum or an unexpected error occured!"
      );
    }
  }
</script>

<section>
  <textarea type="text" placeholder="Add to the story" bind:value={comment} />
  <div>
    <Button onclick={() => submitReply()} style="height: 40px; width: 100%;"
      >Post</Button
    >
  </div>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 150px;
    grid-template-rows: 1fr;
    gap: 20px;

    align-items: center;
  }

  textarea {
    grid-column: 1;

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

  textarea:focus {
    outline: none;
    border: 2px solid var(--primary);
  }

  div {
    grid-column: 2;
  }

  @media only screen and (max-width: 600px) {
    section {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 0;
    }
    textarea {
      width: 100%;
      grid-column: 1;
      grid-row: 1;
    }
    div {
      grid-column: 1;
      grid-row: 2;
    }
  }
</style>
