<template>
    <input type="text" v-model="eventDetail">
    <VuemojiPicker @emojiClick="onEmojiClick" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker';

export default defineComponent({
    name: 'Emoji',
    components: { VuemojiPicker },
    setup() {
        const eventDetail : Ref<string> = ref('');

        const onEmojiClick = (detail: EmojiClickEventDetail) => {
            const emojis = detail.unicode!;
            eventDetail.value += emojis;
        };

        return { onEmojiClick, eventDetail };
    },

    });

</script>

<style scoped>

</style>
