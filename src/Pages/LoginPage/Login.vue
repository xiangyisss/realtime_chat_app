<template>
  <div id='login'>
    <h1>Real time <span> web </span>  chat</h1>
    <div class="avatar">
      <button class="arrow_btn" @click="previousAvatar" ><img class="arrow arrow_left" src="../../assets/left.svg" alt="left" ></button>
      <div v-for="i in [currentIndex]" :key="i" id="avatar">
        <img :src="currentImg" alt="" />
      </div>
      <button class="arrow_btn" @click="nextAvatar" ><img class="arrow arrow_right" src="../../assets/left.svg" alt="right"></button>
    </div>
    <form @submit.prevent='login' autocomplete="off">
      <label for="name">
        <input type="text" name="name" class="input_username" placeholder='Enter your user name' v-model='inputUserName' required>
      </label>
      <button class="login_btn">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref,
} from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const inputUserName : Ref<string> = ref('');
    const images = [
        'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        'https://cdn-icons-png.flaticon.com/512/147/147140.png',
        'https://cdn-icons-png.flaticon.com/512/706/706837.png',
        'https://cdn-icons-png.flaticon.com/512/706/706814.png',
        'https://cdn-icons-png.flaticon.com/512/194/194932.png',
        'https://cdn-icons-png.flaticon.com/512/147/147144.png',
        'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
    ];
    let currentIndex = 0;
    const currentImg = ref();
    const currentImage = () => {
      currentImg.value = images[Math.abs(currentIndex) % images.length];
      return currentImg;
    };
    currentImage();
    const nextAvatar = () => {
       currentIndex += 1;
      currentImage();
    };
    const previousAvatar = () => {
      currentIndex -= 1;
      currentImage();
    };
    const login = () => {
      if (inputUserName.value) {
        router.push({
          name: 'ChatPage',
          params: { userName: inputUserName.value, currentUserAvatar: currentImg.value },
        });
        inputUserName.value = '';
      }
    };
    return {
      inputUserName,
      login,
      previousAvatar,
      nextAvatar,
      currentImage,
      currentIndex,
      images,
      currentImg,
    };
  },
});
</script>

<style scoped>

#login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #42275a;
  background: -webkit-linear-gradient(to right, #734b6d, #42275a);
  background: linear-gradient(to right, #734b6d, #42275a);
}

h1 {
  font-weight: 600;
  margin-bottom: 4rem;
  color: rgb(239, 242, 245);
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

#avatar img {
  width: 5rem;
  height: 5rem;
}

.arrow {
  width: 0.75rem;
  height: 0.75rem;
}

.arrow_right {
  transform: rotate(180deg);
}

form {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input, .login_btn {
  width: 15rem;
  max-width: 15rem;
  border: none;
  outline: none;
  height: 2.5rem;
  padding-left: 0.5rem;
  border-radius: 4px;
  font-family: 'Ubuntu Mono', monospace;
  font-size: 1rem;
}

.input_username {
  margin-bottom: 1rem;
}

.login_btn {
  font-weight: 600;
  color: rgb(238, 236, 236);
  letter-spacing: 1px;
  background-color: #734b6d;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  border: 1px solid #664160;
  transition: all 150ms linear;
}

.login_btn:hover {
  background-color: #42275a;
  border: 1px solid rgba(#000, .05);
  box-shadow: 2px 2px 2px 1px rgba(#fff, .2);
  color: #785f8d;
  text-shadow: -1px -1px 0 #6c5480;
}
.arrow_btn {
  outline: none;
  border: none;
  height: 2.25rem;
  border-radius: 4px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  background: transparent;
}
</style>
