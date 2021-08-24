<template>
  <div class='chat'>
    <header>
      <button @click="logout">Log out</button>

    </header>
    <section class='chat_box'>//Message</section>
    <footer>
      <form @submit.prevent>
        <input type="text" placeholder="Write a message..." class="type_message" v-model="text">
        <input type="submit" value="Send " class="send_button" @click="saveMessages">
      </form>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import database from '../db';

export default defineComponent({
  name: 'Chat',
  setup() {
    const router = useRouter();
    const logout = () => {
      router.push({
        name: 'Login',
      });
    };

    const text : Ref<string> = ref('');

    function saveMessages() {
     console.log('Testing');
      database.firestore().collection('messages').add({
        name: 'Xiangyi',
        message: text.value,
        // profilePicUrl: getProfilePicUrl(),
        // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      text.value = '';
    }

    return { logout, saveMessages, text };
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
