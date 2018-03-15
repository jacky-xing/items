import Vue from 'vue'
import Vuex from 'vuex'

import header from '../components/home/header/header.js'
import common from '../common/common.js'
import datagrid from '../components/datagrid/datagrid.js'

Vue.use(Vuex)


const store = new Vuex.Store({
	modules:{
		header,
		common,
		datagrid,
	}
})
export default store;