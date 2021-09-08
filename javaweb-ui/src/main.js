import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/plugins'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/404.jpg'),
    loading: require('./assets/loading.svg'),
    attempt: 1,
    listenEvents: ['scroll']
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
