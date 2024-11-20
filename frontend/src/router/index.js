import { createRouter, createWebHistory } from 'vue-router';
import RegistroUsuario from '../modules/usuario/components/RegistroUsuario.vue';
import LoginUsuario from '@/modules/usuario/components/LoginUsuario.vue';



const routes = [
  { path: '/Registro', component: RegistroUsuario },
  { path: '/Login', component: LoginUsuario },
  { path: '/', component: LoginUsuario }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


