<template>
  <div class="container">
    <div>
      <h1 class="title">
        Sleeper
      </h1>
    </div>
  </div>
</template>

<script>

export default {
    components: {

    },
    head() {
        return {
            script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
        };
    },
}
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
