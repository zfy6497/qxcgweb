<template>
	<div>
		<phhead></phhead>
		<div class="main" v-if="result">

			<div class="ct">
				<div class="home-top clearfix">
					<div class="banner swiper-container">
						<phswiper :img-list="result.SlideImgs"></phswiper>
					</div>

					<div class="home-login" v-if="islogin">
						<div class="tips">医疗采购平台欢迎您</div>
						<div class="img"><img :src="photo" /></div>
						<div class="txt txt2">您好，{{username}}</div>
					</div>
					<div class="home-login" v-else>
						<div class="tips">医疗采购平台欢迎您</div>
						<div class="img"><img src="/static/images/icon/wx-icon.png" /></div>
						<div class="txt txt2">您好，请
							<router-link to="/templogin">登录</router-link>
						</div>
					</div>
					<div class="home-news">
						<div class="home-news-tabs">
							<a @mouseover="checktype=1" href="javascript:;" :class="checktype===1?'active':''">公告</a>
							<a @mouseover="checktype=2" href="javascript:;" :class="checktype===2?'active':''">健康指南</a>
							<a @mouseover="checktype=3" href="javascript:;" :class="checktype===3?'active':''">行业资讯</a>
						</div>
						<div class="home-news-mn" style="display: block;">
							<div class="home-news-li" v-if="result && result.Articles&& result.Articles.filter(re=>{return re.TypeId==checktype})">

								<router-link :to="'/newdetail/'+item.Id" v-for="item in result.Articles.filter(re=>{return re.TypeId==checktype})" :key="item.Id">
									<span class="icon"></span>{{item.Title}}
								</router-link>

							</div>
							<!-- <div class="home-news-btn">
							<a href="javascript:" class="prev active"><</a>
							<a href="javascript:" class="next">></a>
						</div> -->
						</div>

					</div>
				</div>

				<div class="home-top-bz clearfix">
					<img src="/static/images/icon/bz-img1.png" />
					<img src="/static/images/icon/bz-img2.png" />
					<img src="/static/images/icon/bz-img3.png" />
				</div>

				<div class="home-h2 home-limit-h2" v-if="result &&  result.LimitInfo">
					<span class="limit-icon"></span>
					<span class="name">限时抢购</span>
					剩余时间：
					<i>{{timedown.hr}}</i>时
					<i>{{timedown.min}}</i>分
					<i>{{timedown.sec}}</i>秒
				</div>
				<div class="home-limit-mn clearfix" v-if="result &&  result.LimitInfo">
					<div class="home-limit-left">
						<ul>
							<li v-for="item in result.LimitInfo.Items" :key="item.SkuId">
								<router-link :to="'/pdetail/'+item.SkuId">
									<span class="pic"><img class="image128" :src="item.ImageUrl_200" /></span>
									<span class="name">{{item.ProductName}}</span>
									<span class="price">¥{{item.ShowPrice}}
										<em>¥{{item.MarketPrice}}</em>
									</span>
									<span class="btn">立即采购</span>
								</router-link>

							</li>
						</ul>
					</div>
					<div class="home-limit-right">
						<router-link to="/limit"><img src="/static/images/icon/limit-more.jpg" /></router-link>
					</div>
				</div>

				<div class="home-h2 home-integral-h2">
					<router-link to="/integralmall" class="more-integral">更多好礼</router-link>
					<span class="integral-icon"></span>
					<span class="name">积分商城</span>
				</div>
				<div class="home-integral-mn clearfix" v-if="result &&  result.IntegralProducts">
					<router-link :to="'/integraldetail/'+item.Id" v-for="item in result.IntegralProducts" :key="item.Id">
						<span class="pic"><img class="image178" :src="item.ImagePath_200" /></span>
						<span class="name">{{item.ProductName}}</span>
						<span class="price">{{item.NeedIntegral}}
							<em>积分</em>
						</span>
					</router-link>
				</div>

				<div v-if="result &&  result.Floors" v-for="item in result.Floors" :key="item.Id">
					<div class="home-h2 home-floor-h2">
						<div class="more-products clearfix">
							<router-link v-for="linkitem in item.LinkRight" :key="linkitem.Title" :to="linkitem.Url">{{linkitem.Title+" | "}}</router-link>
						</div>
						<img :src="item.TopIcon" />
					</div>
					<div class="home-floor-mn clearfix">
						<div class="home-floor-left" :style="'background:url('+item.BackImage +')'">
							<div class="home-floor-left-li clearfix">
								<router-link v-for="linkitem in item.LinkLeft" :key="linkitem.Title" :to="linkitem.Url">{{linkitem.Title}}</router-link>
							</div>
						</div>
						<div class="home-floor-ct clearfix">
							<router-link v-for="pitem in item.Items" :key="pitem.Title" :to="'/pdetail/'+pitem.SkuId">
								<span class="pic"><img class="image178" :src="pitem.ImageUrl_200" /></span>
								<span class="name ell2">{{pitem.ProductName}}</span>
							</router-link>
						</div>
						<div class="home-floor-right">
							<div class="home-floor-right-til">热销商品</div>
							<div class="home-floor-right-li">
								<ul class="swiper-wrapper">
									<li class="swiper-slide">
										<router-link v-for="pitem in item.Hots" :key="pitem.SkuId" :to="'pdetail/'+pitem.SkuId">
											<span class="pic"><img class="image72" :src="pitem.ImageUrl_100" /></span>
											<span class="name ell">{{pitem.ProductName}}</span>
											<span class="price">¥{{pitem.ShowPrice}} </span>
										</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<phfoot></phfoot>
	</div>

