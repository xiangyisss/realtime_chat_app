<template>

  <div class='login'>
    <div class="avatar">
      <button @click="before"><i class="bi bi-chevron-left"></i></button>
      <div v-for="i in [currentIndex]" :key="i" id="avatar">
        <img :src="currentImg" alt="" />
      </div>
      <button @click="next"><i class="bi bi-chevron-right"></i></button>
    </div>
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


    const images = [
        'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
        'https://cdn-icons-png.flaticon.com/512/194/194932.png',
        'https://cdn-icons-png.flaticon.com/512/147/147140.png',
        'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        'https://cdn-icons-png.flaticon.com/512/147/147144.png',
        'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    ];
    let currentIndex = 0;
    const currentImg = ref();
    const currentImage = () => {
      currentImg.value = images[Math.abs(currentIndex) % images.length];
    };
    currentImage();
    const next = () => {
       currentIndex += 1;
      currentImage();
    };
    const before = () => {
      currentIndex -= 1;
      currentImage();
    };

    const login = () => {
      if (inputUserName.value) {
        router.push({
          name: 'groupchat',
          params: { userName: inputUserName.value, currentUserAvatar: currentImg.value },
        });
        // state.userName = inputUserName.value;
        inputUserName.value = '';
      }
    };
    return {
      inputUserName,
      login,
      before,
      next,
      currentImage,
      currentIndex,
      images,
      currentImg,

      // state,

    };
  },
});
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar button {
  background: none;
}
#avatar,  #avatar img{
  width: 50px;
  height: 50px;
}
.login {
  width: 100%;
  height: 100vh;
  background-color: tomato;
  display: flex;
  flex-direction: column;
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
