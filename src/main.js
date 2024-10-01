import { createApp } from 'vue'
import './style.css'
import Crypto from './components/crypto.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(Crypto)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
