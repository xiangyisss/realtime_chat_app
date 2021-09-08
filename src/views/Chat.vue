<template>
  <div class='chat'>
    <header>
      <button @click="logout">Log out</button>
    </header>

    <section id='chat_box' >
      <div >
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
      </div>

      <!-- <div  id="images_container">
        <div v-for="image in allMessages" :key="image.id">
          <img :src="image.imageUrl" alt="photo" @load="scrollToBottom">
        </div>
      </div> -->

    </section>

    <footer>
      <form @submit.prevent="sendMessagesToCloud" id="message_form">
        <input type="text" placeholder="Write a message..." class="type_message" id="message" v-model="text">
        <input type="submit" value="Send " class="send_button" id="submit">
      </form>
      <form @submit.prevent>
        <input type="file" id="uploadImage"  @change="uploadImagesToStorage" >
        <button >Button</button>
      </form>
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

// interface style {
//   backgroundColor: string,
//   color: string,
//   float: string,
// }
export default defineComponent({
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
    const imageData = ref();
    const images :Ref<string> = ref('');


    const scrollToBottom = () => {
      const chatBox : any = document.getElementById('chat_box');
      chatBox.scrollTop = chatBox.scrollHeight;
    };


    const sendMessagesToCloud = () => {
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

    const sendOnlyImages = (event : any) => {
      imageData.value = event.target.files;
      if (!imageData.value[0].type.match('image.*')) {
        return console.log('Only can upload images');
      }
      return true;
    };

    // const addImagesToDatabase = () => database.firestore().collection('messages').add({
    //       name: props.userName,
    //       imageUrl: images.value,
    //       type: 'image',
    //       timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    //     });


    const getImagesUrl = (storageRef : any) => {
       storageRef.getDownloadURL().then((downloadURL: any) => {
        database.firestore().collection('messages').add({
          name: props.userName,
          imageUrl: downloadURL,
          type: 'image',
          timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        });
      });
    };


    const uploadImagesToStorage = (event : any) => {
      imageData.value = event.target.files;
      sendOnlyImages(event);
      const metadata = {
        contentType: `${event.target.files[0].type}`,
      };
      // Get random number
      const Uid = Math.random().toString(16).slice(2);
      console.log(Uid);
      const storageRef = firebase.storage().ref(`images/${Uid + imageData.value[0].name}`);
      return storageRef.put(imageData.value[0], metadata)
        .then(() => {
          getImagesUrl(storageRef);
        });
    };




    const loadMessages = () => {
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


    loadMessages();


    return {
      logout, sendMessagesToCloud, text, loadMessages, allMessages, scrollToBottom, uploadImagesToStorage, images,
    };
  },
});
</script>

<style scoped>
header {
  height: 8vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
}

button, .send_button {
  padding: 0.5rem;
  outline: none;
  cursor: pointer;
}

.type_message {
  width: 80%;
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

</style>
