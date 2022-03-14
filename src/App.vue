<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  components: {},

});
</script>

<style>
html, body, * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Ubuntu Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  max-width: 2000px;
  margin: 0 auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media  (max-width: 700px)  {
  html,body {
    /* overflow-x: hidden; */
    overflow-y: hidden;
  }
}
</style>
