<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { user } from '$lib/stores/stores';

  import GetPosts from '$lib/utils/GetPosts';
  import GetReplies from '$lib/utils/GetReplies';
  import CreateReport from '$lib/utils/CreateReport';

  import CommentBox from '$lib/components/CommentBox.svelte';

  let slug = $page.params.post;

  async function fetchPosts() {
    const res = await GetPosts({ id: slug });

    return res;
  }

  let postPromise = fetchPosts();

  async function fetchReplies() {
    const res = await GetReplies({ postid: slug });

    let sortedRes = res.data
      .slice()
      .sort((a, b) => {
        // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
      })
      .reverse();

    return sortedRes;
  }

  let replyPromise = fetchReplies();

  // Report reply
  async function report(postid, authorid, userid) {
    let response = prompt('Reason for report:');

    if (response) {
      const { error } = await CreateReport(postid, authorid, userid, response);

      if (error) {
        alert(error);
      }
    }
  }

  // Moment
  import moment from 'moment';
  moment().format();
</script>

<section>
  {#await postPromise then postValue}
    <div class="card">
      <div class="head">
        <h1>{postValue.data[0].title}</h1>

        <div class="close" on:click={() => goto('/')}>×</div>
      </div>
      <p class="text">{postValue.data[0].body}</p>

      <hr />

      {#await replyPromise then replyValue}
        {#if replyValue.length == 0}
          <span>Be the first to contribute to the story!</span>
        {:else}
          {#each replyValue as reply}
            <div class="comment">
              <div class="spans">
                <span class="subtext">
                  {moment(new Date(reply.created_at)).fromNow()}
                  {$user && $user.id == reply.authorid ? ' - You' : ''}
                </span>
                <span
                  class="subtext report"
                  on:click={() =>
                    report(reply.postid, reply.authorid, $user.id)}
                  style={`display: ${
                    $user && $user.id != reply.authorid ? 'inline' : 'none'
                  }`}
                >
                  Report
                </span>
              </div>
              <span class="text">{reply.body}</span>
            </div>
          {/each}
        {/if}
      {/await}

      <hr />

      <CommentBox {slug} />
    </div>
  {/await}
</section>

<style>
  section {
    padding: 0 10vw;
    overflow-y: clip;
    overflow-x: hidden;

    display: flex;
    align-items: center;
    flex-direction: column;

    height: 80%;
  }

  .card {
    display: inline-block;
    position: relative;

    background-color: var(--dp01);

    width: 100%;

    border-radius: 10px;

    margin: 10px 0;
    padding: 25px 40px;

    border: 1px solid var(--dp02);

    box-shadow: var(--shadow);
  }

  .subtext {
    color: var(--subtext);
  }

  .comment {
    margin: 15px 0;

    white-space: pre-wrap;
  }

  .spans {
    display: flex;
    justify-content: space-between;
  }

  .report:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  hr {
    border: 1px solid var(--dp03);
    background-color: var(--dp03);

    margin: 20px 0;
  }

  h1 {
    margin: 10px 0;
  }

  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
</style>
