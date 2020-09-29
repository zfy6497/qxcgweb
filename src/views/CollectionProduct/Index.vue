<template>
  <div class="ct clearfix">
    <div class="news-leader">当前位置：我的医疗</div>
    <div class="news-content">
      <div class="person-left fl">
        <UserLeft></UserLeft>
      </div>

      <div class="person-item ">
        <h3>我的收藏</h3>
        <div class="collectNav">
          <!-- <span class="selectAll fl"><input type="checkbox" :checked="IsAllCheck" v-on:click="allCheck" style="margin-right:8px;">全选</span> -->
          <a href="javascript:;" class="cancle" @click="deleteFun">全部取消</a>
        </div>
        <!-- <div class="collectBox" v-if="result" v-for="(item,index) in result" :key="index">
          <div class="collectbefore">
            <span class="selecthart"><input type="checkbox" name="item" :checked="item.Checked" v-on:click="checkOne(item.SkuId);"></span>
            <router-link :to="'/pdetail/'+item.SkuId">
              <div class="productpic"><img :src="item.ImageUrl" alt=""></div>
            </router-link>
            <p>{{item.ProductName}}</p>
            <em>￥{{item.ShowPrice}}</em>
          </div>
          <div class="selectBox">
            <router-link class="add bc" :to="'/pdetail/'+item.SkuId">购买</router-link>
            <a href="javascript:;" class="del" @click="favoriteFun(item.SkuId)">取消收藏</a>
          </div>
        </div> -->

        <div class="classify-products" v-if="result  && result.length>0">
          <ul>
            <li v-for="pitem in result" :key="pitem.SkuId">
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
                <span class="sc-btn" @click="favoriteFun(pitem.SkuId)">
                  <i class="sced-icon"></i>收藏
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
  computed: {
    checkSpeNums: function() {
      var num1 = this.Spe1 != 0 ? 1 : 0;
      var num2 = this.Spe2 != 0 ? 1 : 0;
      var num3 = this.Spe3 != 0 ? 1 : 0;
      return num1 + num2 + num3;
    }
  },
  data() {
    return {
      result: [],
      IsAllCheck: false,
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

      let url = "/api/Favorites/BatchDelete";
      Util.post(url, { }, vm, function(res, data) {
        if (res === "1") {
          vm.$layer.msg("操作成功");
          vm.init();
        } else {
          vm.$layer.msg(data);
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
      istrue = Util.IsLogin(vm, true);
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
  }
};
</script>


