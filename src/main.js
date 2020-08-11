import Vue from "vue";
import App from "./App.vue";

import iView from "iview";
Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
