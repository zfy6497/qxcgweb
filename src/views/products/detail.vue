<template>
  <div v-if="result && result.ProductInfo">
    <div class="detail-top">
      <div class="d-t-left">
        <div class="big-pic">
          <ul>
            <li>
              <a href="javascript:"><img :src="showimg" /></a>
            </li>
          </ul>
        </div>
        <div class="d-prev" @click="changeimgnum(0)"><img src="/static/images/icon/d-prev.jpg" /></div>
          <div class="small-pic">
            <ul>
              <li v-for="(item,index) in result.ProductInfo.ImagePath.split(',')" :key="item" @click="checkimgid=index">
                <a href="javascript:"><img :src="item+'_100_100.jpg'" /></a>
              </li>
            </ul>
          </div>
          <div class="d-next" @click="changeimgnum(1)"><img src="/static/images/icon/d-next.jpg" /></div>
          </div>

          <div class="d-t-right">
            <div class="d-t-li">
              <div class="name ell">{{result.ProductInfo.ProductName}}</div>
              <div class="tips">{{result.ProductInfo.ShortDescription}}</div>
            </div>
            <div class="d-t-li">
              <dl class="clearfix">
                <dt class="letter">售 价: </dt>
                <dd class="price">¥{{BuyShow.ShowPrice}}</dd>
              </dl>
              <dl class="clearfix">
                <dt>生产厂商:</dt>
                <dd> {{result.ProductInfo.FactoryName}}</dd>
              </dl>
              <dl class="clearfix spec">
                <dt>包装规格: </dt>
                <dd> {{BuyShow.Specs}}</dd>
              </dl>
              <dl class="clearfix">
                <dt>商品库存: </dt>
                <dd>{{BuyShow.ShowStock>0?'有库存':'无库存'}}</dd>
              </dl>
            </div>
            <div class="d-t-li" style="border: none;">
              <dl class="clearfix" v-for="(item,index) in SpeResult" :key="item.Name">
                <dt>{{item.Name}}：</dt>
                <dd class="tags">
                  <a href="javascript:" v-for="val in item.Childs" :key="val.Id" :class="{ active:(Spe1==val.Id||Spe2==val.Id||Spe3==val.Id),disable:val.IsDisable}" v-on:click="checkSpe(index,val.Id,val.AttrValue,val.IsDisable)">{{val.AttrValue}}</a>

                </dd>
              </dl>
              <dl class="clearfix">
                <dt class="letter">数 量：</dt>
                <dd>
                  <span class="minus" @click="cutBuyNum()">-</span>
                  <input type="text" name="" id="" class="num-inp" v-model="PostData.BuyNum" />
                  <span class="plus" @click="addBuyNum()">+</span>
                </dd>
              </dl>
              <div class="d-t-btn">
                <a href="javascript:" class="d-buy-btn" @click="buy(1)">一键采购</a>
                <a href="javascript:" class="d-buycart-btn" @click="buy(0)">加入采购单</a>
                <a href="javascript:" :class="result.IsFavorite?'collection-btned':'collection-btn'" @click="FavoriteFun">
                  <span class="coll-icon"></span>{{result.IsFavorite?'已收藏':'收藏'}} </a>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-mn">
          <div class="ct clearfix">
            <div class="recommend-li">
              <h2>为你推荐</h2>
              <PhLike :product-list="result.RecommendProducts"></PhLike>
            </div>

            <div class="detail-info">
              <div class="detail-info-tabs">
                <a href="javascript:" :class="checktab===0?'active':''" @click="checktab=0">商品信息</a>
                <a href="javascript:" :class="checktab===1?'active':''" @click="checktab=1">资质荣誉</a>
                <a href="javascript:" :class="checktab===2?'active':''" @click="checktab=2">售后保障</a>
              </div>
              <div class="detail-info-mn" :style="checktab==0?'display: block;':''" v-html="result.ProductInfo.Description">
                {{result.ProductInfo.Description}}
              </div>
              <div class="detail-info-mn" :style="checktab==1?'display: block;':''" v-html="tabinfo1">
                {{tabinfo1}}
              </div>
              <div class="detail-info-mn" :style="checktab==2?'display: block;':''" v-html="tabinfo2">
                {{tabinfo2}}
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
      result: [],
      skuid: this.$route.params.id,
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
        Id: this.$route.params.id
      },
      BuyShow: {
        ShowPrice: 0,
        ShowStock: 0,
        Specs: ""
      },
      SpeResult: [],
      SkuLists: [],
      checktab: 0,
      Id: this.$route.params.id.split("_")[0],
      articles: [],
      checkimgid: 0
    };
  },
  computed: {
    checkSpeNums: function() {
      var num1 = this.Spe1 != 0 ? 1 : 0;
      var num2 = this.Spe2 != 0 ? 1 : 0;
      var num3 = this.Spe3 != 0 ? 1 : 0;
      return num1 + num2 + num3;
    },
    IsHaveSkus: function() {
      return this.SkuLists.length > 1 ? true : false;
    },
    tabinfo1: function() {
      let info = "";
      if (this.articles && this.articles.length > 0) {
        let items = this.articles.filter(function(res) {
          return res.TypeId == 5;
        });
        if (items && items.length > 0) {
          info = items[0].Content;
        }
      }
      return info;
    },
    tabinfo2: function() {
      let info = "";
      if (this.articles && this.articles.length > 0) {
        let items = this.articles.filter(function(res) {
          return res.TypeId == 6;
        });
        if (items && items.length > 0) {
          info = items[0].Content;
        }
      }
      return info;
    },
    showimg: function() {
      let imgs = this.result.ProductInfo.ImagePath.split(",");
      if (imgs.length > this.checkimgid) {
        return imgs[this.checkimgid];
      } else {
        return "";
      }
    }
  },
  mounted() {
    let vm = this;
    this.init();
    setTimeout(function() {
      vm.gettabinfo();
    }, 500);
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Products/GetDetail", { SkuId: vm.skuid }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.result = data.data;
          var spes = data.data.SpeResult;
          vm.SpeResult = spes;
          vm.SkuLists = data.data.SkuLists;

          spes.forEach(function(res, index) {
            if (index == 0) vm.SpeName1 = res.Name;
            if (index == 1) vm.SpeName2 = res.Name;
            if (index == 2) vm.SpeName3 = res.Name;
          });
          vm.initShow();
          vm.checkActivity(vm.skuid);
        } else {
          vm.$layer.msg("加载出了点问题，刷新一下试试~");
        }
      });
    },
    gettabinfo: function() {
      let vm = this;
      Util.post("api/Products/GetTabInfo", {}, vm, function(res, data) {
        if (res === "1") {
          vm.articles = data.data;
        } else {
        }
      });
    },
    checkActivity: function(skuid) {
      let vm = this;
      if (vm.BuyShow.ShowPrice != "请联系客服") {
        if (vm.result.ActivityItems && vm.result.ActivityItems.length > 0) {
          let items = vm.result.ActivityItems.filter(function(res) {
            return res.SkuId == skuid;
          });
          if (items && items.length > 0) {
            vm.BuyShow.ShowPrice = items[0].ActivityPrice;
          }
        }
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
      this.checkStock();
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
      var spenums = vm.result.SpeResult.length;
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
          vm.checkActivity(skuid);
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
      istrue = Util.IsLogin(vm, true, true);
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
              vm.$layer.msg("下单成功,请在我的订单查看~");
              setTimeout(function() {
                vm.$router.go(-1);
              }, 1500);
            } else {
              vm.$layer.msg(data);
            }
          }
        );
        vm.$layer.closeAll();
      } else {
        Util.post(
          "api/Carts/AddToCart",
          { skuid: this.PostData.Id, BuyNum: this.PostData.BuyNum },
          vm,
          function(res, data) {
            if (res === "1") {
              vm.$layer.msg("添加成功,在采购单等你~");
              setTimeout(function() {
                vm.$router.go(-1);
              }, 1500);
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
    },
    FavoriteFun: function() {
      let vm = this;
      if (!Util.IsLogin(vm, true, true)) {
        return;
      }
      let url = vm.result.IsFavorite
        ? "/api/Products/DeleteFavoriteProduct"
        : "/api/Products/AddFavoriteProduct";

      Util.post(url, { SkuId: vm.skuid }, vm, function(res, data) {
        if (res === "1") {
          vm.$layer.msg("操作成功");
          vm.result.IsFavorite = !vm.result.IsFavorite;
        } else {
          vm.$layer.msg(data);
        }
      });
    },
    changeimgnum: function(type) {
      if (type == 1) {
        let nums = this.result.ProductInfo.ImagePath.split(",").length;
        if (this.checkimgid + 1 < nums) {
          this.checkimgid += 1;
        }
      } else {
        if (this.checkimgid >= 1) {
          this.checkimgid -= 1;
        }
      }
    }
  },
  watch: {
    Spe1: function(val, oldvalue) {
      this.getSku();
    },
    Spe2: function(val, oldvalue) {
      this.getSku();
    },
    Spe3: function(val, oldvalue) {
      this.getSku();
    },
    $route(to, from) {
      this.skuid = to.params.id;
      this.init();
    }
  }
};
</script>

