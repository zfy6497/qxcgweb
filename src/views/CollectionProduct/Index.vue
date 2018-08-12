<template>
	<div class="ct clearfix">
		<div class="news-leader">当前位置：个人中心</div>
		<div class="news-content">
			<div class="person-left fl">
				<UserLeft></UserLeft>
			</div>

			<div class="person-item ">
				<h3>我的收藏</h3>
				<div class="collectNav">
					<span class="selectAll fl"><input type="checkbox" :checked="IsAllCheck" v-on:click="allCheck" style="margin-right:8px;">全选</span>
					<a href="javascript:;" class="cancle" @click="deleteFun">取消收藏</a>
				</div>
				<div class="collectBox" v-if="result" v-for="(item,index) in result" :key="index">
					<div class="collectbefore">
						<span class="selecthart"><input type="checkbox" name="item" :checked="item.Checked" v-on:click="checkOne(item.SkuId);"></span>
					  	<router-link :to="'/pdetail/'+item.SkuId">	<div class="productpic"><img :src="item.ImageUrl" alt=""></div></router-link>
						<p>{{item.ProductName}}</p>
						<em>￥{{item.ShowPrice}}</em>
					</div>
					<div class="selectBox">
						<router-link class="add bc" :to="'/pdetail/'+item.SkuId">购买</router-link>
						<a href="javascript:;" class="del" @click="favoriteFun(item.SkuId)">取消收藏</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
import UserLeft from "../components/userleft.vue";
export default {
  name: "",
  components: {
    UserLeft
  },
  data() {
    return {
      result: [],
      IsAllCheck: false
    };
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Favorites/GetList", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    },
    favoriteFun: function(skuid) {
      let vm = this;
      if (!Util.IsLogin(vm, true)) {
        return;
      }
      let url = "/api/Products/DeleteFavoriteProduct";
      Util.post(url, { SkuId: skuid }, vm, function(res, data) {
        if (res === "1") {
          vm.$layer.msg("操作成功");
          vm.init();
        } else {
          vm.$layer.msg(data);
        }
      });
    },
    allCheck: function() {
      var vm = this;
      if (vm.IsAllCheck) {
        vm.result.forEach(function(res, index) {
          res.Checked = false;
        });
      } else {
        vm.result.forEach(function(res, index) {
          res.Checked = true;
        });
      }
      vm.IsAllCheck = !vm.IsAllCheck;
    },
    checkOne: function(sid) {
      var vm = this;
      var items = vm.result.filter(function(e) {
        return e.SkuId == sid;
      });

      if (items.length > 0) {
        items[0].Checked = !items[0].Checked;
      }
    },
    deleteFun: function() {
      let vm = this;
      if (!Util.IsLogin(vm, true)) {
        return;
      }
      var ids = [];

      var items = vm.result.filter(function(e) {
        return e.Checked;
      });
      if (items.length == 0) {
        vm.$layer.msg("请选择要取消的商品");
        return;
      }

      items.forEach(function(res, index) {
        ids.push(res.SkuId);
      });
      let url = "/api/Favorites/BatchDelete";
      Util.post(url, { Ids: ids.toString() }, vm, function(res, data) {
        if (res === "1") {
          vm.$layer.msg("操作成功");
          vm.init();
        } else {
          vm.$layer.msg(data);
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>


