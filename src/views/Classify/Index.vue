<template>
	<div class="ct">
		<div class="classify-top clearfix">

			<div class="classify-li">
				<dl v-for="item in result.Categories" :key="item.Id" :class="item.IsOver?'active':''" @mouseover="item.IsOver=true" @mouseout="item.IsOver=false">
					<dt>
						<router-link :to="'/classifylist/'+item.Id"><img :src="item.Icon" />{{item.Name}}</router-link>
					</dt>
					<dd v-if="item.Childrens" :class="item.IsOver?'vis-show':'vis-hid'" @mouseover="item.IsOver=true" @mouseout="item.IsOver=false">
						<div class="m-list">
							<div v-for="(itemtwo,indexid) in item.Childrens" v-if="indexid%2==0" :key="itemtwo.Id" :class="['m-box clearfix',itemtwo.IsOver?'':'h42']">

								<div class="m-left">
									<router-link :to="'/classifylist/'+itemtwo.Id" :style="itemtwo.IsRecommend?'color: #ff5247':''">{{itemtwo.Name}}</router-link>
								</div>
								<div class="m-right clearfix clearfix">
									<router-link v-for="itemthree in itemtwo.Childrens" :key="itemthree.Id" :to="'/classifylist/'+itemthree.Id" :style="itemthree.IsRecommend?'color: #ff5247':''">{{itemthree.Name}}</router-link>
								</div>
								<div class="arrow-icon" v-if="itemtwo.Childrens && itemtwo.Childrens.length>9" @click="itemtwo.IsOver=!itemtwo.IsOver"></div>
							</div>

						</div>
						<div class="m-list">
							<div v-for="(itemtwo,indexid) in item.Childrens" :key="itemtwo.Id" v-if="indexid%2>0" :class="['m-box clearfix',itemtwo.IsOver?'':'h42']">

								<div class="m-left">
									<router-link :to="'/classifylist/'+itemtwo.Id" :style="itemtwo.IsRecommend?'color: #ff5247':''">{{itemtwo.Name}}</router-link>
								</div>
								<div class="m-right clearfix clearfix">
									<router-link v-for="itemthree in itemtwo.Childrens" :key="itemthree.Id" :to="'/classifylist/'+itemthree.Id" :style="itemthree.IsRecommend?'color: #ff5247':''">{{itemthree.Name}}</router-link>
								</div>
								<div class="arrow-icon" v-if="itemtwo.Childrens && itemtwo.Childrens.length>9" @click="itemtwo.IsOver=!itemtwo.IsOver"></div>
							</div>

						</div>
					</dd>
				</dl>
			</div>

			<div class="banner classify-banner" v-if="result &&  result.SlideImgs && result.SlideImgs.filter(function(res){return res.TypeId==6})">
				<phswiper :img-list="result.SlideImgs.filter(function(res){return res.TypeId==6})" :width="990"></phswiper>
			</div>
		</div>

		<div class="classify-hot clearfix">
			<dl>
				<!-- <dt><img src="/static/images/icon/classify-hot.jpg" /></dt> -->
				<dd v-if="result &&  result.SlideImgs && result.SlideImgs.filter(function(res){return res.TypeId==4})">
					<router-link to="/" v-for="item in result.SlideImgs.filter(function(res){return res.TypeId==4})" :key="item.Id"><img style="width:304px;height:174px;" :src="item.ImageUrl" /></router-link>
				</dd>
			</dl>
		</div>

		<div class="classify-hot classify-new clearfix">
			<dl>
				<!-- <dt><img src="/static/images/icon/classify-hot.jpg" /></dt> -->
				<dd v-if="result &&  result.SlideImgs && result.SlideImgs.filter(function(res){return res.TypeId==5})">
					<router-link :to="item.Url" v-for="item in result.SlideImgs.filter(function(res){return res.TypeId==5})" :key="item.Id"><img style="width:304px;height:174px;" :src="item.ImageUrl" /></router-link>
				</dd>
			</dl>
		</div>
		<div style="margth" class="home-floor-mn" v-if="result &&  result.Floors" v-for="item in result.Floors" :key="item.Id">
			<div class="home-floor-top" v-if="item.TopImage">
				<router-link :to="item.TopUrl"><img :src="item.TopImage" /></router-link>
			</div>
			<div class=" clearfix">
				<!-- <div class="home-floor-left" :style="'background:url('+item.BackImage +')'">
					<div class="home-floor-left-li clearfix">
						<router-link v-for="linkitem in item.LinkLeft" :key="linkitem.Title" :to="linkitem.Url">{{linkitem.Title}}</router-link>
					</div>
				</div> -->

				<div class="home-floor-left">
					<div class="home-h2 home-floor-h2" :style="'background:'+item.BackColor">
						{{item.Remark}}
					</div>
					<div class="home-floor-left-li clearfix">
						<router-link v-for="(linkitem,indexid) in item.LinkLeft" :key="indexid" :to="linkitem.Url">{{linkitem.Title}}</router-link>
					</div>
				</div>
				<div class="home-floor-ct clearfix">
					<router-link v-for="(pitem,indexid) in item.Items" :key="indexid" :to="'/pdetail/'+pitem.SkuId">
						<span class="pic"><img class="image178" :src="pitem.ImageUrl_200" /></span>
						<span class="name ell2">{{pitem.ProductName}}</span>
					</router-link>
				</div>
				<div class="home-floor-right">
					<div class="right-big">
						<div>
							<phswiperproduct :product-list="item.Hots"></phswiperproduct>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
import phswiper from "../components/phswiper";
import phswiperproduct from "../components/phswiperproduct";
export default {
  name: "App",
  components: {
    phswiper,
    phswiperproduct
  },
  data() {
    return {
      result: [],
      type: this.$route.params.id || 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      let vm = this;
      vm.result = [];
      Util.post("pc/PcClassify/GetDatas", { Type: vm.type }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    }
  },
  watch: {
    $route: function(to, from) {
      this.type = to.params.id || 0;
      this.init();
    }
  }
};
</script>

