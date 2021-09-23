<template>
  <div id='chat_container'>
    <header class="item_a">
      <button @click="logout" type="button" class="btn btn-outline-primary">Log out</button>
    </header>

    <aside class="item_b">
      <div class="first_character" ><p class="character">{{firstCharacter}}</p></div>
      <div class="groupchat">Group chat</div>
    </aside>

    <section id='chat_box' ref="chatbox" class="item_c" >
      <div
      id="messages_container"
      v-for="message in allMessages"
      :key="message.id"
      ref="chatDiv"
            :class="message.name === userName ? 'sentMsgStyleToRight' : 'receiveMsgStyleLeft'"

      >
      <!-- :class="message.name === userName ? 'sentMsgStyle' : 'receiveMsgStyle'" -->


          <div class="user_avatar_img"  :class="message.name === userName && 'sentMsgStyleToMargin' "><img :src="message.avatar" alt="avatar">
          </div>


          <div class="wrap" :class="message.name === userName && 'sentMsgStyleDirection' ">

              <div class="name" :class="message.name === userName && 'sentMsgStylePadding' "  >
              <!-- v-if="message.time !== allMessages[i - 1 ].time || message.name !== allMessages[i - 1 ]?.name" -->
              {{message.name}}</div>

              <div class="text_area" @mouseover="hover = true" @mouseleave="hover = false"
              :class="message.name === userName ? 'sentMsgStyle' : 'receiveMsgStyle'">
                  <p class="text" v-if="message.type === 'text'">{{message.message}}</p>

                  <div class="images" v-else id="images_container" >
                    <img :src="message.imageUrl" alt="images" @load="scrollToBottom">
                  </div>

                  <!-- <div class="emoji_react">{{emojiReact}}</div> -->
                  <!-- <div class="time">{{`${message.timestamp.toDate().getDate() + '/' + '0' + message.timestamp.toDate().getMonth() + '/' + message.timestamp.toDate().getFullYear() +' ' + message.timestamp.toDate().getHours()}:${message.timestamp.toDate().getMinutes()}:${message.timestamp.toDate().getSeconds()}`}}</div> -->
              </div>
          </div>

      </div>

      <!-- <div  v-if="hover" >

      </div> -->
    </section>

    <footer class="item_d">
      <form @submit.prevent @keyup.enter="saveMessagesToDatabase" id="messages_form" autocomplete="off">
        <div class="input_wrap">
          <textarea name="" placeholder="Aa"
          ref="textarea"  rows="1" @input="changeHeight"  v-model="text"></textarea>
        <!-- <input type="text" placeholder="Aa" class="type_message" id="message" v-model="text" > -->
        </div>


        <div class="emoji_image_btn">
          <div id="emoji_icon" @click="openEmoji" >
            <!-- <img src="../assets/hfemoji.svg" alt=""> -->
          </div>

          <div id="image_icon">
            <form @submit.prevent id="images_form" >
              <label for="uploadImages">
                <img src="../assets/gimage.svg" alt="">
              </label>
              <input type="file" ref="uploadImg" id="uploadImages" accept="image/*" @change="UploadImages" >
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
 defineComponent, Ref, ref, onUpdated, onMounted, watch,
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
    const textarea = ref();
    const chatbox = ref();

    watch(() => text, (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
      console.log('running0');
    });

    const changeHeight = () => {
      textarea.value.style.height = `${textarea.value!.scrollHeight}px`;
    };

    const appendEmojiToDatabase = (emojis : any) => {
      emojiReact.value = emojis;
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
      text.value += emojis;
      show.value = !show.value;
      textarea.value.focus();
    };

    const openEmoji = () => {
      show.value = !show.value;
    };


    const scrollToBottom = () => {
      chatbox.value.scrollTop = chatbox.value.scrollHeight;
    };


    const saveMessagesToDatabase = () => {
        database.firestore().collection('messages').add({
        name: props.userName,
        message: text.value,
        type: 'text',
        // emoj: emojiReact.value,
        avatar: props.currentUserAvatar,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      });
      text.value = '';
      textarea.value.style.height = '';
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
      const input = document.getElementsByTagName('input')[0];
      console.log('running-images', input.value);
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
    };

    onMounted(() => {
      scrollToBottom();
      console.log('0');
    });

    onUpdated(() => {
      scrollToBottom();
      console.log('1');
    });

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
      changeHeight,
      textarea,
      // chatDiv,
      chatbox,

    };
  },
});
</script>

<style scoped>

header button {
  margin-right: 1rem;
}
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
  width: 100%;
  height: 100vh;
  /* background-color: #190b25; */
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
section {
  height: 80vh;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}



#messages_container {
  display: flex;
  margin-bottom: 1rem;
  /* width: 70%;
  height: auto;
  min-height: 3rem; */
  max-width: 60%;
  width:fit-content;
  height:fit-content;
  border-radius: 4px;
  position: relative;
}
/* #messages_container:hover {
  background-color: rgba(179, 175, 175, 0.158);
} */

.sentMsgStyle {
  background: #0c33f5c9;
  color: rgb(241, 234, 234);
  margin-left: auto;
  /* text-align: right; */
  border-radius: 0.75rem 0 0.75rem 0.75rem;
  box-shadow: #0c33f52a 0px 1px 1px 0px, #0c33f527 0px 1px 2px 1px;
}
.sentMsgStyleToRight {
  margin-left: auto;
  display: flex;
  flex-direction: row-reverse;
  /* justify-content: flex-end; */
}
.sentMsgStyleToMargin {
  margin-right: 0;
  margin-left: 1rem;
}
.sentMsgStylePadding {
  padding-right: 0 !important;
  text-align: right;
}
.sentMsgStyleDirection {
  align-items: flex-end !important;
}
.receiveMsgStyleLeft {
  margin-right: auto;
}
.receiveMsgStyle {
  color: rgb(29, 28, 28);
  background: rgba(212, 209, 209, 0.267);
  /* height: 300px; */
  margin-right: auto;
  border-radius: 0 0.75rem 0.75rem 0.75rem;
  box-shadow: rgba(60, 64, 67, 0.199) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}



.wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.text {
  text-align: left;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  word-break: break-all;
  margin: 0;
}

.name {
  /* text-align: right; */
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  /* position: absolute;
  top: 0;
  right: 0; */
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
  height: 75vh;
  /* scroll-behavior: smooth; */
  padding-top: 1rem;
}

footer {
  height: 17vh;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  /* margin-top: 1rem; */
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
}

.input_wrap {
  width: 100%;
  /* height:fit-content; */
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 2rem;
  border: 1px solid rgba(141, 135, 135, 0.466);
  box-shadow: 2px 2px 6px 1px rgba(211, 204, 204, 0.466);
  display: flex;
  justify-content: left;
  align-items: center;
}
.type_message {
  /* float: left; */
  width: 20%;
  height: auto;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  outline: none;
  border: none;
}

textarea {
  resize: none;
  overflow-y:auto;
  line-height: 1.5;
  width: 80%;
  max-height: 80px;
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(228, 221, 221);
}

#images_container {
  background-color: #fff;

}

#images_container img {
  object-fit: cover;
  max-width: 300px;
  max-height: 200px;
}



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
