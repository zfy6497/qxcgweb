<template>
<div class="main" >
	  <phhead />
	<router-view></router-view>
	  <phfoot></phfoot>
</div>
</template>
<script>
import phhead from "./components/head.vue"
import phfoot from "./components/foot.vue"
export default {

    components:{
		phhead,
		phfoot
	},
	data(){
		return{

		}
	}
};
</script>
