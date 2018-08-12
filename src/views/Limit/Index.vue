<template>
  <div class="ct clearfix">
    <div class="limtbox-up">
      <div class="limitbanner"><img src="/static/images/temp/shopping.jpg" alt=""></div>
      <div class="limitclimb">
        <span class="limitTitle fl">
          <i class="clock_icon"></i>限时抢购</span>
        <div class="date fl" data-time="33537">
          <p class="fl" style="margin-top:6px;">剩余时间:</p>
          <span>
            <em class="hour">{{timedown.hr}}</em>时</span>
          <span>
            <em class="minute">{{timedown.min}}</em>分</span>
          <span>
            <em class="second">{{timedown.sec}}</em>秒</span>
        </div>
      </div>
    </div>

    <div class="classify-products" style="margin-bottom: 20px;" v-if="result">
      <ProductsList :product-list="result.Items"></ProductsList>
    </div>

  </div>
</template>
<script>
import Util from "../../libs/util.js";
import ProductsList from "../components/phproductlist.vue";
export default {
  name: "App",
  components: {
    ProductsList
  },
  data() {
    return {
      result: {},
      timedown: { hr: "00", min: "00", sec: "00" },
      favorites: [],
      nowtime:null
    };
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Activity/GetList", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
          vm.nowtime = Date.parse(vm.result.NowTimeStr);
          vm.countdown();
        } else {
        }
      });
    },
    countdown: function() {
      let vm = this;
      if (vm.result.EndTimeStr) {
        const end = Date.parse(vm.result.EndTimeStr);
        const now = vm.nowtime;
        const msec = end - now;
        let day = parseInt(msec / 1000 / 60 / 60 / 24);
        let hr = parseInt((msec / 1000 / 60 / 60) % 24);
        let min = parseInt((msec / 1000 / 60) % 60);
        let sec = parseInt((msec / 1000) % 60);

        this.timedown.hr = hr > 9 ? hr : "0" + hr;
        this.timedown.min = min > 9 ? min : "0" + min;
        this.timedown.sec = sec > 9 ? sec : "0" + sec;

        setTimeout(function() {
          vm.nowtime=vm.nowtime+1000
          vm.countdown(vm.result.EndTimeStr);
        }, 1000);
      }
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
      Util.post("api/Favorites/GetUserFavorite", {}, vm, function(res, data) {
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
  }
};
</script>

