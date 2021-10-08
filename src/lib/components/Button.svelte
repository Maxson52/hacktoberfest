<script>
  export let onclick;
  export let style;
</script>

<button on:click|preventDefault={onclick} {style}>
  <slot />
</button>

<style>
  button {
    /* background-color: var(--primary); */
    background-image: linear-gradient(
      to right,
      var(--primary) 0%,
      var(--secondary) 100%
    );
    color: var(--buttonText);

    padding: 0 15px;

    font-size: 1.2em;

    cursor: pointer;

    border-radius: 500px;
    border: none;
    outline: none;

    transition: background-color 0.2s;
  }

  button:hover {
    background-color: var(--tertiary);

    border: none;
    outline: none;
  }

  button:active {
    background-color: var(--secondary);

    border: none;
    outline: none;
  }
</style>
