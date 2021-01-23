import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Flutterwave from 'vue-flutterwave'
import router from './router'

Vue.config.productionTip = false


Vue.use(Flutterwave, { publicKey: 'FLWPUBK-d115c9fc8bbc29487ca50d90f12f7594-X' })

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
