<template>
	<div class="ct clearfix">
		<div class="news-leader">当前位置：个人中心</div>
		<div class="news-content">
			<div class="person-left fl">
				<UserLeft></UserLeft>
			</div>

			<div class="person-item">
				<div class="mycore">
					<div class="coreup">
						<em class="fl">我的积分</em>
						<span class="fr"> <router-link style="font-size: 14px; color: #05a0e3;" to="/about">积分指南</router-link> 
							<i class="guide_icon"></i>
						</span>
					</div>
					<div class="corebg">
						<span>
							<em>当前可用积分：</em>
							<i class="num">{{result.Integrals}}</i>
						</span>
					</div>
				</div>
				<div class="useguide">
					<div class="feeNav">
						<a href="javascript:;" @click="type=0"  :class="type==0?'blr':''">全部</a>
						<a href="javascript:;" @click="type=1"  :class="type==1?'blr':''">收入</a>
						<a href="javascript:;" @click="type=2"  :class="type==2?'blr':''">支出</a>
					</div>
					<div class="feeItem" style="display:block;">
						<ul v-if="result &&result.Records">
							<li class="first">
								<p>积分使用</p>
								<em>积分变化</em>
								<span>日期</span>
							</li>
							<li v-for="item in result.Records" :key="item.Id">
								<p>{{item.TypeStr}}</p>
								<em>{{item.Integral}}</em>
								<span>{{item.RecordDate | formatDateFull}}</span>
							</li>
						</ul>
					</div>
					
				</div>
			</div>

		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
import UserLeft from "../components/userleft.vue";
export default {
  name: "",
  components: {
    UserLeft
  },
  data() {
    return {
	  result: [],
	  type:0
    };
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Integral/GetList", {Type:vm.type}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    }
  },
  mounted() {
    this.init();
  },
  filters: {
	  formatDateFull(date){
		  return Util.formatDateFull(date,'yyyy-MM-dd hh:mm');
	  }
  },
  watch:{
	  type(){
         this.init();
	  }
  }
};
</script>

