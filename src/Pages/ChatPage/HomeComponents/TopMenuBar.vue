<template>
    <header>
        <p class="title">Chat board</p>
        <button @click="logout" type="button" >Log out</button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'TopMenuBar',
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
    width: 100%;
    height: 7vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(143, 135, 135, 0.151);
    background-color: #fff;
    margin: 0 auto;
    padding: 0.5rem 0 0.5rem 0;
}
.title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-left: 2rem;
    margin-bottom: 0;
}
header button {
    margin-right: 2rem;
    background-color: transparent;
    border: 1px solid plum;
    border-radius: 4px;
    width: 5rem;
    height: 2rem;
    position: relative;
}

header button:hover {
    background-color: #734b6d8c;
    transition: all 0.2s;
    color: #fff;
}

@media (max-width : 700px) {
    .title {
        font-size: 1rem;
    }
    header button {
        width: 4rem;
        height: 1.6rem;
        font-size: 0.8rem;
    }
}
</style>
