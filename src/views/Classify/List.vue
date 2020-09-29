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
      <!-- <div class="label-li">
        <dl class="clearfix">
          <dt>价格：</dt>
          <dd>
            <a href="javascript:" :class="moneystr==''?'active':''" @click="moneystr=''">全部</a>
            <a href="javascript:" :class="moneystr==item.id?'active':''" @click="moneystr=item.id" v-for="item in moneys" :key="item.id">{{item.name}}</a>
          </dd>
        </dl>
      </div> -->

      <div class="classify-products" v-if="result.Products  && result.Products.length>0">
        <ul>
          <li v-for="pitem in result.Products" :key="pitem.SkuId">
            <router-link :to="'/pdetail/'+pitem.SkuId">
              <span class="pic" style="margin-bottom:8px;"><img class="image178" :src="pitem.ImageUrl_200" /></span>
              <div style="line-height: 24px;">
                <span class="name ell2" :title="pitem.ProductName">{{pitem.ProductName}}</span>
                <span class=" ell2 skuname">{{pitem.SpeVal1}}</span>
                <span class="skuname ell2">{{pitem.FactoryName}}</span>
                <span class="price">¥{{pitem.ShowPrice}} </span>
              </div>

            </router-link>

            <div class="bottom">
              <span class="sc-btn" @click="FavoriteFun(pitem.SkuId,pitem.Id)">
                <i :class="favorites.indexOf(pitem.Id)>=0?'sced-icon':'sc-icon'"></i>收藏
              </span>
              <span class="cart-btn" @mouseover="showsku(pitem,1)" @click="buy(pitem.SkuId)">
                <i class="cart-icon"></i>加入采购单
              </span>
            </div>
            <div class="cl-cart" v-if="pitem.Checked" @mouseover="showsku(pitem)" @mouseout="pitem.Checked=false">
              <div class="name">包装规格：{{BuyShow.Specs}}</div>
              <div class="name">售价:{{BuyShow.ShowPrice}}</div>
              <div class="spe-li" v-for="(item,index) in SpeResult" :key="item.Name">
                <dl class="clearfix">
                  <dt>{{item.Name}}：</dt>
                  <dd>
                    <a href="javascript:" v-for="val in item.Childs" :key="val.Id" :class="{ active:(Spe1==val.Id||Spe2==val.Id||Spe3==val.Id),disable:val.IsDisable}" v-on:click="checkSpe(index,val.Id,val.AttrValue,val.IsDisable)">{{val.AttrValue}}</a>
                  </dd>
                </dl>
              </div>
              <div class="spe-li">
                <dl class="clearfix">
                  <dt>数量：</dt>
                  <dd class="oper">
                    <span class="minus" @click="cutBuyNum()">-</span>
                    <span><input type="text" class="cl-cart-inp" name="" id="" v-model="PostData.BuyNum" /></span>
                    <span class="plus" @click="addBuyNum()">+</span>
                  </dd>
                </dl>
              </div>
              <div class="btn">
                <a href="javascript:" class="cl-buy-btn" @click="buy(1)">一键采购</a>
                <a href="javascript:" class="cl-cart-btn" @click="buy(0)">加入采购单</a>
              </div>
            </div>
          </li>

        </ul>
      </div>
      <div class="product-empty" v-else>
        <div class="empty-icon"><img src="/static/images/icon/none.png" /></div>
        <div class="txt">没找到相关商品！</div>
      </div>
      <page :count-page="totalpage" @search="getproducts"></page>
    </div>
    <usertips></usertips>
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
    },
    checkSpeNums: function() {
      var num1 = this.Spe1 != 0 ? 1 : 0;
      var num2 = this.Spe2 != 0 ? 1 : 0;
      var num3 = this.Spe3 != 0 ? 1 : 0;
      return num1 + num2 + num3;
    },
    IsHaveSkus: function() {
      return this.SkuLists.length > 1 ? true : false;
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
      type: this.$route.query.type || 0,
      Id: 0,
      skuid: "",
      Spe1: 0,
      Spe2: 0,
      Spe3: 0,
      SpeVal1: "",
      SpeVal2: "",
      SpeVal3: "",
      SpeName1: "",
      SpeName2: "",
      SpeName3: "",
      PostData: {
        BuyNum: 1,
        Id: ""
      },
      BuyShow: {
        ShowPrice: 0,
        ShowStock: 0,
        Specs: ""
      },
      SpeResult: [],
      SkuLists: []
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

      istrue = Util.IsLogin(vm, true,true);
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
      if (!Util.IsLogin(vm, true,true)) {
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
    },
    showsku: function(item, issetinfo) {
      item.Checked = true;
      //  if(item.SkuLists && item.SkuLists.length >1){
      //      item.Checked=true;
      //  }
      if (issetinfo) {
        let vm = this;
        this.skuid = item.SkuId;
        this.Id = item.Id;
        this.SkuLists = item.SkuLists;
        this.SpeResult = item.SpeResult;
        this.PostData.BuyNum = 1;
        this.PostData.Id = item.SkuId;
        this.SpeResult.forEach(function(res, index) {
          if (index == 0) vm.SpeName1 = res.Name;
          if (index == 1) vm.SpeName2 = res.Name;
          if (index == 2) vm.SpeName3 = res.Name;
        });
        this.initShow();
      }
    },

    initShow: function() {
      let vm = this;
      let ids = vm.skuid.split("_");
      var itemtemp = vm.SkuLists.filter(function(e) {
        return e.Id == vm.skuid;
      });
      if (itemtemp && itemtemp.length > 0) {
        vm.BuyShow.ShowPrice = itemtemp[0].ShowPrice;
        vm.BuyShow.ShowStock = itemtemp[0].Stock;
        vm.BuyShow.Specs = itemtemp[0].Specs;
      }
      if (ids.length == 4) {
        vm.Spe1 = ids[1];
        vm.Spe2 = ids[2];
        vm.Spe3 = ids[3];
      }
    },
    checkSpe: function(index, id, val, IsDisable) {
      if (IsDisable) {
        return;
      }
      var vm = this;

      switch (index) {
        case 0:
          vm.Spe1 = id;
          vm.SpeVal1 = val;
          break;
        case 1:
          vm.Spe2 = id;
          vm.SpeVal2 = val;
          break;
        case 2:
          vm.Spe3 = id;
          vm.SpeVal3 = val;
          break;
      }
      this.getSku();
    },
    checkItemStock: function(ids) {
      var vm = this;
      vm.SkuLists.forEach(function(res, index) {
        if (ids.indexOf(res.Id) >= 0) {
        }
      });
    },
    checkStock: function(index) {
      var vm = this;

      var spenums = vm.SpeResult.length;
      var checknums = vm.checkSpeNums;
      if (spenums == checknums) {
      } else if (spenums - 1 == checknums) {
        //选择最后一个前判断
        if (vm.Spe1 == 0) {
          vm.SpeResult[0].Childs.forEach(function(res, index) {
            var sukid = vm.Id + "_" + res.Id + "_" + vm.Spe2 + "_" + vm.Spe3;
            var items = vm.SkuLists.filter(function(e) {
              return e.Id == sukid && e.Stock > 0;
            });
            if (items.length <= 0) {
              res.IsDisable = true;
            } else {
              res.IsDisable = false;
            }
          });

          //vm.SpeResult[0].Childs.forEach(res=>{

          //});
        } else if (vm.Spe2 == 0) {
          vm.SpeResult[1].Childs.forEach(function(res, index) {
            var sukid = vm.Id + "_" + vm.Spe1 + "_" + res.Id + "_" + vm.Spe3;

            var items = vm.SkuLists.filter(function(e) {
              return e.Id == sukid && e.Stock > 0;
            });
            if (items.length <= 0) {
              res.IsDisable = true;
            } else {
              res.IsDisable = false;
            }
          });
        } else if (vm.Spe3 == 0) {
          vm.SpeResult[2].Childs.forEach(function(res, index) {
            var sukid = vm.Id + "_" + +vm.Spe1 + "_" + vm.Spe2 + "_" + res.Id;
            var items = vm.SkuLists.filter(function(e) {
              return e.Id == sukid && e.Stock > 0;
            });
            if (items.length <= 0) {
              res.IsDisable = true;
            } else {
              res.IsDisable = false;
            }
          });
        }
      }
    },
    getSku: function() {
      var vm = this;
      var spenums = vm.SpeResult.length;
      var checknums = vm.checkSpeNums;
      if (spenums == checknums) {
        var skuid = vm.Id + "_" + vm.Spe1 + "_" + vm.Spe2 + "_" + vm.Spe3;

        var itemtemp = vm.SkuLists.filter(function(e) {
          return e.Id == skuid && e.Stock > 0;
        });
        if (itemtemp.length > 0) {
          vm.BuyShow.ShowPrice = itemtemp[0].ShowPrice;
          vm.BuyShow.ShowStock = itemtemp[0].Stock;
          vm.BuyShow.Specs = itemtemp[0].Specs;
          vm.PostData.Id = skuid;
          if (vm.PostData.BuyNum > vm.BuyShow.ShowStock) {
            vm.PostData.BuyNum = vm.BuyShow.ShowStock;
          }
        }

        vm.SpeResult.forEach(function(res, index) {
          switch (index) {
            case 0:
              res.Childs.forEach(function(item, index) {
                var temp =
                  vm.Id + "_" + item.Id + "_" + vm.Spe2 + "_" + vm.Spe3;
                var items = vm.SkuLists.filter(function(e) {
                  return e.Id == temp && e.Stock > 0;
                });
                if (items.length <= 0) {
                  item.IsDisable = true;
                } else {
                  item.IsDisable = false;
                }
              });

              break;
            case 1:
              res.Childs.forEach(function(item, index) {
                var temp =
                  vm.Id + "_" + vm.Spe1 + "_" + item.Id + "_" + vm.Spe3;
                var items = vm.SkuLists.filter(function(e) {
                  return e.Id == temp && e.Stock > 0;
                });
                if (items.length <= 0) {
                  item.IsDisable = true;
                } else {
                  item.IsDisable = false;
                }
              });
              break;
            case 2:
              res.Childs.forEach(function(item, index) {
                var temp =
                  vm.Id + "_" + vm.Spe1 + "_" + vm.Spe2 + "_" + item.Id;
                var items = vm.SkuLists.filter(function(e) {
                  return e.Id == temp && e.Stock > 0;
                });
                if (items.length <= 0) {
                  item.IsDisable = true;
                } else {
                  item.IsDisable = false;
                }
              });
              break;
          }
        });
      }
    },
    buyOpen: function(type) {
      var vm = this;

      if (vm.IsHaveSkus || type == 0) {
        vm.IsShowBuy = true;
      } else {
        this.buy(type);
      }
    },
    buy: function(type) {
      var vm = this;
      var istrue = true;
      var spenum = vm.SpeResult.length;
      switch (spenum) {
        case 1:
          if (vm.Spe1 == 0) {
            vm.$layer.msg("请选择:" + vm.SpeName1);
            istrue = false;
            return;
          }
          break;
        case 2:
          if (vm.Spe1 == 0) {
            vm.$layer.msg("请选择:" + vm.SpeName1);
            istrue = false;
            return;
          }
          if (vm.Spe2 == 0) {
            vm.$layer.msg("请选择:" + vm.SpeName2);
            istrue = false;
            return;
          }
          break;
        case 3:
          if (vm.Spe1 == 0) {
            vm.$layer.msg("请选择:" + vm.SpeName1);
            istrue = false;
            return;
          }
          if (vm.Spe2 == 0) {
            vm.$layer.msg("请选择:" + vm.SpeName2);
            istrue = false;
            return;
          }
          if (vm.Spe3 == 0) {
            vm.$layer.msg("请选择:" + vm.SpeName3);
            istrue = false;
            return;
          }
          break;
      }
      istrue = Util.IsLogin(vm, true,true);
      if (!istrue) {
        return;
      }
      var items = vm.SkuLists.filter(function(e) {
        return e.Id == vm.PostData.Id;
      });
      if (!items || items.length <= 0) {
        vm.$layer.msg("商品信息有误");
        return;
      }
      if (items[0].Stock <= 0) {
        vm.$layer.msg("操作失败，商品库存不足");
        return;
      }
      if (type == 1) {
        // vm.$layer.confirm("确定要购买吗", { btn: ["确定", "取消"] }, function(
        //   index
        // ) {

        //   vm.$layer.closeAll();
        // });
        Util.post(
          "api/Order/Save",
          { skuid: vm.PostData.Id, BuyNum: vm.PostData.BuyNum },
          vm,
          function(res, data) {
            if (res === "1") {
              // vm.$router.push({
              //   name: "ordersuccess",
              //   params: { id: data.data }
              // });
                vm.$layer.msg("下单成功，请在我的订单查看");
            } else {
              vm.$layer.msg(data);
            }
          }
        );
      } else {
        Util.post(
          "api/Carts/AddToCart",
          { skuid: this.PostData.Id, BuyNum: this.PostData.BuyNum },
          vm,
          function(res, data) {
            if (res === "1") {
              vm.$layer.msg("添加成功，在采购单等你~");
            } else {
              vm.$layer.msg(data);
            }
          }
        );
      }
    },
    addBuyNum: function() {
      this.PostData.BuyNum += 1;
    },
    cutBuyNum: function() {
      if (this.PostData.BuyNum > 1) {
        this.PostData.BuyNum -= 1;
      }
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

