<template>
    <VuemojiPicker @emojiClick="onEmojiClick" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker';

export default defineComponent({
    name: 'Emoji',
    components: { VuemojiPicker },
    setup(props, { emit }) {
        const eventDetail : Ref<string> = ref('');
        const onEmojiClick = (detail: EmojiClickEventDetail) => {
            const emojis = detail.unicode!;
            emit('onEmojiClick', emojis);
        };
        return { onEmojiClick, eventDetail };
    },
    });

</script>

<style scoped>

</style>
