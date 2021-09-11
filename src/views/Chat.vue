<template>
  <div id='chat_container'>
    <header class="item_a">
      <button @click="logout">Log out</button>
      <button @click="createNewRoom">Creat new room</button>
    </header>

    <aside class="item_b">
      <div class="chatroom group_chat">Group Chat</div>
      <div class="chatroom rebecca">Rebecca</div>
      <div class="chatroom pedro">Pedro</div>
    </aside>
    <section id='chat_box' class="item_c">
      <div
      id="messages_container"
      v-for="message in allMessages"
      :key="message.id"
      :class="message.name === userName ? 'sentMsgStyle' : 'receiveMsgStyle'">
        <div v-if="message.type === 'text'" class="text" >{{message.message}}</div>
        <div v-else id="images_container" >
          <img :src="message.imageUrl" alt="photo" @load="scrollToBottom">
        </div>
        <div class="name">{{message.name}}</div>
        <div class="time">{{`${message.timestamp.toDate().getDate() + '/' + '0' + message.timestamp.toDate().getMonth() + '/' + message.timestamp.toDate().getFullYear() +' ' + message.timestamp.toDate().getHours()}:${message.timestamp.toDate().getMinutes()}:${message.timestamp.toDate().getSeconds()}`}}</div>
        <!-- <div class="time">{{message.timestamp.toDate()}}</div> -->
      </div>
    </section>

    <footer class="item_d">
      <form @submit.prevent="saveMessagesToDatabase" id="messages_form">
        <input type="text" placeholder="Type your message..." class="type_message" id="message" v-model="text">
        <button id="send_text"></button>
        <div id="image_icon">
          <form @submit.prevent id="images_form" >
            <label for="uploadImages">
              <img src="../assets/link.png" alt="">
            </label>
            <input type="file" id="uploadImages" accept="image/*" @change="UploadImages" >
          </form>
        </div>
        <div id="emoji_icon" @click="openEmoji">
          <img src="../assets/smile.svg" alt="" >
        </div>
      </form>
      <div  v-if="show" >
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
  props: { userName: String },
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

    const messageRef = database.firestore().collection('rooms').doc('roomA');
    const createNewRoom = () => {
      messageRef.collection('testing').add({
        name: props.userName,
        message: text.value,
        type: 'text',
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    };

    const appendEmojiToText = (emojis : any) => {
      text.value += emojis;
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
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        scrollToBottom();
      });
      text.value = '';
    };

    // const checkUploadFileType = (event : any) => {
    //   imageData.value = event.target.files;
    //   if (!imageData.value[0].type.match('image.*')) {
    //     return console.log('Only can upload images');
    //   }
    //   return true;
    // };

    // const addImagesToDatabase = () => database.firestore().collection('messages').add({
    //       name: props.userName,
    //       imageUrl: images.value,
    //       type: 'image',
    //       timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    //     });


    const getImagesUrlToDatabase = (storageRef : any) => {
      storageRef.getDownloadURL().then((downloadURL: any) => {
        database.firestore().collection('messages').add({
          name: props.userName,
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
      createNewRoom,
    };
  },
});
</script>

<style scoped>
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

.group_chat {
  background: aqua;
  cursor: default !important;
}

#send_text {
  background-image: url('../assets/send.png');
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  outline: none;
  border: none;
  cursor: pointer;
}

#uploadImages {
  display: none;
}
#images_form label img{
  width: 24px;
  height: 24px;
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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
  'header header header header'
  'aside section section section'
  'footer footer footer footer'
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
}
section {
  height: 80vh;
}

#messages_container {
  /* margin-top: 1rem ;*/
  /* margin-left: auto;
  margin-right: 1rem; */
  margin-bottom: 0.75rem;
  width: 40%;
  height: auto;
  min-height: 3rem;
  /* background-color: rgba(102, 86, 83, 0.089); */
  border-radius: 4px;
  position: relative;

}

.text {
  text-align: left;
  padding: 0.5rem 0 0 0.5rem;
  margin-bottom: 0.5rem;
}

.name {
  text-align: right;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  right: 0;
}

.time {
  text-align: left;
  padding-left: 0.5rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  left: 0;
}

#chat_box {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 80vh;
  scroll-behavior: smooth;
}

footer {
  height: 8vh;
  margin-top: 1rem;
  display: flex;
  justify-content: end;
}

button, .send_button {
  padding: 0.5rem;
  outline: none;
  cursor: pointer;
}

.type_message {
  width: 60%;
  padding: 0.5rem;
  outline: none;
}

.sentMsgStyle {
  background-color: green;
  color: aliceblue;
  margin-left: auto;
  margin-right: 1rem;
}
.receiveMsgStyle {
  background-color: brown;
  color: white;
  margin-left: 1rem;
  height: 300px;
  margin-right: auto;
}

.today {
  width: 5rem;
  height: 1.75rem;
  background: pink;
}

img, #images_container {
  width: 100px;
  height: 100px;
}

/* #uploadImages {
  color: rgba(0, 0, 0, 0);
  width: 100px;
} */

#emoji_icon,  #emoji_icon img {
  width: 20px;
  height: 20px;
}

 #emoji_icon img {
   cursor: pointer;
 }

#messages_form {
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
