import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { VueShowdown } from 'vue-showdown';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.use(VueSweetalert2);
app.component('VueShowdown', VueShowdown)
app.use(VueLoading, {
    canCancel: false,
    isFullPage: true,
    loader: 'bars',
    color: '#F0E4D4',
    backgroundColor: '#575757',
    lockScroll: true,
    blur: 'opacity(100%)'
})
app.mount('#app')