<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from "vue";
import layer from "vue-layer";
import Cookies from "js-cookie";

Vue.prototype.$layer = layer(Vue);
export default {
  name: "App",
  methods: {
    init() {
  
      this.$store.commit("loginin", {
        token: Cookies.get("qxweb_token"),
        id: Cookies.get("qxweb_mmnum"),
        name:Cookies.get("qxweb_name"),
        photo:Cookies.get("qxweb_photo")
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
