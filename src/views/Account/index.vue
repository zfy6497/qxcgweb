<template>
	<div class="ct clearfix">
		<div class="news-leader">当前位置：个人中心</div>
		<div class="news-content">
			<div class="person-left fl">
				<UserLeft></UserLeft>
			</div>

			<div class="person-item usermanage">
				<h4>账号管理</h4>
				<div class="userpicBox" v-for="item in result" :key="item.UserName">
					<div class="userpic"><img :src="item.Photo" alt="">
						<p>{{item.Nick}}</p>
					</div>
				</div>
				<a href="javascript:;" class="quit" @click="loginout">退出当前账号</a>
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
  data() {
    return {
		result:[]
	};
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("api/Account/GetList", {}, vm, function(res, data) {
        if (res === "1") {
          vm.result = data.data;
        } else {
        }
      });
	},
	loginout:function(){
		 this.$store.commit("logout", this);
        this.$router.push({
          name: "home"
        });
	}
  },
  mounted() {
	  this.init();
  }
};
</script>


