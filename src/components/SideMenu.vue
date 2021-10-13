<template>
    <aside class="sideMenu">
        <div class="personalInfo">
            <img :src="currentUserAvatar" alt="icon">
            <p class="username">{{userName}}</p>
        </div>
        <ChatRoomList @roomNameToParent="roomName($event)"/>
    </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChatRoomList from './ChatRoomList.vue';


export default defineComponent({
  components: { ChatRoomList },
    name: 'SideMenu',
    props: { userName: String, currentUserAvatar: String },
    setup(props, { emit }) {
        const currentRoomName = ref('');
        const roomName = (name : any) => {
            currentRoomName.value = name;
            emit('roomNameToParent', currentRoomName.value);
        };
        return { roomName };
    },
});
</script>

<style scoped>

aside {
  border-right: 1px solid rgba(143, 135, 135, 0.151);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.personalInfo {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items:  center;
    border-bottom: 1px solid rgb(230, 229, 229);
}
.personalInfo img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    /* margin-bottom: 1.5rem; */
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.username {
    margin: 1rem;
    text-transform: uppercase;
}
.character {
    font-size: 40px;
    font-weight: 500;
    margin: 0;
    color: rgb(0, 0, 0);
}
.mychat_menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    margin-bottom: 0.5rem;
}
.mychat_menu img {
    width: 8px;
    height: 8px;
    margin: 0 1rem 0 1.5rem;
}
.mychat_menu p {
    font-weight: 600;
    margin: 0;
}

</style>
