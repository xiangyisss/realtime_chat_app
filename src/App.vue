<template>
  <!-- <div id="nav">
    <router-link to="/" ></router-link>
    <router-link to="/chat_page"></router-link>
  </div> -->
  <!-- <side-nav /> -->
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import SideNav from './components/SideNav.vue';

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
