<template>
    <aside class="sideMenu">
        <div class="personalInfo">
            <img :src="currentUserAvatar" alt="icon">
            <p>{{userName}}</p>
        </div>
            <div class="mychat_menu">
                <img src="../assets/arrow.svg" alt="icon">
                <p>My chats</p>
            </div>
            <div class="chatroom_list">
                <p>Public chat</p>
            </div>
      </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SideMenu',
    props: { userName: String, currentUserAvatar: String },
});
</script>

<style scoped>
.personalInfo {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items:  flex-end;
    border-bottom: 1px solid rgb(230, 229, 229);
}
.personalInfo img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin-bottom: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
.chatroom_list {
    width: 100%;
    height: 2.5rem;
    background-color: rgba(238, 235, 235, 0.445);
    position: relative;
}
.chatroom_list::after {
    content: ' ';
    width: 4px;
    height: 2.5rem;
    background-color: plum;
    position: absolute;
    top: 0;
    left: 0;
}
.chatroom_list p {
    line-height: 2.5rem;
}
</style>
