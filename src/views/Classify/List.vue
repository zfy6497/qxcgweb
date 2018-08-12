<template>

  <div class="ct clearfix" v-if="result">

    <div class="crumb">
      <span v-if="result.Titles" v-for="item in result.Titles" :key="item.Id">
        <router-link :to="'/classifylist/'+item.Id">
          <span>{{item.Name}}</span>
        </router-link> ></span>
      {{result.NowTitle}}
    </div>

    <div class="classify-list-left">
      <div class="classify-list-li" v-if="!result.IsThree &&result.Categories ">
        <dl v-for="item in result.Categories" :key="item.Id">
          <dt :class="item.IsOver?'zan':''">
            <span class="icon" @click="item.IsOver=!item.IsOver"></span>
            <router-link :to="'/classifylist/'+item.Id" :style="categoryid==item.Id?'color: #05a0e3;':''" class="ell">{{item.Name}}</router-link>
          </dt>
          <dd :class="item.IsOver?'':'hid'">
            <router-link v-if="item.Childrens" v-for="itemtwo in item.Childrens" :key="itemtwo.Id" :to="'/classifylist/'+itemtwo.Id">{{itemtwo.Name}}</router-link>
          </dd>
        </dl>
      </div>
      <div class="classify-list-li three-list-li" v-if="result.IsThree&&result.Categories">
        <dl v-for="item in result.Categories" :key="item.Id">
          <dt>
            <router-link :to="'/classifylist/'+item.Id" class="ell" :style="categoryid==item.Id?'color: #05a0e3;':''">{{item.Name}}</router-link>
          </dt>
        </dl>
      </div>
      <div class="recommend-li" style="margin-top:30px;" v-if="result.RecommendProducts">
        <h2>为你推荐</h2>
        <router-link v-for="pitem in result.RecommendProducts" :key="pitem.SkuId" :to="'/pdetail/'+pitem.SkuId">
          <span class="pic"><img class="image128" :src="pitem.ImageUrl_200" /></span>
          <span class="price">¥{{pitem.ShowPrice}} </span>
          <span class="skuname ">{{pitem.SkuName}}</span>
          <span class="name ell2">{{pitem.ProductName}}</span>
        </router-link>
      </div>
    </div>

    <div class="classify-list-right">
      <div class="count-txt">共
        <span>{{result.Totals}}</span>件商品</div>
      <div class="label-li">
        <dl class="clearfix">
          <dt>品牌：</dt>
          <dd>
            <a href="javascript:" :class="brandid==0?'active':''" @click="brandid=0">全部</a>
            <a href="javascript:" :class="brandid==item.Id?'active':''" v-if="result.Brands" @click="brandid=item.Id" v-for="item in result.Brands" :key="item.Id">{{item.Name}}</a>
          </dd>
        </dl>
      </div>
      <div class="label-li">
        <dl class="clearfix">
          <dt>价格：</dt>
          <dd>
            <a href="javascript:" :class="moneystr==''?'active':''" @click="moneystr=''">全部</a>
            <a href="javascript:" :class="moneystr==item.id?'active':''" @click="moneystr=item.id" v-for="item in moneys" :key="item.id">{{item.name}}</a>
          </dd>
        </dl>
      </div>

      <div class="classify-products" v-if="result.Products">
        <ul>
          <li v-for="pitem in result.Products" :key="pitem.SkuId">
            <router-link :to="'/pdetail/'+pitem.SkuId">
              <span class="pic" style="margin-bottom:8px;"><img class="image178" :src="pitem.ImageUrl_200" /></span>
               <span class="price">¥{{pitem.ShowPrice}} </span>
                <span class=" ell2 skuname">{{pitem.SkuName}}</span>
                        <span class="skuname ell2">{{pitem.FactoryName}}</span>
                <span class="name ell2">{{pitem.ProductName}}</span>
            </router-link>

            <div class="bottom">
              <span class="sc-btn" @click="FavoriteFun(pitem.SkuId,pitem.Id)">
                <i :class="favorites.indexOf(pitem.Id)>=0?'sced-icon':'sc-icon'"></i>收藏
              </span>
              <span class="cart-btn" @click="buy(pitem.SkuId)">
                <i class="cart-icon"></i>加入购物车
              </span>
            </div>
          </li>

        </ul>
      </div>
      <page :count-page="totalpage" @search="getproducts"></page>
    </div>

  </div>
</template>
<script>
import Util from "../../libs/util.js";
import page from "../components/phpage.vue";
export default {
  components: {
    page
  },
  computed: {
    totalpage() {
      if (this.result.Totals) {
        return (
          parseInt(this.result.Totals / this.rows) +
          (this.result.Totals % this.rows > 0 ? 1 : 0)
        );
      } else return 0;
    }
  },
  name: "App",
  data() {
    return {
      brandid: 0,
      moneystr: "",
      categoryid: this.$route.params.id || 0,
      keyword: this.$route.query.keyword || "",
      result: {},
      moneys: [
        { id: "0-99", name: "0-99元" },
        { id: "100-999", name: "100-999元" },
        { id: "1000-9999", name: "1000-9999元" },
        { id: "10000", name: "10000元以上" }
      ],
      countpage: 0,
      rows: 40,
      showid: "",
      favorites: [],
      type: this.$route.query.type || 0
    };
  },
  methods: {
    init: function() {
      let vm = this;
      let postData = {
        BrandId: vm.brandid,
        MoneyStr: vm.moneystr,
        CategoryId: vm.categoryid,
        Page: 1,
        Rows: vm.rows,
        KeyWord: vm.keyword,
        Type: vm.type
      };

      Util.post("pc/PcClassify/GetSearchModel", postData, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.result = data.data;
          vm.result.Totals = data.data.Totals;
        } else {
        }
      });
    },
    getproducts: function(page) {
      let vm = this;
      let postData = {
        BrandId: vm.brandid,
        MoneyStr: vm.moneystr,
        CategoryId: vm.categoryid,
        Page: page ? page : 1,
        Rows: vm.rows,
        KeyWord: vm.keyword,
        Type: vm.type
      };

      Util.post("pc/PcClassify/GetSearchProducts", postData, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          if (data.data) {
            vm.result.Products = data.data.Rows;
            vm.result.Totals = data.data.Totals;
          } else {
            vm.result.Products = [];
            vm.result.Totals = 0;
          }
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
    },
    getfavorites: function() {
      let vm = this;
      Util.post("pc/Favorites/GetUserFavorite", {}, vm, function(res, data) {
        if (res === "1") {
          vm.favorites = data.data;
        } else {
        }
      });
    }
  },
  mounted() {
    this.init();
    this.getfavorites();
  },
  watch: {
    $route(to, from) {
      this.categoryid = to.params.id || this.$route.params.id;
      this.keyword = this.$route.query.keyword || "";
      this.type = this.$route.query.type || 0;
      this.init();
    },
    brandid: function(val, oldvalue) {
      this.getproducts();
    },
    moneystr: function(val, oldvalue) {
      this.getproducts();
    }
    // },
    // keyword: function(val, oldvalue) {
    //   this.getproducts();
    // }
  }
};
</script>

