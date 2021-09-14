<template>
    <div>
        The page you are looking for can't be found.
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

</style>
