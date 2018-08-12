<template>
  <ul v-if="productList && productList.length>0">
    <li v-for="item in productList" :key="item.SkuId">
      <router-link :to="'/pdetail/'+item.SkuId" style="line-height: 20px;">
        <span class="pic" style="margin-bottom:5px;"><img class="image128" :src="item.ImageUrl_200" /></span>
        <span class="price">¥{{item.ShowPrice}} </span>
        <span class=" ell2 skuname">{{item.SkuName}}</span>
        <span class="skuname ell2">{{item.FactoryName}}</span>
        <span class="name ell2">{{item.ProductName}}</span>
      </router-link>
      <div class="bottom">
        <span class="sc-btn" @click="FavoriteFun(item.SkuId,item.Id)">
          <i :class="favorites.indexOf(item.Id)>=0?'sced-icon':'sc-icon'"></i>收藏
        </span>
        <span class="cart-btn" @click="buy(item.SkuId)">
          <i class="cart-icon"></i>加入购物车
        </span>
      </div>
    </li>

  </ul>
</template>
<script>
import Util from "../../libs/util.js";
export default {
  name: "App",
  data() {
    return {
      favorites: []
    };
  },
  props: {
    productList: {
      type: Array
    }
  },
  methods: {
    getfavorites: function() {
      let vm = this;
      Util.post("api/Favorites/GetUserFavorite", {}, vm, function(res, data) {
        if (res === "1") {
          vm.favorites = data.data;
        } else {
        }
      });
    },
    buy: function(skuid) {
      var vm = this;
      var istrue = true;

      istrue = Util.IsLogin(vm, true);
      if (!istrue) {
        return;
      }
      Util.post(
        "api/Carts/AddToCart",
        { skuid: skuid, BuyNum: 1 },
        vm,
        function(res, data) {
          if (res === "1") {
            vm.$layer.msg("添加成功");
          } else {
            vm.$layer.msg(data);
          }
        }
      );
    },
    FavoriteFun: function(skuid, id) {
      let vm = this;
      if (!Util.IsLogin(vm, true)) {
        return;
      }
      var indexid = vm.favorites.indexOf(id);
      let url =
        indexid >= 0
          ? "/api/Products/DeleteFavoriteProduct"
          : "/api/Products/AddFavoriteProduct";

      Util.post(url, { SkuId: skuid }, vm, function(res, data) {
        if (res === "1") {
          vm.$layer.msg("操作成功");
          if (indexid >= 0) {
            vm.favorites.splice(indexid, 1);
          } else {
            vm.favorites.push(id);
          }
        } else {
          vm.$layer.msg(data);
        }
      });
    }
  },
  mounted() {
    this.getfavorites();
  }
};
</script>

