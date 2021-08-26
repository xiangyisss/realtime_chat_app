<template>
  <div class='chat'>
    <header>
      <button @click="logout">Log out</button>
    </header>
    <section class='chat_box'>//Message
      <div id="container" v-for="message in allMessages" :key="message.id">
        <div class="text">{{message.message}}</div>
        <div class="time">{{message.timestamp.toDate.created_at.toDate()}}</div>
      </div>
    </section>
    <footer>
      <form @submit.prevent id="message_form">
        <input type="text" placeholder="Write a message..." class="type_message" id="message" v-model="text">
        <input type="submit" value="Send " class="send_button" id="submit" @click="saveMessages">
      </form>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase';
import database from '../db';



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

    const saveMessages = () => {
      database.firestore().collection('messages').add({
        name: props.userName,
        message: text.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log(database);
      text.value = '';
    };

    const loadMessages = () => {
      const query : any = database.firestore().collection('messages').orderBy('timestamp', 'desc').limit(5);
        query.onSnapshot((snapShot : any) => {
        const messages : Ref<any[]> = ref([]);
        snapShot.docChanges().forEach((change : any) => {
          messages.value.push(change.doc.data());
        });
        allMessages.value = messages.value;
        // console.log(allMessages.value);
      });
    };

    loadMessages();


    return {
      logout, saveMessages, text, loadMessages, allMessages,
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
  margin-top: 1rem ;
  margin-left: auto;
  margin-right: 1rem;
  width: 40%;
  height: 3rem;
  background-color: rgba(102, 86, 83, 0.089);
  border-radius: 4px;
  position: relative;
}

.text {
  text-align: left;
  padding: 0.5rem 0 0 0.5rem;
}

.time {
  text-align: right;
  padding-right: 0.5rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  right: 0;
}

footer {
  height: 12vh;
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
</style>
