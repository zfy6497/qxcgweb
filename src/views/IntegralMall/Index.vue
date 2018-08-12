<template>
	<div class="ct clearfix" v-if="result">
		<div class="coreBoxup">
			<div class="corebanner"><img src="/static/images/temp/coreshop.jpg" alt=""></div>
			<span>当前可用积分：
				<em>{{result.Integrals}}积分</em>
			</span>
		</div>
		<div class="core-box" v-if="result.Products">
			<ul>
				<li @mouseover="activeid=item.Id" @mouseout="activeid=0" :class="item.Id===activeid?'active':''" v-for="item in result.Products" :key="item.Id">
					<router-link :to="'/integraldetail/'+item.Id">
						<div class="corepic"><img class="image178" :src="item.ImagePath_200" alt=""></div>
						<p class="core">{{item.NeedIntegral}}积分</p>
						<span class="ptext">{{item.ProductName}}</span>
						<span class="rightsale">立即兑换</span>
					</router-link>

				</li>

			</ul>
		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
export default {
  name: "App",
  data() {
    return {
      result: [],
      activeid: 0
    };
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/IntegralMall/GetList", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

