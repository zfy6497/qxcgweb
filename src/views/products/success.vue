<template>
    <div class="mt-ct">
        <div class="order-main clearfix">

            <div class="orderbox">
                <div class="putimg"><img class="orderpic" src="/static/images/temp/putsuccess.png" alt="">订单提交成功</div>
                <div class="order">
                    <ul>
                        <li>
                            <em>订单编号：</em>{{result.Id}}</li>
                        <li>
                            <em>交易时间：</em>{{result.OrderDate | formatDate}}</li>
                        <li>
                            <em>订单金额：</em>￥{{result.OrderAmountRedundancy}}</li>
                        <li>
                            <em>订单状态：</em>提交成功</li>
                    </ul>
                </div>
                <div class="orderselect">
                    <router-link class="blu" to="/">继续购物</router-link>
                    <router-link  to="/userorders">我的订单</router-link>
                </div>
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
  components: {
    UserLeft,
    page
  },
  computed: {
    totalpage() {
      if (this.totals) {
        return (
          parseInt(this.totals / this.postdata.Row) +
          (this.totals % this.postdata.Row > 0 ? 1 : 0)
        );
      } else return 0;
    }
  },
  data() {
    return {
      id:this.$route.params.id,
      result: [],
      totals: 0
    };
  },
  methods: {
    init: function(page) {
      let vm = this;
      Util.post("api/Order/GetModel", {OrderId:vm.id}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
    }
  },
  mounted() {
    this.init();
  },
  filters: {
    formatDate(date) {
      return Util.formatDateFull(date);
    }
  }
};
</script>
