import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HomerComponent from '../components/home/home.vue'
import datagrid from '../components/datagrid/datagrid.vue'
import Container from '../components/container/container.vue'
import Login from '../components/login/login.vue'
import users from '../components/users/users.vue'
import order from '../components/order/order.vue'
import admin from '../components/admin/admin.vue'

const router = new VueRouter({
	routes: [
		{
			path:'/',
			name:'home',
			component: HomerComponent,
			children: [
				{
					path: '/index',
					name: 'index',
					components: {
						default: Container
					}
				},{
					path: '/proManage',
					name: 'proManage',
					components: {
						default: datagrid
					}
				},{
					path: '/users',
					name: 'users',
					components: {
						default: users
					}
				},{
					path: '/order',
					name: 'order',
					components: {
						default: order
					}
				},{
					path: '/admin',
					name: 'admin',
					components: {
						default: admin
					}
				}
			]
		},
		// 商品管理
		// {path: '/proManagest', name:"proManagest", component:datagrid},
		{path: '/login',name: 'login',component: Login}

	]
})

export default router;