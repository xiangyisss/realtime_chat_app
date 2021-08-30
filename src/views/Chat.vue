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
        <div class="time">{{`${message.timestamp.toDate().getHours()}:${message.timestamp.toDate().getMinutes()}`}}</div>
      </div>
    </section>
    <footer>
      <form @submit.prevent="saveMessages" id="message_form">
        <input type="text" placeholder="Write a message..." class="type_message" id="message" v-model="text">
        <input type="submit" value="Send " class="send_button" id="submit" >
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
    const allMessages : Ref<any[]> = ref([]);


    const scrollToBottom = () => {
      const chatBox : any = document.getElementById('chat_box');
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    const saveMessages = () => {
      database.firestore().collection('messages').add({
        name: props.userName,
        message: text.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        scrollToBottom();
        console.log('texting-1');
      });
      text.value = '';
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
              console.log('added', change.doc.data());
              allMessages.value.push(change.doc.data());
          }
        if (change.type === 'removed') {
              console.log('Removed', change.doc.data());
        }
      });
      });

      setTimeout(() => {
        scrollToBottom();
        console.log('texting-2');
      }, 600);
    };


    loadMessages();

    return {
      logout, saveMessages, text, loadMessages, allMessages, scrollToBottom,
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

</style>
