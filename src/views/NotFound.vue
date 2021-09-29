<template>
    <div class="noufound_page">
        <p>The page you are looking for can't be found.</p>
        <a href="#" @click="goBackToHomePage">Go back to the home page.</a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'NotFound',
    setup() {
        const router = useRouter();
        const goBackToHomePage = () => {
            router.push({
                name: 'Login',
            });
        };
        return { goBackToHomePage };
    },
});
</script>

<style scoped>
.noufound_page {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(221, 160, 221, 0.301);
}
</style>
