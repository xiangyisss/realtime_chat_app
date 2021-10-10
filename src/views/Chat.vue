<template>
  <div id='chat_container'>
      <top-menu-bar class="topmenu_bar" v-if="windowWidth > 700"/>
      <mobile-version-menu class="mobilemenu_bar" v-if="windowWidth < 700" @roomNameToParent="roomName"/>
      <side-menu class="sidemenu" :userName="userName"  :currentUserAvatar ="currentUserAvatar" @roomNameToParent="roomName"/>
      <chat-box class="chatbox" :userName="userName" :currentUserAvatar ="currentUserAvatar" :roomname ="roomdata" />
      <input-box class="inputbox" :userName="userName"  :currentUserAvatar ="currentUserAvatar" :roomname ="roomdata" />
  </div>
</template>

<script lang="ts">
import {
 defineComponent, ref, onMounted,
} from 'vue';

import TopMenuBar from '@/components/TopMenuBar.vue';
import SideMenu from '@/components/SideMenu.vue';
import InputBox from '@/components/InputBox.vue';
import ChatBox from '@/components/ChatBox.vue';
import MobileVersionMenu from '@/components/MobileVersionMenu.vue';


// interface style {
//   backgroundColor: string,
//   color: string,
//   float: string,
// }

export default defineComponent({
  components: {
    TopMenuBar,
    SideMenu,
    InputBox,
    ChatBox,
    MobileVersionMenu,
  },
  props: { userName: String, currentUserAvatar: String },
  name: 'Chat',
  setup() {
    const roomdata = ref('Public chat');
    const roomName = (name : any) => {
            roomdata.value = name;
        };
    const windowWidth = ref(window.innerWidth);
    const widthChange = () => {
        windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
        window.addEventListener('resize', widthChange);
    });
    return { roomName, roomdata, windowWidth };
  },
});
</script>

<style scoped>
* p {
  margin-bottom: 0;
}
.mobilemenu_bar {
  grid-area: header;
}
.topmenu_bar {
  grid-area: header;
}
.sidemenu {
  grid-area: aside;
}
.chatbox {
  grid-area: section;
}
.inputbox {
  grid-area: footer;
}
#chat_container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
  'header header header header header'
  'aside section section section section'
  'aside footer footer footer footer'
  ;
  width: 100%;
  height: 100vh;
}

@media (max-width : 700px) {
  #chat_container {
    grid-template-columns: 1fr;
    grid-template-areas:
    'header  '
    'section  '
    'footer '
    ;
  }
  .sidemenu {
    display: none;
  }
}
</style>
