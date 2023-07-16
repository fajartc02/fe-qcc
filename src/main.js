import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from "vue-axios";

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'

import ApiService from '@/store/api.service'
import Select2 from 'vue3-select2-component';


const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios, axios);
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
app.component('Select2', Select2)
    // app.component()

ApiService.init();
app.mount('#app')