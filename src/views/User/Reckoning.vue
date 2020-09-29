<template>
	<div class="ct clearfix">
		<div class="news-leader">当前位置：我的医疗</div>
		<div class="news-content">
			<div class="person-left fl">
				<UserLeft></UserLeft>
			</div>

			<div class="person-item">
				<div class="debt">我的账单</div>
				<div class="debtBox">
					<ul v-if="result">
						<li class="debtOrder">
							<p>单据编号</p>
							<p>开票日期</p>
							<p>开票金额</p>
							<p>付款情况</p>
						</li>
						<li v-for="item in result" :key="item.Id">
							<p>{{item.BId}}</p>
							<p>{{item.MakeDate | formatDate}}</p>
							<p>{{item.BMoney}}元</p>
							<p>{{item.StatusStr}}</p>

						</li>
						
					</ul>
					<page :count-page="totalpage" @search="init"></page>
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
      postdata: {
        Page: 1,
        Row: 20
      },
      result: [],
      totals: 0
    };
  },
  methods: {
    init: function(page) {
      let vm = this;
      if (page) {
        vm.postdata.Page = page;
      }
      Util.post("api/MyBill/GetList", vm.postdata, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
          vm.totals = data.totalCount;
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
      return Util.formatDate(date);
    }
  }
};
</script>
