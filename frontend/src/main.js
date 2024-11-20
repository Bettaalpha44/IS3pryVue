// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importar Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Crear la aplicación Vue
const app = createApp(App);

// Usar el enrutador (si es que lo estás usando)
app.use(router);

// Montar la aplicación
app.mount('#app');
