<template>
    <div class="chatroom">
        <!-- <ul class="roomlist" v-for="roomname, i in currentRoom" :key="roomname.index"  @click="sendRoomNameToParent(roomname, i)" >
            <li :class="currentIndex === i && 'active'">{{roomname}}</li>
        </ul> -->
        <p class="roomtitle">Public Chat Room</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';



export default defineComponent({
    name: 'ChatRoomList',
    setup(props, { emit }) {
        const currentRoom = ['Suzy', 'Inna', 'Teddy'];
        const currentIndex = ref(0);
        const currentRoomName = ref('Public chat');
        const sendRoomNameToParent = (name : any, index : any) => {
            currentRoomName.value = name;
            currentIndex.value = index;
            // console.log('currentRoomName:', currentRoomName.value);
            emit('roomNameToParent', currentRoomName.value);
        };

        return {
            currentRoom,
            currentIndex,
            sendRoomNameToParent,
        };
    },
});
</script>

<style scoped>
.chatroom {
    width: 100%;
    /* height: 2.5rem; */
    background-color: #fff;
}
.active {
    background-color: rgba(108, 59, 172, 0.644);
    /* background-color: #0c33f5c9; */
    color: rgb(238, 228, 228);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    transition: all 0.3s;
}
.roomtitle {
    line-height: 2.5rem;
    font-weight: 600;
}

/* ul {
    list-style: none;
    padding: 0;
}
.roomlist li {
    width: 100%;
    line-height: 2.5rem;
    text-align: left;
    font-weight: 600;
    padding-left: 2rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
} */
</style>
