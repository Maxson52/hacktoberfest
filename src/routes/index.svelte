<script>
  import { goto } from '$app/navigation';

  import NewPrompt from '$lib/components/NewPrompt.svelte';

  import GetPosts from '$lib/utils/GetPosts';

  async function fetchPosts() {
    const res = await GetPosts({});

    let sortedRes = res.data.slice().sort((a, b) => {
      // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return sortedRes;
  }

  let promise = fetchPosts();

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  // Moment
  import moment from 'moment';
  moment().format();
</script>

<section>
  {#await promise then value}
    <NewPrompt />

    {#each value as post}
      <div class="card" on:click={() => goto(`/post/${post.id}`)}>
        <p
          class="subtext"
          style={`display: ${post.updated_at ? 'default' : 'none'};`}
        >
          {post.updated_at ? moment(new Date(post.updated_at)).fromNow() : ''}
        </p>
        <h1>{post.title}</h1>
        <p class="text">{truncate(post.body, 350)}</p>
        <p class="subtext hover">Continue reading...</p>
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
  .hover:hover {
    text-decoration: underline;
  }
</style>
