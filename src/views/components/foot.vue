<template>
	<div>
		<div class="fix-tool">
			<dl @mouseover="showtag=1" @mouseout="showtag=0">
				<dt class="">
					<span class="tool-ph"></span>
				</dt>
				<dd class="ph-rwm" :class="showtag==1?'':'hid'">
					<div class="name">扫一扫进入商城小程序</div>
					<div class="rwm"><img src="/static/images/icon/rwm-img.png" /></div>
				</dd>
			</dl>
			<dl @mouseover="showtag=2" @mouseout="showtag=0">
				<router-link to="/cart">
					<dt class="">
						<span class="tool-cart"></span>
					</dt>
					<dd :class="showtag==2?'':'hid'">购物车</dd>
				</router-link>

			</dl>
			<dl @mouseover="showtag=3" @mouseout="showtag=0">
				<router-link to="service">
					<dt class="">
						<span class="tool-kf"></span>
					</dt>
					<dd :class="showtag==3?'':'hid'">客服</dd>
				</router-link>

			</dl>
			<dl @mouseover="showtag=4" @mouseout="showtag=0">
				<router-link to="/userorders">
					<dt class="">
						<span class="tool-user"></span>
					</dt>
					<dd :class="showtag==4?'':'hid'">个人中心</dd>
				</router-link>
			</dl>
			<dl class="re-top" @click="gotop">
				<dt class="">
					<span class="icon"></span>
					<div>top</div>

				</dt>
			</dl>

		</div>

		<div class="footer">
			<div class="footer-nav">
				<router-link to="/">首页</router-link>
				<router-link to="/classify">药店热销</router-link>
				<router-link to="/integralmall">积分商城</router-link>
				<router-link to="/limit">限时抢购</router-link>
				<router-link to="/">掌上医疗</router-link>
				<router-link to="/about">关于我们</router-link>
			</div>
			<div class="footer-mn">
				<div class="f-right">
					<img src="/static/images/icon/f-bz-img1.png" />
					<img src="/static/images/icon/f-bz-img2.png" />
					<img src="/static/images/icon/f-bz-img3.png" />
				</div>
				<div class="f-left">
					<div class="f-logo"><img src="/static/images/icon/f-logo.png" /></div>
					<div class="f-txt">
						<p>互联网药品交易服务资格证：浙CC111111</p>
						<p>互联网药品信息服务资格证：浙CC111111</p>
					</div>
					<div class="f-tips">企业服务电话：</div>
					<div class="f-ph">400-8888-8888</div>
				</div>

			</div>
		</div>
		<div class="footer-link">
			<div class="ct">
				友情链接：
				<a href="javascript:">医疗器械网</a>
				<a href="javascript:">器械大全</a>
				<a href="javascript:">药智网</a>
				<a href="javascript:">医流比价网</a>
				<a href="javascript:">医疗器械</a>
			</div>
		</div>

		<div class="footer-info">
			<div class="ct">
				<p>
					<a href="javascript:">医疗经营许可证</a>|
					<a href="javascript:">公司营业执照</a>|
					<a href="javascript:">互联网药品交易服务资格证书</a>|
					<a href="javascript:">互联网药品信息服务资格证书</a>
				</p>

				<p>CopyRight© 2018意料采购平台 　All Rights Reserved 浙ICP备16005904号</p>
				<p>
					<span class="f-logo-icon"></span>医疗采购平台</p>
			</div>
		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
export default {
  data() {
    return {
      showtag: 0,
      footinfo: ""
    };
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("pc/PcHome/GetFoot", {}, vm, function(res, data) {
        if (res === "1") {
          vm.footinfo = data.data;
        } else {
        }
      });
    },
    gotop() {
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    //this.init();
  }
};
</script>

