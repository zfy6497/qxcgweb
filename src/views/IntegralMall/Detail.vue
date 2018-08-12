<template>
	<div>
		<div class="ft-main" v-if="result">
			<div class="coredetailIntro clearfix">
				<div class="d-t-left fl" v-if="result.ImagePath">
					<div class="big-pic">
						<ul>
							<li>
								<a href="javascript:"><img :src="showimg" /></a>
							</li>
						</ul>
					</div>
					<div class="d-prev" @click="changeimgnum(0)"><img src="/static/images/icon/d-prev.jpg" /></div>
					<div class="small-pic">
						<ul>
							<li v-for="(item,index) in result.ImagePath.split(',')" :key="item" @click="checkimgid=index">
								<a href="javascript:"><img :src="item+'_200_200.jpg'" /></a>
							</li>
						</ul>
					</div>
					<div class="d-next" @click="changeimgnum(1)"><img src="/static/images/icon/d-next.jpg" /></div>
				</div>

				<div class="introduction fl">
					<h1>{{result.ProductName}}</h1>
					<h2>{{result.ShortDescription}}</h2>
					<span>{{result.NeedIntegral}}
						<em>积分</em>
					</span>
					<a href="javascript:;" @click="exchange" class="exchange">立即兑换</a>
					<a href="javascript:;" class="already">已兑换</a>
				</div>

			</div>
		</div>
		<div class="detail-mn ff">
			<div class="ct clearfix">
				<div class="recommend-li">
					<h2>为你推荐</h2>

					<router-link :to="'/integraldetail/'+item.Id" v-if="result.Recommends" v-for="item in result.Recommends" :key="item.Id">
						<span class="pic"><img class="image128" :src="item.ImagePath_200" alt=""></span>
						<span class="price">{{item.NeedIntegral}}
							<i>积分</i>
						</span>
						<div class="name ell2">{{item.ProductName}}</div>

					</router-link>

				</div>

				<div class="productInfo fr">
					<h6>商品信息</h6>
					<div class="productIntro" v-html="result.Description">
						{{result.Description}}
					</div>
				</div>
			</div>
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
			Id: this.$route.params.id,
			checkimgid:0
    };
	},
	computed:{
		showimg: function() {
			let imgs = this.result.ImagePath.split(",");
      if (imgs.length > this.checkimgid) {
        return imgs[this.checkimgid];
      } else {
        return "";
      }
    }
	}
	,
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/IntegralMall/GetModel", { id: vm.Id }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    },
    exchange: function() {
      let vm = this;
      this.$layer.confirm("是否确认兑换？", { btn: ["确定", "取消"] }, function(
        index
      ) {
        Util.post("api/IntegralMall/Save", { id: vm.Id }, vm, function(
          res,
          data
        ) {
          if (res === "1") {
            vm.$layer.msg("兑换成功");
          } else {
            vm.$layer.msg(data);
          }
        });
        vm.$layer.closeAll();
      });
		},
		 changeimgnum: function(type) {
      if (type == 1) {
        let nums = this.result.ImagePath.split(",").length;
        if (this.checkimgid+1 < nums) {
          this.checkimgid += 1;
        }
      } else {
        if (this.checkimgid >= 1) {
          this.checkimgid -= 1;
        }
      }
    }
  },
  mounted() {
    this.init();
  },
  watch: {
   
    $route(to, from) {
      this.Id = to.params.id;
      this.init();
    }
  }
};
</script>

