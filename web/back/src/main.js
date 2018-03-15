import Vue from 'vue'
import bootp from '../node_modules/bootstrap/dist/css/bootstrap.css'

import appComponent from './App.vue'
import router from './router/router'
import store from './vuex/store.js'



new Vue({
	el: '#app',
	store,
	router,
	render: h => h(appComponent)
})