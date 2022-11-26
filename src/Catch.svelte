<script>
  // shown when the viz cannot be displayed
  export let content = '';

  function sendMail() {
    const subject = encodeURIComponent('Dino Tracker');
    const body = encodeURIComponent('I have seen this project on the web:\nhttps://svelte-d3-prehistoric.vercel.app/');
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
</script>

<section class="content catch transparent-bg">
  <p>{content}</p>
  <span class="pseudolink" on:click={sendMail}>Send Email with Link</span>
</section>
<div class="placeholder-image">
  <img src="images/screens2.jpg" alt="" />
</div>

<style>
  section.catch {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: none;
    margin: 3rem 0;
    width: 100%;
    overflow: hidden;
  }

  p, span {
    width: 100%;
    margin: 1rem 0;
    font-family: var(--font-02);
    font-size: 1.1rem;
    color: var(--text-black);
    text-align: center;
  }

  .placeholder-image {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    overflow: hidden;
  }

  img {
    width: 100%;
  }
</style>
