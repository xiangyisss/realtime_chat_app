<template>
  <div id='chat_container'>
    <header class="item_a">
      <button @click="logout" type="button" class="btn btn-outline-primary">Log out</button>
    </header>

    <aside class="item_b">
      <div class="first_character" ><p class="character">{{firstCharacter}}</p></div>
      <div class="groupchat">Group chat</div>
    </aside>

    <section id='chat_box' class="item_c">
      <div
      id="messages_container"
      v-for="message in allMessages"
      :key="message.id"
      :class="message.name === userName ? 'sentMsgStyle' : 'receiveMsgStyle'"
      >
      <!-- :class="message.name === userName ? 'sentMsgStyle' : 'receiveMsgStyle'" -->


          <div class="user_avatar_img"><img :src="message.avatar" alt="user avatar"></div>

          <div class="name">{{message.name}}</div>

          <div class="text_area" @mouseover="hover = true" @mouseleave="hover = false">
              <p class="text" v-if="message.type === 'text'">{{message.message}}</p>

              <div class="images" v-else id="images_container" >
                <img class="uploaded_images" :src="message.imageUrl" alt="photo" @load="scrollToBottom">
              </div>

              <!-- <div class="time">{{message.timestamp.toDate()}}</div> -->
              <!-- <div class="emoji_react">{{emojiReact}}</div> -->
              <!-- <div class="time">{{`${message.timestamp.toDate().getDate() + '/' + '0' + message.timestamp.toDate().getMonth() + '/' + message.timestamp.toDate().getFullYear() +' ' + message.timestamp.toDate().getHours()}:${message.timestamp.toDate().getMinutes()}:${message.timestamp.toDate().getSeconds()}`}}</div> -->
          </div>

      </div>

      <!-- <div  v-if="hover" >

      </div> -->
    </section>

    <footer class="item_d">
      <form @submit.prevent="saveMessagesToDatabase" id="messages_form" autocomplete="off">
        <input type="text" placeholder="Aa" class="type_message" id="message" v-model="text" >

        <div class="emoji_image_btn">
          <div id="emoji_icon" @click="openEmoji" >
            <!-- <img src="../assets/hfemoji.svg" alt=""> -->
          </div>

          <div id="image_icon">
            <form @submit.prevent id="images_form" >
              <label for="uploadImages">
                <img src="../assets/gimage.svg" alt="">
              </label>
              <input type="file" id="uploadImages" accept="image/*" @change="UploadImages" >
            </form>
          </div>

          <button id="send_text"><img class="send_img" src="../assets/s-1.svg" alt=""></button>

        </div>

      </form>
      <div  v-if="show" class="emoji">
        <emoji @onEmojiClick = appendEmojiToText />
      </div>

    </footer>

  </div>
</template>

