<template>
  <div class="ct" v-if="CartList">
    <div class="cart-til">
      <span>我的采购单</span>
    </div>
    <div class="" v-if="CartList && CartList.length>0">
      <div class=" clearfix">
        <ul class="sc_column">
          <li class="column1">
            <label><input type="checkbox" checked="IsAllCheck" v-model="IsAllCheck" v-on:click="allCheck">全选</label>商品信息</li>
          <li class="column2">单价（元）</li>
          <li class="column3">数量</li>
          <li class="column4">小计（元）</li>
          <li class="column5">操作</li>
        </ul>
      </div>
      <div class="shop_msg_box">
        <div class="shop_msg">
          <ul>
            <li class="" v-for="item in CartList" :key="item.Id">
              <input class="fl check_input mr_tp" type="checkbox" v-if="item.Status==1" :checked="item.Checked" v-on:click="checkOne(item.SkuId);">
              <router-link :to="'pdetail/'+item.SkuId" class="msg1 fl clearfix">
                <img class="fl pic image82" :src="item.ImageUrl_100">
                <div class="fl">
                  <p class="des">{{item.ProductName}}
                    <font class="skuname">{{item.SpeVal1}}
                    </font>
                    <font v-if="item.Status!=1" style="color:red;">已失效</font>
                  </p>

                </div>
              </router-link>
              <div class="msg2 fl">
                <span class="cost2">{{item.ShowPrice}}</span>
              </div>
              <div class="msg3 fl pr">
                <a href="javascript:;" v-on:click="cutBuyNum(item.SkuId)" class="sc_btn reduce" style="color: rgb(102, 102, 102);">-</a>
                <input type="text" v-on:keyup="countProduct(item.SkuId,item.Quantity,item.Stock)" v-model="item.Quantity">
                <a href="javascript:;" class="sc_btn add" v-on:click="addBuyNum(item.SkuId)">+</a>
                <span class="skuname" style="margin-left: 5px;"> {{item.SpeVal2}}</span>
              </div>
              <div class="msg4 fl">{{(item.ShowPrice*item.Quantity).toFixed(2)}}</div>
              <div class="msg5 fr" v-on:click="deleteCart(item.SkuId)">
                <a href="javascript:;" class="sc_delete delete_1"></a>
              </div>
            </li>
            <!-- <li class="balance">商品应付总计：￥58.00</li> -->
          </ul>
          <!-- 结算 S -->
          <div class="settle_accounts clearfix">
            <div class="settle_l fl">
              <label><input type="checkbox" checked="IsAllCheck" v-model="IsAllCheck"  v-on:click="allCheck">全选</label>
                <span>
                  <a href="javascript:;" class="delete_link" v-on:click="deleteCart()">删除</a>
                  <a href="javascript:;" v-on:click="clearInvalid">清除失效宝贝</a>
                </span>
            </div>
            <div class="settle_r fr clearfix">
              <span>已选商品{{CheckInfo.Num}}件</span>
              <span>商品总计：
                <i>￥{{CheckInfo.Price}}</i>
              </span>
              <a href="javascript:;" class="settle_btn submit_btn" v-on:click="GoBuy">
                <b>提交</b>
              </a>

            </div>
            <!-- 结算 E -->
          </div>
        </div>

      </div>
    </div>

    <div class="no-cart" v-if="!CartList || CartList.length<=0">
      <div class="no-cart-icon"><img src="/static/images/icon/no-cart-icon.png" /></div>
        <div class="name" v-if="islogin">采购单空空如也，赶紧去
          <router-link to="/"> 逛逛吧></router-link>
        </div>
        <div class="name" v-else>您还未登录
          <router-link to="/templogin"> 去登录></router-link>
        </div>
      </div>

      <div class="you-like-txt">猜你喜欢</div>

      <div class="classify-products" style="padding-bottom: 20px;">
        <ProductsList :product-list="likelist"></ProductsList>
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
      CartNum: 0,
      CartList: [],
      IsAllCheck: true,
      likelist: [],
      islogin: true
    };
  },
  computed: {
    CheckInfo: function() {
      var vm = this;
      var items = vm.CartList.filter(function(e) {
        return e.Checked;
      });

      var isall = items.length == vm.CartList.length;
      var nums = 0,
        prices = 0;
      items.forEach(function(res, index) {
        if (res.Status == 1) {
          nums += res.Quantity - 0;
          prices += res.Quantity * res.ShowPrice;
        }
      });

      var result = {
        Num: nums,
        Price: prices.toFixed(2),
        IsAllCheck: isall
      };
      console.log(result);
      return result;
    }
  },
  watch: {},
  methods: {
    init: function(istwo) {
      var vm = this;
      Util.post("api/Carts/GetCartProducts", {}, vm, function(res, data) {
        let notid = [];
        if (res === "1") {
          vm.CartList = data.data;
          if (vm.CartList && vm.CartList.length > 0) {
            vm.CartList.forEach(function(res) {
              notid.push(res.ProductId);
            });
          }
        } else {
          if (data === "登录信息已失效，请重新登录" || data === "请登录") {
            vm.islogin = false;
          }
        }
        if (!istwo) {
          vm.getlikelist(notid);
        }
      });
    },
    addBuyNum: function(sid) {
      var vm = this;
      var item = vm.CartList.filter(function(e) {
        return e.SkuId == sid;
      })[0];
      if (item.Status != 1 && item.Stock <= 0) {
        return;
      }
      var quan = item.Quantity + 1;
      //loading();
      // 不要求登录
      Util.post(
        "api/Carts/UpdateCartItem",
        { SkuId: item.SkuId, BuyNum: quan },
        vm,
        function(res, data) {
          if (res === "1") {
            item.Quantity = quan;
          } else {
            vm.$layer.msg(data);
          }
        }
      );
    },
    cutBuyNum: function(sid) {
      var vm = this;
      var item = vm.CartList.filter(function(e) {
        return e.SkuId == sid;
      })[0];
      if (item.Status != 1) {
        return;
      }
      if (item.Quantity > 1) {
        var quan = item.Quantity - 1;
        // loading();
        // 不要求登录
        Util.post(
          "api/Carts/UpdateCartItem",
          { SkuId: item.SkuId, BuyNum: quan },
          vm,
          function(res, data) {
            if (res === "1") {
              item.Quantity = quan;
            } else {
              vm.$layer.msg(data);
            }
          }
        );
      }
    },
    allCheck: function() {
      var vm = this;
      if (vm.IsAllCheck) {
        vm.CartList.forEach(function(res, index) {
          res.Checked = false;
        });
      } else {
        vm.CartList.forEach(function(res, index) {
          res.Checked = true;
        });
      }
      vm.IsAllCheck = !vm.IsAllCheck;
    },
    checkOne: function(sid) {
      var vm = this;
      var items = vm.CartList.filter(function(e) {
        return e.SkuId == sid;
      });

      if (items.length > 0) {
        items[0].Checked = !items[0].Checked;
      }
    },
    countProduct: function(sid, num, stock) {
      if (!isNaN(num) && num > 0) {
        if (num > stock) {
          num = stock;
        }
        // loading();
        // 不要求登录
        Util.post(
          "api/Carts/UpdateCartItem",
          { SkuId: sid, BuyNum: num },
          vm,
          function(res, data) {
            if (res === "1") {
            } else {
              vm.$layer.msg(data);
            }
          }
        );
      }
    },
    clearInvalid: function() {
      var vm = this;
      var items = vm.CartList.filter(function(e) {
        return e.Status != 1;
      });

      if (items.length == 0) {
        vm.$layer.msg("没有失效的商品！");

        return;
      }
      var ids = [];
      items.forEach(function(res, index) {
        ids.push(res.SkuId);
      });

      Util.post(
        "api/Carts/BatchRemoveFromCart",
        { skuIds: ids.toString() },
        vm,
        function(res, data) {
          if (res === "1") {
            vm.init(true);
          } else {
            vm.$layer.msg(data);
          }
        }
      );
    },
    deleteCart: function(skuId) {
      var ids = [];
      var vm = this;
      if (skuId) {
        ids.push(skuId);
      } else {
        var items = vm.CartList.filter(function(e) {
          return e.Checked;
        });
        if (items.length == 0) vm.$layer.msg("请选择要删除的商品");

        items.forEach(function(res, index) {
          ids.push(res.SkuId);
        });
      }

      Util.post(
        "api/Carts/BatchRemoveFromCart",
        { SkuIds: ids.toString() },
        vm,
        function(res, data) {
          if (res === "1") {
            vm.init(true);
          } else {
            vm.$layer.msg(data);
          }
        }
      );
    },
    GoBuy: function() {
      var vm = this;
      var items = vm.CartList.filter(function(e) {
        return e.Checked;
      });
      if (items.length == 0) {
        vm.$layer.msg("请选择结算商品");
        return;
      }

      var ids = [];
      var islogin = true;
      items.forEach(function(res, index) {
        ids.push(res.Id);
        if (res.Id == 0) {
          islogin = false;
        }
      });

      islogin = Util.IsLogin(vm, true, true);
      if (!islogin) {
        return;
      }

      // vm.$layer.confirm("是否确认购买？", { btn: ["确定", "取消"] }, function(
      //   index
      // ) {

      // });
      Util.post(
        "api/Order/SaveByCart",
        { CartIds: ids.toString() },
        vm,
        function(res, data) {
          if (res === "1") {
            vm.$router.push({
              name: "ordersuccess",
              params: { id: data.data }
            });
          } else {
            vm.$layer.msg(data);
          }
        }
      );
      vm.$layer.closeAll();
    },
    getlikelist: function(ids) {
      let vm = this;
      Util.post(
        "api/Carts/GetLikeList",
        { NotIds: ids.toString() },
        vm,
        function(res, data) {
          if (res === "1") {
            vm.likelist = data.data;
          } else {
          }
        }
      );
    }
  },
  mounted: function() {
    this.init();
  }
};
</script>

