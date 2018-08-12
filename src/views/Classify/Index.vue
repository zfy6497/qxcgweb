<template>
    <div class="ct">
			<div class="classify-top clearfix">
				<div class="banner classify-banner" v-if="result &&  result.SlideImgs && result.SlideImgs.filter(function(res){return res.TypeId==6})">
				     <phswiper :img-list="result.SlideImgs.filter(function(res){return res.TypeId==6})" :width="990" ></phswiper>
				</div>
			</div>
			
			<div class="classify-hot clearfix">
				<dl>
					<dt><img src="/static/images/icon/classify-hot.jpg"/></dt>
					<dd v-if="result &&  result.SlideImgs && result.SlideImgs.filter(function(res){return res.TypeId==4})">
						<router-link  :to="item.Url" v-for="item in result.SlideImgs.filter(function(res){return res.TypeId==4})" :key="item.Id"><img class="image128" :src="item.ImageUrl"/></router-link>
					</dd>
				</dl>
			</div>
			
			<div class="classify-hot classify-new clearfix">
				<dl>
					<dt><img src="/static/images/icon/classify-hot.jpg"/></dt>
					<dd  v-if="result &&  result.SlideImgs && result.SlideImgs.filter(function(res){return res.TypeId==5})" >
						<router-link  :to="item.Url" v-for="item in result.SlideImgs.filter(function(res){return res.TypeId==5})" :key="item.Id"><img class="image128" :src="item.ImageUrl"/></router-link>
					</dd>
				</dl>
			</div>
			<div v-if="result &&  result.Floors" v-for="item in result.Floors" :key="item.Id">
                 <div class="home-h2 home-floor-h2">
				<div class="more-products clearfix">
						<router-link v-for="linkitem in item.LinkRight" :key="linkitem.Title" :to="linkitem.Url">{{linkitem.Title+" | "}}</router-link>
				</div>
				<img :src="item.TopIcon"/>
			</div>
			<div class="home-floor-mn clearfix">
				<div class="home-floor-left" :style="'background:url('+item.BackImage +')'">
					<div class="home-floor-left-li clearfix">
							<router-link v-for="linkitem in item.LinkLeft" :key="linkitem.Title" :to="linkitem.Url">{{linkitem.Title}}</router-link>
					</div>
				</div>
				<div class="home-floor-ct clearfix">
					<router-link v-for="pitem in item.Items" :key="pitem.Title" :to="'pdetail/'+pitem.SkuId">
						<span class="pic"><img class="image178" :src="pitem.ImageUrl_200"/></span>
						<span class="name ell2">{{pitem.ProductName}}</span>
					</router-link>
				</div>
				<div class="home-floor-right">
					<div class="right-big">
						<div >
               <phswiperproduct :product-list="item.Hots"></phswiperproduct>
							 
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import Util from "../../libs/util.js"
import phswiper from "../components/phswiper";
import phswiperproduct from "../components/phswiperproduct";
export default {
	name: "App",
	components:{
		phswiper,
		phswiperproduct
	},
  data() {
    return {
      result: []
    };
  },
  mounted() {
    this.init();

  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("pc/PcClassify/GetDatas", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    }
  }
};
</script>