<script lang="ts">
import {
 defineComponent, Ref, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase';
import database from '../db';
import Emoji from '@/components/Emoji.vue';

// interface style {
//   backgroundColor: string,
//   color: string,
//   float: string,
// }
export default defineComponent({
  components: { Emoji },
  props: { userName: String, currentUserAvatar: String },
  name: 'Chat',
  setup(props) {
    const router = useRouter();
    const logout = () => {
      router.push({
        name: 'Login',
      });
    };

    const text : Ref<string> = ref('');
    const allMessages : Ref<string[]> = ref([]);
    const show = ref();
    const newRoom = ref('');
    // const avatar = ref('');
    const firstCharacter = ref('');
    const hover = ref(Boolean);
    const emojiReact = ref('');

    const appendEmojiToDatabase = (emojis : any) => {
      emojiReact.value = emojis;
      // console.log(hover);
    };

    // const currentUserImages = () => {
    //   avatar.value = props.currentUserAvatar;
    // };

    // const messageRef = database.firestore().collection('newrooms').doc(`${newRoom.value}`);
    const getNamesFirstletter = () => {
      firstCharacter.value = props.userName!.charAt(0);
      console.log('Its running', firstCharacter.value);
    };
    getNamesFirstletter();

    const rebeccaChat = () => {
      database.firestore().collection('rebeccca').add({
        name: props.userName,
        message: text.value,
        type: 'text',
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    };

    const appendEmojiToText = (emojis : any) => {
      const input : any = document.getElementById('message');
      text.value += emojis;
      show.value = !show.value;
      input.focus();
    };

    const openEmoji = () => {
      show.value = !show.value;
    };


    const scrollToBottom = () => {
      const chatBox : any = document.getElementById('chat_box');
      chatBox.scrollTop = chatBox.scrollHeight;
    };


    const saveMessagesToDatabase = () => {
      database.firestore().collection('messages').add({
        name: props.userName,
        message: text.value,
        type: 'text',
        // emoj: emojiReact.value,
        avatar: props.currentUserAvatar,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        scrollToBottom();
      });
      text.value = '';
    };


    const getImagesUrlToDatabase = (storageRef : any) => {
      storageRef.getDownloadURL().then((downloadURL: any) => {
        database.firestore().collection('messages').add({
          name: props.userName,
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
      const input = document.getElementsByTagName('input')[2];
      input.value = null!;
      console.log('input Value: ', input);
    };



    const UploadImages = (event : any) => {
      checkImagesType(event);
      saveImagesToStorage(event);
      resetImagesInputValue();
      return true;
    };


    const loadAllMessages = () => {
      const query : any = database.firestore().collection('messages').orderBy('timestamp').limit(50);
      query.onSnapshot((snapShot : any) => {
      snapShot.docChanges().forEach((change : any) => {
        if (change.type === 'added') {
          allMessages.value.push(change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed', change.doc.data());
        }
      });
      });
      setTimeout(() => {
        scrollToBottom();
        // console.log('texting-2');
      }, 700);
    };


    loadAllMessages();


    return {
      logout,
      saveMessagesToDatabase,
      text,
      allMessages,
      scrollToBottom,
      UploadImages,
      openEmoji,
      show,
      appendEmojiToText,
      rebeccaChat,
      newRoom,
      // currentUserImages,
      // avatar,
      getNamesFirstletter,
      firstCharacter,
      hover,
      appendEmojiToDatabase,
      emojiReact,
    };
  },
});
</script>

<style scoped>

.first_character {
  width: 60px;
  height: 60px;
  /* padding: 1rem; */
  background:rgb(81, 81, 255);
  border-radius: 100%;
  margin-bottom: 1.5rem;
}
.character {
  font-size: 40px;
  font-weight: 500;
  line-height: 60px;
  margin: 0;
}
.user_avatar_img {
  margin-right: 1rem;
}
.user_avatar_img img{
  width: 24px;
  height: 24px;
}

.chatroom {
  width: 200px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding-left: 50px;
  margin-bottom: 1rem;
  cursor: pointer;
  font-weight: 600;
}

.groupchat {
  font-weight: 600;
}

#send_text {
  /* background-image: url('../assets/send.png');
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px; */
  outline: none;
  border: none;
  cursor: pointer;
  background: none;
  /* pointer-events: none; */
}

#uploadImages {
  display: none;
}
#images_form label img, .send_img{
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.item_a {
  grid-area: header;
}
.item_b {
  grid-area: aside;
}
.item_c {
  grid-area: section;
}
.item_d {
  grid-area: footer;
}
#chat_container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
  'header header header header header'
  'aside section section section section'
  'aside footer footer footer footer'
  ;
}
header {
  height: 8vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

aside {
  border-right: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
section, footer {
  height: 80vh;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

#messages_container {
  /* margin-top: 1rem ;*/
  /* margin-left: auto;
  margin-right: 1rem; */
  display: flex;
  margin-bottom: 1rem;
  /* width: 70%;
  height: auto;
  min-height: 3rem; */
  max-width: 60%;
  width:fit-content;
  height:fit-content;
  /* background-color: rgba(102, 86, 83, 0.089); */
  border-radius: 4px;
  position: relative;
}
/* #messages_container:hover {
  background-color: rgba(179, 175, 175, 0.158);
} */

.text {
  text-align: left;
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  /* margin-bottom: 0.5rem; */
  word-break: break-all;
  width:fit-content;
  height:fit-content;
  margin: 0;
}

.name {
  text-align: right;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  position: absolute;
  top: 0;
  right: 0;
}

.time {
  text-align: left;
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.75rem;
  /* position: absolute;
  bottom: 0;
  left: 0; */
}

#chat_box {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 80vh;
  scroll-behavior: smooth;
}

footer {
  height: 12vh;
  width: 100%;
  /* margin-top: 1rem; */
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
}

/* button {
  padding: 0.5rem;
  outline: none;
  cursor: pointer;
} */

.type_message {
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  outline: none;
  border-radius: 20px;
  border: 1px solid rgba(141, 135, 135, 0.466);
  box-shadow: 2px 2px 6px 1px rgba(211, 204, 204, 0.466);
}

.sentMsgStyle {
  background: rgba(137, 186, 231, 0.24);
  color: rgb(32, 31, 31);
  margin-left: auto;
  /* text-align: right; */
}
.receiveMsgStyle {
  color: rgb(32, 31, 31);
  background: rgba(243, 238, 238, 0.466);
  /* height: 300px; */
  margin-right: auto;
}

.today {
  width: 5rem;
  height: 1.75rem;
  background: pink;
}

.uploaded_images, #images_container {
  width: 300px;
  height: 300px;
}

/* #uploadImages {
  color: rgba(0, 0, 0, 0);
  width: 100px;
} */

#emoji_icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-image: url('../assets/he-moji.svg');
    background-repeat:no-repeat;
   background-size:contain;
}

#emoji_icon:hover {
  background-image: url('../assets/hfemoji.svg');
}

#messages_form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.emoji_image_btn {
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  right: 0;
  margin-right: 1rem;
}

.emoji {
  position: absolute;
  right: 2.5rem;
  bottom: 5.5rem;
}

</style>
