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
* {
  margin: 0 ;
  box-sizing: border-box;
}

#app {
  font-family: 'Ubuntu Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
