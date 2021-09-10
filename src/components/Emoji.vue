<template>
    <VuemojiPicker @emojiClick="handleEmojiClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker';

export default defineComponent({
    name: 'Emoji',
    components: { VuemojiPicker },
    setup() {
        const handleEmojiClick = (detail: EmojiClickEventDetail) => {
            console.log(detail.unicode);
        };

        return { handleEmojiClick };
    },

    });

</script>

<style scoped>

</style>
