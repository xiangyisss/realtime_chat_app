<template>
    <div class="mobile_top_menu">
        <p class="title">Chat board</p>
        <div class="homebutton"  @click="toggleMenu"></div>
    </div>
    <div class="chatroom" :class="active ? 'activeClass' : '' ">
    <!-- <div class="chatroom" v-if="active" ref="sidebar"> -->

        <ul class="roomlist" v-for="roomname, i in currentRoom" :key="roomname.index"  @click="sendRoomNameToParent(roomname, i)" >
            <li :class="currentIndex === i && 'active'" @click="closeMenu">{{roomname}}  </li>
        </ul>
        <button @click="logout">Log out</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'MobileVersionMenu',
    setup(props, { emit }) {
        const router = useRouter();
        const active = ref(false);
        const currentRoom = ['Public chat', 'Suzy', 'Mario'];
        const currentIndex = ref(0);
        const currentRoomName = ref('Public chat');
        const sendRoomNameToParent = (name : any, index : any) => {
            currentRoomName.value = name;
            currentIndex.value = index;
            // console.log('currentRoomName:', currentRoomName.value);
            emit('roomNameToParent', currentRoomName.value);
        };
        const logout = () => {
            router.push({
                name: 'Login',
            });
        };
        const toggleMenu = () => {
            active.value = !active.value;
        };
        const closeMenu = () => {
            active.value = false;
        };

        return {
            currentRoom,
            currentIndex,
            sendRoomNameToParent,
            logout,
            toggleMenu,
            active,
            closeMenu,
        };
    },
});
</script>

<style scoped>
p {
    margin: 0;
}
.mobile_top_menu {
    width: 100%;
    height: 7vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title {
    font-size: 1rem;
    font-weight: 600;
    margin-left: 2rem;
    margin-bottom: 0;
    }
.homebutton {
    width: 1.5rem;
    height: 1.5rem;
    background-image: url('../assets/home.svg');
    cursor: pointer;
    margin-right: 2rem;
}
.chatroom {
    width: 100%;
    height: 93vh;
    background-color: rgb(241, 240, 237);
    position: absolute;
    top: 7vh;
    left: 0;
    z-index: 1;
    opacity: 0;
    display: none;
    transform:translateX(100%);
}
/*transition not working */
.activeClass {
    display: block;
    opacity: 1;
    transform:translateX(0%);
    transition: all 1s;
}
.active {
    background-color: rgba(108, 59, 172, 0.644);
    color: rgb(238, 228, 228);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    transition: all 0.3s;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.roomlist li, button {
    width: 100%;
    line-height: 3.5rem;
    text-align: left;
    font-weight: 600;
    padding-left: 2rem;
}
button {
    border: none;
    background: transparent;
    font-size: 1.25rem;
    color: #2c3e50 ;
    font-weight: 700;
}

</style>
