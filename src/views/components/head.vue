<template>
    <div class="header clearfix">
	<div class="header-top ">
		<div class="ct">
			<div class="header-top-right">
				<a href="javascript:"><span class="cart-icon"></span>购物车 0 件</a>|
				<a href="javascript:;">商城订单</a>
			</div>
			欢迎来到医疗采购平台！<router-link to="/templogin" class="header-login">登录</router-link>
		</div>
	</div>	
		
	<div class="header-mn ">
		<div class="ct">
			<div class="h-service">
				<div class="txt">客服热线<a href="javascript:">进入</a></div>
				<div class="number">400-890-1588</div>
			</div>
            <router-link to="/"><div class="logo"><img src="/static/images/icon/logo.png"/></div></router-link>
			<div class="h-search">
				<div class="h-search-laber clearfix">
					<a href="javascript:" class="active">商品</a>
					<a href="javascript:">厂家</a>
				</div>
				<div class="h-search-box">
					<span class="search-icon"></span>
					<input type="" class="search-inp" name="" id="" value="" placeholder="输液器" />
					<a href="javascript:" class="search-btn">搜索</a>
				</div>
				<div class="h-search-txt">
					热门搜索：
					<a href="javascript:">输液器</a>
					<a href="javascript:">手套</a>
					<a href="javascript:">一次性</a>
					<a href="javascript:">输液泵</a>
					<a href="javascript:">麻醉机</a>
					<a href="javascript:">心电图机采血管</a>
				</div>
			</div>
			<div class="h-nav">
				<div class="h-nav-menu">
					<div class="menu-top" @click="isshowcategrories=!isshowcategrories"><span class="menu-icon"></span>所有商品分类</div>
					<div :class="['classify-li',isshowcategrories?'':'hid']"   :style="path=='/classify'?'height:360px;':''">
						<dl v-for="item in showdata" :key="item.Id">
							<dt  @mouseover="item.IsOver=true" @mouseout="item.IsOver=false">
								<a :href="'/products/search/'+item.Id"><img :src="item.Icon"/>{{item.Name}}</a>
							</dt>
							<dd v-if="item.Childrens" :class="item.IsOver?'vis-show':'vis-hid'"  @mouseover="item.IsOver=true" @mouseout="item.IsOver=false">
								<div class="m-box clearfix" v-for="itemtwo in item.Childrens" :key="itemtwo.Id">
									<div class="m-left"><a :href="'/products/search/'+itemtwo.Id">{{itemtwo.Name}}</a></div>
									<div class="m-right" v-for="itemthree in itemtwo.Childrens" :key="itemthree.Id">
										<a :href="'/products/search/'+itemthree.Id">{{itemthree.Name}}</a>
										
									</div>
									<div class="arrow-icon"></div>
								</div>
							
							</dd>
						</dl>
					
						<div class="nav-menu-btn" v-if="result && result.length>rows">
							<a href="javascript:" @mouseover="page=0" :class="page===0?'active':''">上一页</a>
							<a href="javascript:" @mouseover="page=1"  :class="page===1?'active':''">下一页</a>
						</div>
					</div>
				</div>
				<div class="h-nav-mn">
					  <a href="javascript:;" :class="path=='/'?'active':''" @click="golink('/')">首页</a>
					  <a href="javascript:;" :class="path=='/classify'?'active':''" @click="golink('/classify')">药店热销</a>
					  <a href="javascript:;" :class="path=='/integralmall'?'active':''" @click="golink('/integralmall')">积分商城</a>
					  <a href="javascript:;" :class="path=='/limit'?'active':''" @click="golink('/limit')">限时抢购</a>
					  <a href="javascript:;" :class="path=='/aaa'?'active':''" @click="golink('/')">掌上医疗</a>
					  <a href="javascript:;" :class="path=='/about'?'active':''" @click="golink('/about')">关于我们</a>
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
      isshowcategrories: false,
      showpaths: ["/", "/classify"],
      rows: 18,
      page: 0,
      path: "/"
    };
  },
  mounted() {
    this.init();
    if (this.showpaths.indexOf(this.$route.path) >= 0) {
      this.isshowcategrories = true;
    }else{
				this.isshowcategrories = false;
			}
    this.path = this.$route.path;
  },
  computed: {
    showdata: function() {
      return this.result.slice(
        this.rows * this.page,
        (this.page + 1) * this.rows
      );
    }
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Products/GetCategories", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    },
    golink: function(url) {
      this.path = url;
      this.$router.push(url);
    }
  },
  watch: {
    path: function(val, oldvalue) {
      if (val == "/classify") {
        this.rows = 9;
      } else {
        this.rows = 18;
			}
      if (this.showpaths.indexOf(val) >= 0) {
        this.isshowcategrories = true;
      }else{
				this.isshowcategrories = false;
			}
    }
  }
};
</script>

