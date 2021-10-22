import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../Pages/LoginPage/Login.vue';
import Chat from '../Pages/ChatPage/Chat.vue';
import NotFound from '../Pages/NotFound.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,

  },
  {
    path: '/chatpage',
    name: 'ChatPage',
    component: Chat,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
