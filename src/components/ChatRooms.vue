<template>
    <div class="chatroom">
        <ul class="roomlist" v-for="roomname, i in currentRoom" :key="roomname.index"  @click="sendRoomNameToParent(roomname)" >
            <li :class="{active: currentIndex === i && 'active'}">{{roomname}}</li>
        </ul>
        <div>{{currentRoom[currentIndex]}}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useStore } from 'vuex';


export default defineComponent({
    name: 'Chatrooms',
    setup(props, { emit }) {
        // const store = useStore();
        const currentRoom = ['Public chat', 'Suzy', 'Mario'];
        const currentIndex = ref(0);
        const currentRoomName = ref('Public chat');
        const sendRoomNameToParent = (name : any) => {
            currentRoomName.value = name;
            console.log('currentRoomName:', currentRoomName.value);
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
.test {
    color: red;
}
ul {
    list-style: none;
    padding: 0;
}

.chatroom {
    width: 100%;
    height: 2.5rem;
}
.active {
    background-color: rgba(168, 119, 119, 0.445);
}
/* .roomlist::after {
    content: ' ';
    width: 4px;
    height: 2.5rem;
    background-color: plum;
    position: absolute;
    top: 0;
    left: 0;
} */
.roomlist li {
    line-height: 2.5rem;
    text-align: left;
    font-weight: 600;
    padding-left: 2rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
}
</style>
