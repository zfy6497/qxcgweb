<template>
	<div class="ct clearfix" v-if="result">
		<div class="news-leader">当前位置：
				<router-link to="/">首页</router-link> 
			<router-link :to="'/newlist/'+result.TypeId">{{title}}</router-link> 
			<a href="javascript:;">{{result.Title}}</a>
		</div>
		<div class="news-content">
			<!-- 左侧导航栏 -->
			<div class="introduce-left">
				<div class="up-nav">
					<ul>
						<li >
							<router-link to="/newlist/1">公&nbsp;&nbsp;&nbsp;&nbsp;告</router-link>
				
						</li>
						<li>
							<router-link to="/newlist/2">健康指南</router-link>
						</li>
						<li>
							<router-link to="/newlist/3">行业资讯</router-link>
						</li>
					</ul>
				</div>

				<div class="recommend-li">
					<h2>为你推荐</h2>
					<PhLike :product-list="likes"></PhLike>
				</div>
			</div>
			<div class="detail-right fr">
				<div class="detailBoxnews">
					<h5>{{result.Title}}</h5>
					<span class="broaddate">发布时间:{{result.CreateTime | formatDate}}</span>
					<div v-html="result.Content">
						{{result.Content}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
import PhLike from "../components/phlikeproduct.vue";
export default {
  name: "App",
  components: {
    PhLike
  },
  data() {
    return {
      id: this.$route.params.id,
      result: {},
      likes: []
    };
  },
  mounted() {
    this.init();
    this.getlikelist();
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Articles/GetModel", { Id: vm.id }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    },
    getlikelist: function() {
      let vm = this;
      Util.post("api/Carts/GetLikeList", {}, vm, function(res, data) {
        if (res === "1") {
          vm.likes = data.data;
        }
      });
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
      switch (this.result.TypeId) {
        case 1:
          t = "公告";
          break;
        case 2:
          t = "健康指南";
          break;
        case 3:
          t = "行业资讯";
          break;
	  }
	  return t;
    }
  }
};
</script>

