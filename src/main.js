import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {auth} from './init-firebase'

Vue.config.productionTip = false

/**
 * Observable change
 */
auth.onAuthStateChanged( user => {
  if (user != null) {
    store.dispatch('observableUsername', { email: user.email, id: user.uid })
  } else {
    store.dispatch('observableUsername', null)
  }
  
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  
})
