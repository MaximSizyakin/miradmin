import {createApp} from 'vue';
import App from './App.vue';

const app = createApp(App);

window.vue = app.mount('#app');
