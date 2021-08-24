<template>
  <div class='login'>
    <form @submit.prevent='login'>
      <label for="">User name</label>
      <input type="text" placeholder='Enter your user name' v-model='inputUserName' required>
      <input type="submit" value="Login">
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref,
} from 'vue';
import { useRouter } from 'vue-router';

// interface data {
//   userName: string,
//   messages: string[]
// }

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const inputUserName : Ref<string> = ref('');
    // const state : data = reactive({
    //   userName: '',
    //   messages: [],
    // });

    /*

  if (true or false)

    0 is false
    '' is false
    null is false
    undefined is false

    if(value) => as long as not [0, '', null, undefined]

    */

    const login = () => {
      if (inputUserName.value) {
        router.push({
          name: 'Chat',
        });
        // state.userName = inputUserName.value;
        inputUserName.value = '';
      }
    };
    return {
      inputUserName,
      login,
      // state,

    };
  },
});
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  display: block;
  text-align: left;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input {
  border: none;
  outline: none;
  height: 2.5rem;
  padding-left: 0.5rem;
  border-radius: 4px;
}

button {
  outline: none;
  border: none;
  height: 2.5rem;
  padding-left: 0.5rem;
  border-radius: 4px;
}
</style>
