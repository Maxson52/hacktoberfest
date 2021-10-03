<script lang="ts">
  import { goto } from '$app/navigation';

  import GetPosts from '$lib/utils/GetPosts';

  async function fetchPosts() {
    const res = await GetPosts({});

    return res;
  }

  let promise = fetchPosts();
</script>

<svelte:head>
  <title>Spooktober</title>
</svelte:head>

<section>
  {#await promise then value}
    {#each value.data as post}
      <div class="card" on:click={() => goto(`/post/${post.id}`)}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p class="subtext">Continue reading...</p>
      </div>
    {/each}
  {/await}
</section>

<style>
  section {
    padding: 0 10vw;
    overflow-y: clip;
    overflow-x: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .card {
    display: inline-block;

    background-color: var(--dp01);

    width: 100%;

    border-radius: 10px;

    margin: 10px 0;
    padding: 25px 40px;

    border: 1px solid var(--dp02);

    box-shadow: var(--shadow);

    transition: border 0.2s;
  }

  .card:hover {
    border: 1px solid var(--dp03);

    cursor: pointer;
  }

  .subtext {
    color: var(--subtext);
  }
  .subtext:hover {
    text-decoration: underline;
  }
</style>
