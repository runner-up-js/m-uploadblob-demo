import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import { setup } from '@daojia/vue3-cli-preset-config/boot';
import App from './App.vue';

const app = createApp(App);
app.use(Vant);
setup(app);
app.mount('#app');
