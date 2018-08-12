<template>
	<div class="ct clearfix">
		<div class="news-leader">当前位置：
			<router-link to="/">首页</router-link>
			<a href="javascript:;">{{title}}</a>
		</div>
		<div class="news-content">
			<!-- 左侧导航栏 -->
			<div class="introduce-left fl">
				<div class="up-nav">
					<ul>
						<li :class="id==1?'active':''" @click="changetype('1')">
							<a href="javascript:;">公&nbsp;&nbsp;&nbsp;&nbsp;告</a>
						</li>
						<li :class="id==2?'active':''">
							<a href="javascript:;" @click="changetype('2')">健康指南</a>
						</li>
						<li :class="id==3?'active':''">
							<a href="javascript:;" @click="changetype('3')">行业资讯</a>
						</li>
					</ul>
				</div>

				<div class="recommend-li">
					<h2>为你推荐</h2>
					<PhLike :product-list="likes"></PhLike>
				</div>
			</div>
			<!-- 右侧显示 -->
			<div class="intronav-item fr" style="display:block;">
				<h6>{{title}}</h6>
				<!-- 新闻列表 -->
				<div class="navcontent-list" v-if="result.rows">
					<ul>
						<li v-for="item in result.rows" :key="item.Id">
							<router-link :to="'/newdetail/'+item.Id">
								<span class="intro-text ell">{{item.Title}}</span>
								<span class="intro-date">{{item.CreateTime | formatDate}}</span>
							</router-link>
						</li>
					</ul>
				</div>
				<page :count-page="result.total" @search="init"></page>

			</div>
		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
import PhLike from "../components/phlikeproduct.vue";
import page from "../components/phpage.vue";
export default {
  name: "App",
  components: {
	PhLike,
	page
  },
  data() {
    return {
      id: this.$route.params.id,
      result: {},
      likes: [],
      page: 1,
      rows: 20
    };
  },
  mounted() {
    this.init();
    this.getlikelist();
  },
  methods: {
    init: function(page) {
      let vm = this;
      if (page) {
		  vm.page=page;
      }
      Util.post(
        "api/Articles/GetList",
        { Type: vm.id, Page: vm.page, Rows: vm.rows },
        vm,
        function(res, data) {
          if (res === "1") {
            vm.result = data.data;
          } else {
          }
        }
      );
    },
    getlikelist: function() {
      let vm = this;
      Util.post("api/Carts/GetLikeList", {}, vm, function(res, data) {
        if (res === "1") {
          vm.likes = data.data;
        }
      });
    },
    changetype: function(typeid) {
      this.id = typeid;
      this.init();
    }
  },
  filters: {
    formatDate: function(data) {
      return Util.formatDateFull(data);
    }
  },
  computed: {
    title: function() {
      let t = "";
      switch (this.id) {
        case "1":
          t = "公告";
          break;
        case "2":
          t = "健康指南";
          break;
        case "3":
          t = "行业资讯";
          break;
      }
      return t;
    }
  }
};
</script>

