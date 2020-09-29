<template>
	<div style="background:#fff;">
		<phhead></phhead>
		<div class="main" v-if="result">

			<div class="ct">
				<div class="home-top clearfix">
					<div class="banner swiper-container">
						<phswiper :img-list="result.SlideImgs"></phswiper>
					</div>

					<div class="home-login">
						<template v-if="islogin">
							<div class="tips">医疗采购平台欢迎您</div>
							<div class="img"><img style="width: 68px;height: 68px;" :src="photo" /></div>
							<div class="txt txt2">您好，{{username}}</div>
						</template>
						<template v-else>
							<div class="tips">医疗采购平台欢迎您</div>
							<div class="img"><img style="width: 68px;height: 68px;" src="/static/images/icon/wx-icon.png" /></div>
							<div class="login-txt">
								<a @click="gologin"  href="javascript:;" style="color: #fff;font-size: 14px;">请登录</a>
							</div>
						</template>

						<div class="home-news">
							<div class="home-news-tabs">
								<a href="javascript:;" @mouseover="checktype=0" :class="checktype===0?'active':''">优质服务</a>
								<a href="javascript:;" @mouseover="checktype=1" :class="checktype===1?'active':''">公告</a>

							</div>
							<div class="home-news-mn" :style="checktype===0?'display: block;':'' ">
								<div class="home-fw-li">
									<ul>
										<li>
											<p class="pic"><img src="/static/images/icon/h-n-icon1.png" /></p>
											<p class="name">正品行货</p>
										</li>
										<li>
											<p class="pic"><img src="/static/images/icon/h-n-icon2.png" /></p>
											<p class="name">厂家授权</p>
										</li>
										<li>
											<p class="pic"><img src="/static/images/icon/h-n-icon3.png" /></p>
											<p class="name">全国联保</p>
										</li>

										<li>
											<p class="pic"><img src="/static/images/icon/h-n-icon4.png" /></p>
											<p class="name">特色服务</p>
										</li>
										<li>
											<p class="pic"><img src="/static/images/icon/h-n-icon5.png" /></p>
											<p class="name">账期预付</p>
										</li>
										<li>
											<p class="pic"><img src="/static/images/icon/h-n-icon6.png" /></p>
											<p class="name">售后服务</p>
										</li>

									</ul>
								</div>
							</div>
							<div class="home-news-mn" :style="checktype===1?'display: block;':'' ">
								<div class="home-news-li" v-if="result && result.Articles&& result.Articles.filter(re=>{return re.TypeId==checktype})">
									<router-link :to="'/newdetail/'+item.Id" v-for="item in result.Articles.filter(re=>{return re.TypeId==checktype})" :key="item.Id">
										<span class="icon"></span>{{item.Title}}
									</router-link>
								</div>
							</div>

						</div>
					</div>
					<!-- <div class="home-news">
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
					
						</div>

					</div> -->
				</div>

				<div class="home-top-bz clearfix">
					<img src="/static/images/icon/bz-img1.png" />
					<img src="/static/images/icon/bz-img2.png" />
					<img src="/static/images/icon/bz-img3.png" />
				</div>

				<div class="home-h2 home-limit-h2" v-if="result &&  result.LimitInfo">
					<span class="limit-icon"><img src="/static/images/icon/time-icon.gif" /></span>
					<span class="name">限时抢购</span>
					剩余时间：
					<i>{{timedown.day}}</i>天
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
									<span class="name" :title="item.ProductName">{{item.ProductName}}</span>
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

				<!-- <div class="home-h2 home-integral-h2">
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
				</div> -->

				<div class="home-floor-mn" v-if="result &&  result.Floors" v-for="item in result.Floors" :key="item.Id">
					<!-- <div class="home-h2 home-floor-h2">
						<div class="more-products clearfix">
							<router-link v-for="linkitem in item.LinkRight" :key="linkitem.Title" :to="linkitem.Url">{{linkitem.Title+" | "}}</router-link>
						</div>
						<img :src="item.TopIcon" />
					</div> -->
					<div class="home-floor-top" v-if="item.TopImage">
						<router-link :to="item.TopUrl"><img :src="item.TopImage" /></router-link>
					</div>
					<div class="clearfix">
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
								<span class="name ell2" :title="pitem.ProductName">{{pitem.ProductName}}</span>
							</router-link>
						</div>
						<div class="home-floor-right">
							<div class="home-floor-right-til">热销商品</div>
							<div class="home-floor-right-li">
								<ul class="swiper-wrapper">
									<li class="swiper-slide">
										<router-link v-for="pitem in item.Hots" :key="pitem.SkuId" :to="'pdetail/'+pitem.SkuId">
											<span class="pic"><img class="image72" :src="pitem.ImageUrl_100" /></span>
											<span class="name ell" :title="pitem.ProductName">{{pitem.ProductName}}</span>
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
import Cookies from "js-cookie";
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
      checktype: 0,
      timedown: { hr: "00", min: "00", sec: "00" },
      username: this.$store.state.user.name || "",
      photo: this.$store.state.user.photo || "",
      islogin: Util.IsLogin(this, false),
      nowtime: null,
      errormsg: this.$route.query.errormsg || "",
			loginsuccess: this.$route.query.loginsuccess || ""
    };
  },
  mounted() {
    this.gettime();
    this.init();
    if (this.errormsg) {
      this.$layer.msg(unescape(this.errormsg));
    }
    if (this.loginsuccess && this.loginsuccess == "1") {
      this.$store.commit("loginin", {
        token: Cookies.get("qxweb_token"),
        id: Cookies.get("qxweb_mmnum"),
        name: Cookies.get("qxweb_name"),
				photo: Cookies.get("qxweb_photo"),
				issuccess: Cookies.get("qxweb_issuccess")
      });
    }
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
    gettime: function() {
      var vm = this;
      Util.post("	api/Activity/GetTime", {}, vm, function(res, data) {
        if (res === "1") {
          vm.nowtime = Date.parse(data.data);
        } else {
        }
      });
    },
    countdown: function() {
      var vm = this;
      if (vm.result.LimitInfo.EndTimeStr) {
        const end = Date.parse(vm.result.LimitInfo.EndTimeStr);
        const now = vm.nowtime;
        const msec = end - now;
        var day = parseInt(msec / 1000 / 60 / 60 / 24);
        var hr = parseInt((msec / 1000 / 60 / 60) % 24);
        var min = parseInt((msec / 1000 / 60) % 60);
        var sec = parseInt((msec / 1000) % 60);
        this.timedown.day = day > 9 ? day : "0" + day;
        this.timedown.hr = hr > 9 ? hr : "0" + hr;
        this.timedown.min = min > 9 ? min : "0" + min;
        this.timedown.sec = sec > 9 ? sec : "0" + sec;

        setTimeout(function() {
          vm.nowtime = vm.nowtime + 1000;
          vm.countdown(vm.result.LimitInfo.EndTimeStr);
        }, 1000);
      }
		},gologin: function() {
      Util.gologin(this);
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
