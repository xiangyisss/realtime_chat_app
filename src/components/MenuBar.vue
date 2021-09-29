<template>
    <header class="navbar">
          <p class="title">Chat board</p>
          <button @click="logout" type="button" >Log out</button>
      </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'MenuBar',
    setup() {
        const router = useRouter();
        const logout = () => {
        router.push({
            name: 'Login',
        });
        };
        return { logout };
    },
});
</script>

<style scoped>
header {
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 1rem; */
    border-bottom: 1px solid rgba(143, 135, 135, 0.151);
}
header button {
    margin-right: 1rem;
    background-color: transparent;
    border: 1px solid plum;
    border-radius: 4px;
    width: 5rem;
    height: 2rem;
    position: relative;
}

header button:hover {
    background-color: #734b6d8c;
    transition: all 0.5s;
    color: #fff;
}
.title {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    padding-left: 4rem;
}
</style>
