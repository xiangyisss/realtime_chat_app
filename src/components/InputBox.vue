<template>
    <footer class="typing_area">
        <form @submit.prevent
            id="messages_form" autocomplete="off">
            <div class="input_area">
                <textarea name="" placeholder="Aa" @keyup.enter="sendMessages" @keydown="canNotSendOnlySpace"
                ref="textarea"  v-model="text"   >
                </textarea>
            </div>
            <div class="button_area">
            <button id="send_text_btn" @click="sendMessages">
                <img class="sendtext_btn" src="../assets/send-button.svg" alt="button image">
            </button>
            <form @submit.prevent id="images_upload_form" >
                <label>
                    <img src="../assets/image.svg" alt="">
                    <input type="file"  class="uploadImages" accept="image/*"  @change="UploadImages" >
                </label>
            </form>
            <div id="emoji_icon" @click="openEmoji" >
            </div>
            </div>
        </form>
        <div  v-if="show" class="emoji_box">
          <emoji @onEmojiClick = appendEmojiToText />
        </div>
      </footer>
</template>

<script lang="ts">
import {
 defineComponent, ref, Ref,
} from 'vue';
import firebase from 'firebase';
import database from '../db';
import Emoji from '@/components/Emoji.vue';

export default defineComponent({
    name: 'InputBox',
    components: { Emoji },
    props: {
 userName: String, currentUserAvatar: String, roomname: String,
},
    setup(props) {
        const text : Ref<string> = ref('');
        const textarea = ref();
        const show = ref();
        const saveMessagesToDatabase = () => {
            database.firestore().collection('messages').add({
                name: props.userName,
                message: text.value,
                type: 'text',
                room: props.roomname,
                avatar: props.currentUserAvatar,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            });
            text.value = '';
            // textarea.value.style.height = '';
        };
        const sendMessages = () => {
            const checkIfOnlySpace = text.value.trim();
                if (checkIfOnlySpace !== '') {
                    saveMessagesToDatabase();
                } else {
                    // alert('Can not send blank space');
                    console.log();
                }
        };
        const canNotSendOnlySpace = (event : any) => {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        };
        // const changeHeight = () => {
        //     textarea.value.style.height = `${textarea.value!.scrollHeight}px`;
        // };


        const getImagesUrlToDatabase = (storageRef : any) => {
            storageRef.getDownloadURL().then((downloadURL: any) => {
                database.firestore().collection('messages').add({
                name: props.userName,
                room: props.roomname,
                avatar: props.currentUserAvatar,
                imageUrl: downloadURL,
                type: 'image',
                timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                });
            });
        };
        const saveImagesToStorage = (event : any) => {
            const imageData = event.target.files[0];
            // checkUploadFileType(event);
            const metadata = {
                contentType: `${event.target.files[0].type}`,
            };
            // Get random number
            const Uid = Math.random().toString(16).slice(2);
            const storageRef = firebase.storage().ref(`images/${Uid + imageData.name}`);
            return storageRef.put(imageData, metadata)
                .then(() => {
                getImagesUrlToDatabase(storageRef);
                });
        };
        const checkImagesType = (event : any) => {
            const testFile = event.target.files[0].type;
                if (!testFile.match('image.*')) {
                    return console.log('Only can upload images');
                }
            return true;
        };
        const resetImagesInputValue = () => {
            const input = document.getElementsByTagName('input')[0];
            input.value = null!;
        };
        const UploadImages = (event : any) => {
            checkImagesType(event);
            saveImagesToStorage(event);
            resetImagesInputValue();
            return true;
        };
        const openEmoji = () => {
            show.value = !show.value;
        };
        const appendEmojiToText = (emojis : any) => {
            text.value += emojis;
            show.value = !show.value;
            textarea.value.focus();
        };

        return {
            sendMessages, canNotSendOnlySpace, UploadImages, openEmoji, appendEmojiToText, text, show, textarea,
        };
    },
});
</script>

<style scoped>
footer {
    width: 100%;
    height: 23vh;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: grid;
    place-items: center;
}

#messages_form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
}
.input_area {
    width: 100%;
    height: 18vh;
    padding: 0.5rem ;
    border-radius: 4px;
    border: 1px solid plum;
    box-shadow: 2px 2px 6px 1px rgba(211, 204, 204, 0.466);
    display: flex;
    justify-content: left;
    align-items: flex-start;
    position: relative;
}

textarea {
    resize: none;
    overflow: auto;
    width: 100%;
    height: 4.5rem;
    max-height: 70px;
    outline: none;
    border: none;
}
.button_area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
}
#send_text_btn {
    outline: none;
    border: none;
    cursor: pointer;
    background: transparent;
    padding: 0;
}
.sendtext_btn, #images_upload_form img, #emoji_icon {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    margin-right: 1rem;
}
.uploadImages {
    display: none;
}
#emoji_icon {
    background-image: url('../assets/he-moji.svg');
    background-repeat:no-repeat;
    background-size:contain;
}
#emoji_icon:hover {
    background-image: url('../assets/hfemoji.svg');
}
.emoji_box {
    position: absolute;
    right: 1.5rem;
    bottom: 8.5rem;
}

@media screen and (max-width : 700px) {
    .emoji_box {
        position: absolute;
        right: 0;
        bottom: 11rem;
    }
}
</style>
