/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Leaflet Maps
import 'leaflet/dist/leaflet.css';


// Composables
import { createApp } from 'vue'

// Pinia 
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Enable persistence

const app = createApp(App)

registerPlugins(app)
app.use(pinia);
app.mount('#app')
