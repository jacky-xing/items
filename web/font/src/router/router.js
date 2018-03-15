import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HomepageComponent from '../components/homepage/homepage.vue'
import MyComponent from '../components/my/my.vue'
import DetailsComponent from '../components/details/details.vue'
import store from '../components/store/store.vue'
import hot from '../components/hotProduct/hotProduct.vue'
import search from '../components/search/search.vue'
import shopCart from '../components/shopCart/shopCart.vue'
import loginComponent from '../components/login/login.vue'
import regComponent from '../components/reg/reg.vue'
import home from '../components/home/home.vue'

const router = new VueRouter({
    routes: [
        {path: '/', component: home,redirect:'homepage',children:[
            {path: 'homepage', component: HomepageComponent},
            {path: '/my', component: MyComponent},
            {path:'/details',component:DetailsComponent},
            {path:'/store',component:store},
            {path:'/hot',component:hot},
            {path:'/search',component:search},
            {path:'/cart',component:shopCart}
        ]},
        {
            path:'/login',component:loginComponent
        },
        {
            path:'/reg',component:regComponent
        }
    ]
})
export default router;