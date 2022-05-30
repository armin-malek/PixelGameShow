import Vue from "vue";
import App from "./App.vue";
import io from "socket.io-client";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

let socket = io(
  "https://pixelgameserver-gamesc.apps.ir-thr-at1.arvan.run/show"
);

Vue.prototype.$socket = socket;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  socket,
}).$mount("#app");
