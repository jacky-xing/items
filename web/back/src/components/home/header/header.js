var state = {
    lanType: 'en',
     dictionary:{}
}

var mutations = {
	getDictionary(state,val={}){
		state.dictionary = JSON.parse(JSON.stringify(val))
	}
}

var actions = {};

export default {
    state,
    mutations,
    actions
}