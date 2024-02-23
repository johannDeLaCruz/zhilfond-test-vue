import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./style/style.scss";
// import router from './router';
createApp(App).use(store).mount("#app");
