import './common/common.css'

//import '../node_modules/bootstrap/dist/css/bootstrap.css'
//import '../node_modules/bootstrap/dist/js/bootstrap.js'
import Vue from 'vue'

import mainCcomponent from './components/main/main.vue'

import router from './router/router'

new Vue({
    el: '#app',
    router,
    render: h => h(mainCcomponent),
})