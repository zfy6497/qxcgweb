<template>
    <div class="ct">
			<div class="classify-top clearfix">
				
				
				<div class="banner classify-banner">
					<div class="swiper-wrapper">
						<a href="javascript:" class="swiper-slide"><img src="/static/images/temp/banner.jpg"/></a>
						<a href="javascript:" class="swiper-slide"><img src="/static/images/temp/banner.jpg"/></a>
						<a href="javascript:" class="swiper-slide"><img src="/static/images/temp/banner.jpg"/></a>
						<a href="javascript:" class="swiper-slide"><img src="/static/images/temp/banner.jpg"/></a>
					</div>
					<div class="swiper-pagination"></div>
					<div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>
					<div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>
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
				<img src="/static/images/temp/floor-h2-1.png"/>
			</div>
			<div class="home-floor-mn clearfix">
				<div class="home-floor-left" style="background:url(/static/images/temp/floor-big-img1.png)">
					<div class="home-floor-left-li clearfix">
							<router-link v-for="linkitem in item.LinkLeft" :key="linkitem.Title" :to="linkitem.Url">{{linkitem.Title}}</router-link>
					</div>
				</div>
				<div class="home-floor-ct clearfix">
					<router-link v-for="pitem in item.Items" :key="pitem.Title" :to="'pdetail/'+pitem.SkuId">
						<span class="pic"><img class="image178" :src="pitem.ImageUrl"/></span>
						<span class="name ell2">{{pitem.ProductName}}</span>
					</router-link>
				</div>
				<div class="home-floor-right">
					<div class="right-big">
						<div class="swiper-wrapper">

							 <router-link class="swiper-slide" v-for="pitem in item.Hots" :key="pitem.Title" :to="'pdetail/'+pitem.SkuId">
						             <span class="pic"><img class="image178" :src="pitem.ImageUrl" /></span>
									<span class="name ell">{{pitem.ProductName}}</span>
									<span class="price">¥{{pitem.ShowPrice}} </span>
				             	</router-link>
						</div>
						<div class="swiper-pagination"></div>
						<div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>
						<div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import Util from "../../libs/util.js";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "App",
  data() {
    return {
      result: [],
      imglist: [
        { imgPath: "/static/images/temp/banner.jpg" },
        { imgPath: "/static/images/temp/banner.jpg" },
        { imgPath: "/static/images/temp/banner.jpg" }
      ]
    };
  },
  mounted() {
    var swiper = new Swiper(".classify-banner", {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

    var swiper2 = new Swiper(".right-big", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
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

