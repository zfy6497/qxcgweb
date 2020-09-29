<template>
    <div>

        <h4>我的医疗</h4>
        <ul class="person-nav">
            <li :class="path==item.url?'active':''" v-for="item in navs" :key="item.name">
                   <router-link :to="item.url"  >{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
  name: "App",
  components:{
  },
  data() {
    return {
      path: this.$route.path,
      navs: [
        { url: "/userorders", name: "我的订单" },
        { url: "/integral", name: "我的积分" },
         { url: "/integralorders", name: "积分订单" },
        { url: "/userreckoning", name: "我的账单" },
        { url: "/account", name: "账号管理" },
        { url: "/collectionproduct", name: "我的收藏" }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
    }
  }
};
</script>

