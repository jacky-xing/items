var state = {
    lanType: 'en',
    shade: false,
    dataset:[],
    limit:5,
    pageNo:1,
    pageAll:'',
    proCount:'',
    // 编辑与添加功能的切换
    pro:true,
   
}

var mutations = {
	getShade(state,boolean){
		state.shade = !state.shade;
	},
	getData(state,val){
		state.dataset = val;
	},
	putProCount(state,val){
		state.proCount = val;
	},
	putPageAll(state,val){
		state.pageAll = val;
	},
	putPageNo(state,val){
		state.pageNo = val;
	},
	putPro(state,val){
		state.pro = !state.pro;
	}
}

var actions = {};

export default {
    state,
    mutations,
    actions
}