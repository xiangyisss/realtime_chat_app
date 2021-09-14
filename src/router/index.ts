import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import Chat from '../views/Chat.vue';
// import PrivateChat from '@/views/PrivateChat.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,

  },
  {
    path: '/groupchat_page',
    name: 'groupchat',
    component: Chat,
    props: true,
  },
  // {
  //   path: '/privatechat/:userName',
  //   name: 'privatechat',
  //   component: PrivateChat,
  //   props: true,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
