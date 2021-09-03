<template>
  <div class='chat'>
    <header>
      <button @click="logout">Log out</button>
    </header>
    <section id='chat_box' >
      <div
      id="container"
      v-for="message in allMessages"
      :key="message.id"
      :class="message.name === userName ? 'sentMsgStyle' : 'receiveMsgStyle'">
        <div class="text">{{message.message}}</div>
        <div class="name">{{message.name}}</div>
        <div class="time">{{`${message.timestamp.toDate().getDate() + '/' + '0' + message.timestamp.toDate().getMonth() + '/' + message.timestamp.toDate().getFullYear() +' ' + message.timestamp.toDate().getHours()}:${message.timestamp.toDate().getMinutes()}:${message.timestamp.toDate().getSeconds()}`}}</div>
        <!-- <div class="time">{{message.timestamp.toDate()}}</div> -->
      </div>
        <img :src="images" alt="photo" >
    </section>
    <footer>
      <form @submit.prevent="saveMessages" id="message_form">
        <input type="text" placeholder="Write a message..." class="type_message" id="message" v-model="text">
        <input type="file" id="uploadImage"  @change="sendImages">
        <input type="submit" value="Send " class="send_button" id="submit">
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
    const images :Ref<any[]> = ref([]);
    // let show = false;


    const scrollToBottom = () => {
      const chatBox : any = document.getElementById('chat_box');
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    const saveMessages = () => {
      database.firestore().collection('messages').add({
        name: props.userName,
        message: text.value,
        imageUrl: '',
        // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        // timestamp: new Date(),
      })
      .then(() => {
        scrollToBottom();
        // console.log('texting-1');
      });
      text.value = '';
    };

    // const checkIfExistance = () => {
    //   show = !show;
    // };

    const sendImages = (event : any) => {
      database.firestore().collection('messages').add({
        name: props.userName,
        message: text.value,
        imageUrl: '',
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        // timestamp: new Date(),
      })
      .then((messageRef) => {
        const metadata = {
          contentType: `${event.target.files[0].type}`,
        };
        imageData.value = event.target.files;
        console.log('imageData', imageData.value[0]);
        const storageRef = firebase.storage().ref(`images/${imageData.value[0].name}`);
        storageRef.put(imageData.value[0], metadata)
          .then(() => {
            storageRef.getDownloadURL().then((downloadURL) => {
              images.value = downloadURL;
              messageRef.update({
                imageUrl: downloadURL,
              });
            });
        });
      });
    };



    const loadMessages = () => {
      const query : any = database.firestore().collection('messages').orderBy('timestamp').limit(50);
      // query.onSnapshot((snapShot : any) => {
      //   const messages : Ref<any[]> = ref([]);
      //   snapShot.forEach((el : any) => {
      //     messages.value.push(el.data());
      //   });
      //   allMessages.value = messages.value;
      // });

      query.onSnapshot((snapShot : any) => {
      snapShot.docChanges().forEach((change : any) => {
        if (change.type === 'added') {
              // console.log('added', change.doc.data());
              allMessages.value.push(change.doc.data());
          }
        if (change.type === 'removed') {
              // console.log('Removed', change.doc.data());
        }
      });
      });

      setTimeout(() => {
        scrollToBottom();
        // console.log('texting-2');
      }, 1000);
    };

    // const dayStyle = reactive({
    //   width: '5rem',
    //   height: '1.75rem',
    //   backgroundColor: 'pink',
    //   innerHTML: 'Today',
    // });



    //   const day : Ref<object{}> = reactive({
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     hour12: false,
    //   });
    // const days = new Date().toLocaleTimeString('en-us', day.value);
    // console.log(days);
    // const today = new Date();
    //   if (date.value !== yesterday) {
    //     dayStyle.backgroundColor = 'salmon';
    //     dayStyle.innerHTML = 'Yesterday';
    //   } else {
    //     dayStyle.backgroundColor = 'black';
    //   }
    // };

    loadMessages();


    return {
      logout, saveMessages, text, loadMessages, allMessages, scrollToBottom, sendImages, images,
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

#container {
  /* margin-top: 1rem ;*/
  /* margin-left: auto;
  margin-right: 1rem; */
  margin-bottom: 0.75rem;
  width: 40%;
  height: 3rem;
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
  margin-right: auto;
}

.today {
  width: 5rem;
  height: 1.75rem;
  background: pink;
}

img {
  width: 100px;
  height: 100px;
}

</style>
