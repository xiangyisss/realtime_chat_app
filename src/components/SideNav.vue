<template>
    <router-link :to="{name : 'groupchat'}"><div>Group Chat</div></router-link>
    <router-link :to="{name : 'privatechat'}"><div>Rebecca</div></router-link>

</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'SideNav',



});
</script>

<style scoped>

</style>
