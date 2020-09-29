<template>
  <div class="ct clearfix">
    <div class="news-leader">当前位置：我的医疗</div>
    <div class="news-content">
      <div class="person-left fl">
        <UserLeft></UserLeft>
      </div>

      <div class="person-item  fr" style="display:block;">
        <h3>我的订单</h3>
        <div class="orderNav">
          <ul>
            <li v-for="item in status" :key="item.id" :class="PostData.OrderStatus==item.id?'addcol':'' " @click="PostData.OrderStatus=item.id">
              <a href="javascript:;">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="orderItem" style="display:block;" v-if="result">
          <dl v-for="item in result" :key="item.Id">
            <dt>
              <p class="orderDate">{{item.OrderDate | formatDate}}</p>
              <p class="orderNum">订单编号：{{item.Id}}</p>
            </dt>
            <dd v-for="(twoitem,indexid) in item.Items" :key="twoitem.Id">
              <div class="rule">
                <p class="picimg">
                  <router-link :to="'/pdetail/'+twoitem.SkuId"><img class="image102" :src="twoitem.ImageUrl_100" alt=""></router-link>
                </p>
                <span :title="twoitem.ProductName">{{twoitem.ProductName}}</span>
                <p class="skuname" style=" width: 208px;height: 38px;overflow: hidden;line-height: 19px;float: left; margin: 10px 0 0 40px;">{{twoitem.SpeVal1}}</p>
                <em>￥{{twoitem.SalePrice}}</em>
                <i>x{{twoitem.Quantity}} <span class="skuname">{{twoitem.SpeVal2}}</span></i>
              </div>

              <template v-if="indexid==0">
                <div class="price">{{item.OrderAmountRedundancy}}</div>
                <div class="status">{{item.OrderStatusStr}}</div>
                <div class="operate">
                  <a v-if="item.OrderStatus==3" href="javascript:;" @click="confirmOrder(item.Id)" class="confirm cr">确认收货</a>
                </div>
              </template>

            </dd>

          </dl>

        </div>
        <page :count-page="totalpage" @search="init"></page>
      </div>
    </div>
  </div>
</template>
<script>
import Util from "../../libs/util.js";
import UserLeft from "../components/userleft.vue";
import page from "../components/phpage.vue";
export default {
  name: "App",
  data() {
    return {
      result: [],
      PostData: {
        OrderStatus: 0,
        Page: 1,
        Rows: 10
      },
      status: [
        { id: 0, name: "全部" },
        { id: 2, name: "待发货" },
        { id: 3, name: "待收货" },
        { id: 4, name: "已收货" }
      ],
      nowid: 0,
      totals: 0
    };
  },
  components: {
    UserLeft,
    page
  },
  computed: {
    nowstatus() {
      return this.PostData.OrderStatus;
    },
    totalpage() {
      if (this.totals) {
        return (
          parseInt(this.totals / this.PostData.Rows) +
          (this.totals % this.PostData.Rows > 0 ? 1 : 0)
        );
      } else return 0;
    }
  },
  methods: {
    init: function(page) {
      var vm = this;
      if (page && page >= 1) {
        vm.PostData.Page = page;
      }
      Util.post("api/Order/GetOrders", vm.PostData, vm, function(res, data) {
        let notid = [];
        if (res === "1") {
          vm.result = data.data;
          vm.totals = data.totalCount;
          console.log(vm.result);
        } else {
        }
      });
    },
    confirmOrder: function(orderid) {
      var vm = this;
      this.$layer.confirm("是否确认收货？", { btn: ["确定", "取消"] }, function(
        index
      ) {
        vm.confirmfun(orderid);
        vm.$layer.closeAll();
      });
    },
    confirmfun: function(orderid) {
      var vm = this;
      Util.post(
        "api/Order/MembeConfirmOrder",
        { OrderId: orderid },
        vm,
        function(res, data) {
          let notid = [];
          if (res === "1") {
            vm.$layer.msg("确定收货成功");
            vm.init();
          } else {
            vm.$layer.msg(data);
          }
        }
      );
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    nowstatus() {
      this.PostData.Page = 1;
      this.init();
    }
  },
  filters: {
    formatDate: function(time) {
      return Util.formatDate(time, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

