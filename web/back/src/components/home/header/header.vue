<template>
	<div>
    	<h3 class="fl">丸货后台管理系统</h3>
    	<select class="col-sm-1 form-control form-control-sm fr" v-model="$store.state.header.lanType">
            <option value="en">en</option>
            <option value="cn">cn</option>
        </select>
        <!-- <span>{{$store.state.header.lanType}}</span> -->
	</div>
	
</template>

<script>
	import './header.scss'
	import common from '../../../common/common.js'
    export default {
    	data(){
    		return {
    			lanType: common.state.lanType
    		}
    	},
    	mounted(){
    		// console.log(this.$store.state.header.lanType)
    		
    	}
    }
</script>