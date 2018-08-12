<template>
	<div class="header clearfix">
		<div class="header-top ">
			<div class="ct">
				<div class="header-top-right">
					<router-link to="/cart">
						<span class="cart-icon"></span>购物车 {{cartnums}} 件</router-link>|
					<router-link to="/userorders">商城订单</router-link>
				</div>
				<template v-if="islogin">
					欢迎您，{{username}}
					<a href="javascript:;" @click="loginout()" class="header-login">退出</a>
				</template>
				<template v-else>
					欢迎来到医疗采购平台！
					<router-link to="/templogin" class="header-login">登录</router-link>
				</template>

			</div>
		</div>

		<div class="header-mn ">
			<div class="ct">
				<div class="h-service">
					<div class="txt">客服热线
						<router-link to="/service">进入</router-link>
					</div>
					<div class="number">400-890-1588</div>
				</div>
				<router-link to="/">
					<div class="logo"><img src="/static/images/icon/logo.png" /></div>
				</router-link>
				<div class="h-search">
					<div class="h-search-laber clearfix">
						<a href="javascript:" :class="type==0?'active':''" @click="type=0">商品</a>
						<a href="javascript:" :class="type==1?'active':''" @click="type=1">厂家</a>
					</div>
					<div class="h-search-box">
						<span class="search-icon"></span>
						<input type="" class="search-inp" name="" id="" value="" v-model="keyword" :placeholder="defaultsearch" />
						<a href="javascript:" class="search-btn" @click="search(0)">搜索</a>
					</div>
					<div class="h-search-txt">
						热门搜索：
						<a href="javascript:" @click="search(1,item)" v-for="(item,index)  in searchs" :key="index">{{item}}</a>
					</div>
				</div>
				<div class="h-nav">
					<div class="h-nav-menu">
						<div class="menu-top" @click="isshowcategrories=!isshowcategrories">
							<span class="menu-icon"></span>所有商品分类</div>
						<div :class="['classify-li',isshowcategrories?'':'hid']" :style="path=='/classify'?'height:360px;':''">
							<dl v-for="item in showdata" :key="item.Id">
								<dt @mouseover="item.IsOver=true" @mouseout="item.IsOver=false">
									<router-link :to="'/classifylist/'+item.Id"><img :src="item.Icon" />{{item.Name}}</router-link>
								</dt>
								<dd v-if="item.Childrens" :class="item.IsOver?'vis-show':'vis-hid'" @mouseover="item.IsOver=true" @mouseout="item.IsOver=false">
									<div class="m-box clearfix" v-for="itemtwo in item.Childrens" :key="itemtwo.Id">
										<div class="m-left">
											<router-link :to="'/classifylist/'+itemtwo.Id">{{itemtwo.Name}}</router-link>
										</div>
										<div class="m-right" v-for="itemthree in itemtwo.Childrens" :key="itemthree.Id">
											<router-link :to="'/classifylist/'+itemthree.Id">{{itemthree.Name}}</router-link>
										</div>
										<div class="arrow-icon"></div>
									</div>

								</dd>
							</dl>

							<div class="nav-menu-btn" v-if="result && result.length>rows">
								<a href="javascript:" @mouseover="page=0" :class="page===0?'active':''">上一页</a>
								<a href="javascript:" @mouseover="page=1" :class="page===1?'active':''">下一页</a>
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
      path: "/",
      cartnums: 0,
      type: 0,
      keyword: "",
      username: this.$store.state.user.name || "",
      hotsearch: "",
      defaultsearch: ""
    };
  },
  mounted() {
    this.init();
    if (this.showpaths.indexOf(this.$route.path) >= 0) {
      this.isshowcategrories = true;
    } else {
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
    },
    islogin: function() {
      return Util.IsLogin(this);
    },
    searchs: function() {
      let s = [];
      if (this.hotsearch) {
        s = this.hotsearch.split("&");
      }
      return s;
    }
  },
  methods: {
    init: function() {
      var vm = this;
      Util.post("api/Products/GetCategories", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });

      Util.post("api/Carts/GetCartNums", {}, vm, function(res, data) {
        if (res === "1") {
          vm.cartnums = parseInt(data.data);
        } else {
        }
      });

      Util.post("pc/PcHome/GetHotSearch", {}, vm, function(res, data) {
        if (res === "1") {
          vm.hotsearch = data.data.HotSearch;
          vm.defaultsearch = data.data.DefaultSearch;
        } else {
        }
      });
    },
    golink: function(url) {
      this.path = url;
      this.$router.push(url);
    },
    search: function(type, keyword) {
      let k = this.defaultsearch;
      if (type === 1) {
        k = keyword;
      }else if(this.keyword){
				k=this.keyword;
			}
			k=escape(k);
      this.$router.push({
        name: "classify_list",
        query: { keyword: k, type: this.type }
      });
    },
    loginout: function() {
      var vm = this;
      this.$store.commit("logout");
      vm.$router.push({ name: "home", query: { isref: 1 } });
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
      } else {
        this.isshowcategrories = false;
      }
    },
    $route(to, from) {
      this.path = to.path;
    }
  }
};
</script>

