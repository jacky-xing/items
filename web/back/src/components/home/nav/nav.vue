<template>
    <div style="width:100%">
        <ul class="list-group">
            <li class="list-group-item">
                <router-link to="/proManage" >{{$store.state.header.dictionary[$store.state.header.lanType].productions}}</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/users" >{{$store.state.header.dictionary[$store.state.header.lanType].users}}</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/order" >{{$store.state.header.dictionary[$store.state.header.lanType].order}}</router-link>
            </li>
            <li class="list-group-item"><router-link to="/admin" >
                {{$store.state.header.dictionary[$store.state.header.lanType].admin}}</router-link>
            </li>
        </ul>    
    </div>
</template>

<script>
	import './nav.scss'
    import http from '../../../utils/httpclient.js'
    export default {
        data(){
            return {
                // dictionary:{},
                
            }
        },
        mounted(){
            // http.get('http://localhost:8182/src/dictionary/common.txt').then((res)=>{
            //     this.dictionary = res.data;
            //     // this.show = !this.show;
            // })
        }
    }
</script>