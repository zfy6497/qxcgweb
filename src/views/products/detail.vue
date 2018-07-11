<template>
    <div v-if="result && result.ProductInfo">
		<div class="detail-top" >
			<div class="d-t-left">
				<div class="big-pic">
					<ul v-for="item in result.ProductInfo.ImagePath.split(',')"  :key="item">
						<li><a href="javascript:"><img :src="item"/></a></li>
					</ul>
				</div>
				<div class="d-prev"><img src="/static/images/icon/d-prev.jpg"/></div>
				<div class="small-pic">
					<ul>
						<li v-for="item in result.ProductInfo.ImagePath.split(',')"  :key="item"><a href="javascript:"><img :src="item"/></a></li>
					</ul>
				</div>
				<div class="d-next"><img src="/static/images/icon/d-next.jpg"/></div>
			</div>
			
			<div class="d-t-right">
				<div class="d-t-li">
					<div class="name ell">{{result.ProductInfo.ProductName}}</div>
					<div class="tips">{{result.ProductInfo.ShortDescription}}</div>
				</div>
				<div class="d-t-li">
					<dl class="clearfix">
						<dt class="letter">售      价: </dt>
						<dd class="price">¥{{result.ProductInfo.MinSalePrice}}</dd>
					</dl>
					<dl class="clearfix">
						<dt>生产厂商:</dt>
						<dd> {{result.ProductInfo.FactoryName}}</dd>
					</dl>
					<dl class="clearfix spec">
						<dt>包装规格: </dt>
						<dd> {{result.ProductInfo.Specs}}</dd>
					</dl>
					<dl class="clearfix">
						<dt>商品库存: </dt>
						<dd>{{result.Stocks>0?'有库存':'无库存'}}</dd>
					</dl>
				</div>
				<div class="d-t-li" style="border: none;">
					<dl class="clearfix"  v-for="(item,index) in SpeResult" :key="item.Name">
						<dt>{{item.Name}}：</dt>
						<dd class="tags">
							<a href="javascript:" v-for="val in item.Childs" :key="val.Id" :class="{ active:(Spe1===val.Id||Spe2===val.Id||Spe3===val.Id),disable:val.IsDisable}" v-on:click="checkSpe(index,val.Id,val.AttrValue,val.IsDisable)">{{val.AttrValue}}</a>

						</dd>
					</dl>
					<dl class="clearfix">
						<dt class="letter">数   量：</dt>
						<dd>
							<span class="minus" @click="cutBuyNum()">-</span>
							<input type="text" name="" id="" class="num-inp"  v-model="PostData.BuyNum" />
							<span class="plus" @click="addBuyNum()">+</span>
						</dd>
					</dl>
					<div class="d-t-btn">
						<a href="javascript:" class="d-buy-btn" @click="buy(1)">立即购买</a>
						<a href="javascript:" class="d-buycart-btn" @click="buy(0)">加入购物车</a>
						<a href="javascript:" :class="result.IsFavorite?'collection-btned':'collection-btn'" @click="FavoriteFun"><span class="coll-icon"></span>{{result.IsFavorite?'已收藏':'收藏'}} </a>
					</div>
				</div>
			</div>
		</div>
	
		<div class="detail-mn">
			<div class="ct clearfix">
				<div class="recommend-li">
					<h2>为你推荐</h2>
					<router-link  v-for="item in result.RecommendProducts" :key="item.Id" :to="'/pdetail/'+item.Id">
						<span class="pic"><img  class="img178" :src="item.ImageUrl"/></span>
						<span class="price">¥{{item.ShowPrice}}</span>
						<div class="name ell2">{{item.ProductName}}</div>
					</router-link>
				</div>
				
				<div class="detail-info">
					<div class="detail-info-tabs">
						<a href="javascript:" :class="checktab===0?'active':''" @click="checktab=0">商品信息</a>
						<a href="javascript:" :class="checktab===1?'active':''" @click="checktab=1">资质荣誉</a>
						<a href="javascript:" :class="checktab===2?'active':''" @click="checktab=2">售后保障</a>
					</div>
					<div class="detail-info-mn" :style="checktab==0?'display: block;':''">
						<img src="/static/images/temp/d-info-img.jpg" />
						<img src="/static/images/temp/d-info-img.jpg"/>
					</div>
					<div class="detail-info-mn" :style="checktab==1?'display: block;':''">
						<img src="/static/images/temp/d-info-img.jpg"/>
					</div>
					<div class="detail-info-mn" :style="checktab==2?'display: block;':''">
						<img src="/static/images/temp/d-info-img.jpg"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Util from "../../libs/util.js";
export default {
  name: "App",
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
        Id: this.skuid
      },
      BuyShow: {
        ShowPrice: 0,
        ShowStock: 0
      },
      SpeResult: [],
      SkuLists: [],
      checktab: 0,
      Id: this.$route.params.id.split("_")[0]
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
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post(
        "api/Products/GetDetail",
        { SkuId: vm.skuid},
        vm,
        function(res, data) {
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
          } else {
          }
        }
      );
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
          vm.BuyShow.ShowPrice = itemtemp[0].SalePrice;
          vm.BuyShow.ShowStock = itemtemp[0].Stock;
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
      if (type == 1) {
        Util.post(
          "api/Order/Save",
          { skuid: this.PostData.Id, BuyNum: this.PostData.BuyNum },
          vm,
          function(res, data) {
            if (res === "1") {
              vm.$layer.msg("添加成功");
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
              vm.$layer.msg("添加成功");
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
      if (!Util.IsLogin(vm, true)) {
        return;
      }
      let url = vm.result.IsFavorite
        ? "/api/Products/DeleteFavoriteProduct"
        : "/api/Products/AddFavoriteProduct";

      Util.post(url, { SkuId: vm.skuid }, vm, function(res, data) {
        if (res === "1") {
          vm.$layer.msg("操作成功");
          vm.result.IsFavorite=!vm.result.IsFavorite;
        } else {
          vm.$layer.msg(data);
        }
      });
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
    }
  }
};
</script>

