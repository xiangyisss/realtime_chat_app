<template>
  <div id='chat_container'>
      <menu-bar />
      <side-menu :userName="userName"  :currentUserAvatar ="currentUserAvatar" @roomNameToParent="roomName"/>
      <chat-box :userName="userName" :currentUserAvatar ="currentUserAvatar" :roomname ="roomdata" />
      <input-box :userName="userName"  :currentUserAvatar ="currentUserAvatar" :roomname ="roomdata" />
  </div>
</template>

<script lang="ts">
import {
 defineComponent, ref,
} from 'vue';

import MenuBar from '@/components/MenuBar.vue';
import SideMenu from '@/components/SideMenu.vue';
import InputBox from '@/components/InputBox.vue';
import ChatBox from '@/components/ChatBox.vue';

// interface style {
//   backgroundColor: string,
//   color: string,
//   float: string,
// }

export default defineComponent({
  components: {
    MenuBar, SideMenu, InputBox, ChatBox,
  },
  props: { userName: String, currentUserAvatar: String },
  name: 'Chat',
  setup() {
    const roomdata = ref('Public chat');
    const roomName = (name : any) => {
            roomdata.value = name;
            // console.log('running-2', roomdata.value);
        };
    return { roomName, roomdata };
  },
});
</script>

<style scoped>
* p {
  margin-bottom: 0;
}

.navbar {
  grid-area: header;
}
.sideMenu {
  grid-area: aside;
}
.chatbox {
  grid-area: section;
}
.typing_area {
  grid-area: footer;
}
#chat_container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
  'header header header header header'
  'aside section section section section'
  'aside footer footer footer footer'
  ;
  width: 100%;
  height: 100vh;
  /* background-color: rgb(20, 20, 20); */
}
header {
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1rem; */
  border-bottom: 1px solid rgba(143, 135, 135, 0.151);
}

aside {
  border-right: 1px solid rgba(143, 135, 135, 0.151);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
section {
  padding: 0 1.5rem 0 1.5rem;
  background-color: rgba(221, 160, 221, 0.068);
}

footer {
  height: 22vh;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  /* margin-top: 1rem; */
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
}

@media screen and (max-width : 800px) {
  #chat_container {
    background-color: plum;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
