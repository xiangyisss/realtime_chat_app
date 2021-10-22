<template>
    <section class="chatbox" ref="chatbox">
            <div
                id="messages_container"
                :class="message.name === userName ? 'sentMsgStyleToRight' : 'receiveMsgStyleLeft'"
                v-for="message in allMessages"
                :key="message.id"
            >
                <div class="user_avatar"
                :class="message.name === userName && 'sentMsgStyleToMargin' ">
                <img :src="message.avatar" alt="avatar">
                </div>

                <div class="time_name_text_block" :class="message.name === userName && 'sentMsgStyleDirection' ">
                    <div class="timeAndName_block">
                        <div class="username" :class="message.name === userName && 'sentMsgStylePadding' "  >
                        {{message.name}}</div>
                        <div class="sendtime">{{`${message.timestamp.toDate().getHours()}:${message.timestamp.toDate().getMinutes()}`}}</div>
                    </div>
                    <div
                    :class="message.name === userName ? 'sentMsgStyle' : 'receiveMsgStyle'">
                        <p class="messages" v-if="message.type === 'text'">{{message.message}}</p>
                        <div class="images" v-else id="images_container" >
                        <img :src="message.imageUrl"  alt="images" @load="scrollToBottom">
                        </div>
                    </div>
                </div>
            </div>
      </section>
</template>

<script lang="ts">
import {
 defineComponent, Ref, ref, onMounted, onUpdated, watch,
} from 'vue';
import database from '../../../db';


export default defineComponent({
    name: 'ChatBox',
    props: { userName: String, currentUserAvatar: String, roomname: String },
    setup(props) {
        const chatbox = ref();
        const allMessages : Ref<string[]> = ref([]);
        const loadAllMessages = (roomname: any) => {
            const query : any = database.firestore().collection('messages').where('room', '==', `${roomname}`).orderBy('timestamp');
            query.onSnapshot((snapShot : any) => {
                const data: any[] = [];
                snapShot.forEach((doc : any) => {
                    data.push(doc.data());
                });
                allMessages.value = data;
            });
        };
        const scrollToBottom = () => {
            chatbox.value.scrollTop = chatbox.value.scrollHeight;
        };
        onMounted(() => {
            scrollToBottom();
        });
        onUpdated(() => {
            scrollToBottom();
        });
        loadAllMessages(props.roomname);
        watch(() => props.roomname, (newroom) => {
            loadAllMessages(newroom);
            allMessages.value = [];
        });
        return { scrollToBottom, allMessages, chatbox };
    },
});
</script>

<style scoped>
section {
    padding: 0 1.5rem 0 1.5rem;
    background-color: rgba(221, 160, 221, 0.068);
    overflow-x: hidden;
    width: 100%;
    height: 70vh;
    padding-top: 1rem;
}


#messages_container {
    display: flex;
    margin-bottom: 1.5rem;
    max-width: 60%;
    width:fit-content;
    border-radius: 4px;
    position: relative;
}
.user_avatar {
     margin-right: 1rem;
}
.user_avatar img{
    width: 24px;
    height: 24px;
}
.time_name_text_block {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.timeAndName_block {
     display: flex;
}
.username {
    padding-bottom: 0.25rem;
    font-size: 0.75rem;
}
.sendtime {
    text-align: left;
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.75rem;
}
.messages {
    text-align: left;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    word-break: break-all;
    margin: 0;
}
#images_container {
    background-color: #fff;
    max-width: 18rem;
    max-height: 12rem;
}

#images_container img {
    width: 100%;
    height: 100%;
    max-width: 18rem;
    max-height: 12rem;
}
.sentMsgStyle {
    background: #0c33f5c9;
    color: rgb(241, 234, 234);
    margin-left: auto;
    border-radius: 10px 0 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.receiveMsgStyle {
    color: rgb(29, 28, 28);
    background: rgba(230, 225, 225, 0.116);
    margin-right: auto;
    border-radius: 0 10px 10px 10px;
    box-shadow: rgba(214, 213, 213, 0.12) 0px 1px 3px, rgba(73, 73, 73, 0.24) 0px 1px 2px;
}
.sentMsgStyleToRight {
    margin-left: auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
}
.receiveMsgStyleLeft {
    margin-right: auto;
}
.sentMsgStyleToMargin {
    margin-right: 0;
    margin-left: 1rem;
}
.sentMsgStylePadding {
    padding-right: 0 !important;
    text-align: right;
}
.sentMsgStyleDirection {
     align-items: flex-end !important;
}
</style>