</template>

<script>
import phhead from "./components/head.vue";
import phfoot from "./components/foot.vue";
import Util from "../libs/util.js";
import phswiper from "./components/phswiper";
export default {
  name: "App",
  components: {
    phhead,
    phfoot,
    phswiper
  },
  computed: {},
  data() {
    return {
      result: [],
      checktype: 1,
      timedown: { hr: "00", min: "00", sec: "00" },
      username: this.$store.state.user.name || "",
      photo: this.$store.state.user.photo || "",
      islogin: Util.IsLogin(this, false),
      nowtime: null
    };
  },
  mounted() {
		this.gettime();
    this.init();
  },
  methods: {
    init: function() {
      var vm = this;
      Util.post("Pc/PcHome/GetDatas", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
          if (vm.result && vm.result.LimitInfo) {
						// vm.nowtime=Date.parse(vm.result.LimitInfo.NowTimeStr);
            vm.countdown();
          }
        } else {
        }
      });
		},
		gettime:function(){
			 var vm = this;
      Util.post("	api/Activity/GetTime", {}, vm, function(res, data) {
        if (res === "1") {
          vm.nowtime = Date.parse(data.data);
         
        } else {
        }
      });
		
		}
		,
    countdown: function() {
      var vm = this;
      if (vm.result.LimitInfo.EndTimeStr) {
        const end = Date.parse(vm.result.LimitInfo.EndTimeStr);
        const now =vm.nowtime;
        const msec = end - now;
        var day = parseInt(msec / 1000 / 60 / 60 / 24);
        var hr = parseInt((msec / 1000 / 60 / 60) % 24);
        var min = parseInt((msec / 1000 / 60) % 60);
        var sec = parseInt((msec / 1000) % 60);
        this.timedown.hr = hr > 9 ? hr : "0" + hr;
        this.timedown.min = min > 9 ? min : "0" + min;
        this.timedown.sec = sec > 9 ? sec : "0" + sec;

        setTimeout(function() {
									
					vm.nowtime =  vm.nowtime + 1000;
          vm.countdown(vm.result.LimitInfo.EndTimeStr);
        }, 1000);
      }
    }
  },
  watch: {
    $route(fo, from) {
      this.username = this.$store.state.user.name || "";
      this.photo = this.$store.state.user.photo || "";
      this.islogin = Util.IsLogin(this, false);
    }
  }
};
</script>
