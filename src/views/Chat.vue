<template>
  <div class='chat'>
    <header>
      <button @click="logout">Log out</button>

    </header>
    <section class='chat_box'>//Message</section>
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
