<template>
    <div>

    </div>
</template>

<script lang="ts">
import {
 defineComponent, ref, onMounted,
} from 'vue';

export default defineComponent({
    name: 'CheckBreakPoint',
    setup(props, { emit }) {
        const windowWidth = ref(window.innerWidth);
        const widthChange = () => {
            windowWidth.value = window.innerWidth;
        };
        onMounted(() => {
            window.addEventListener('resize', widthChange);
            emit('windowSize', windowWidth.value);
        });
        return { windowWidth };
    },
});
</script>

<style scoped>

</style>
