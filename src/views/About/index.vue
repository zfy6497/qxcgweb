<template>
	<div class="ct clearfix">
		<div class="pageinfo">
			<div class="us-nav fl" v-if="result">
				<ul>
					<li :class="checkid==item.Id?'active':'' " v-for="item in result" :key="item.Id" @click="checkid=item.Id, content=item.Content">
						<a href="javascript:;">{{item.Title}}</a>
					</li>
					
				</ul>
			</div>

			<div class="us-content fr" v-html="content">

				 <div>{{content}}</div>
			</div>
		</div>

	</div>
</template>
<script>
import Util from "../../libs/util.js";
export default {
  name: "App",
  data(){
	  return{
		 result:[],
		 checkid:0,
		 content:''
	  }
  },
  mounted(){
     this.init();
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Articles/GetAbouts", {}, vm, function(res, data) {
        if (res === "1") {
		  vm.result = data.data;
		  if(vm.result && vm.result.length>0){
			   let model=vm.result[0];
			   vm.checkid=model.Id;
			   vm.content=model.Content;
		  }
        } else {
        }
      });
    }
  }
};
</script>

