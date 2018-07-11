<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from "vue";
import layer from "vue-layer";
import Cookies from "js-cookie";
Vue.prototype.$layer = layer(Vue);
export default {
  name: "App",
  methods: {
    init() {
      this.userName = Cookies.get("user");
      this.$store.commit("loginin", {
        token: Cookies.get("token"),
        id: Cookies.get("mmnum")
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
