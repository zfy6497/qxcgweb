<template>
    <div>
        <phswiper :img-list="img" :height="300"></phswiper>
        <p>index1</p>
    </div>

</template>
<script>
import phswiper from "./components/phswiper";
import axios from "axios";

import Util from "../libs/util.js";
export default {
  name: "App",
  data(){
      return{
          img:[]
      }
  },
  components:{
      phswiper
  }
  ,
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      //   axios.create({
      //     baseURL: 'http://43.247.89.26:8700',
      //     timeout: 30000,
      //     headers: {
      //       "Content-Type": "application/json; charset=urf-8"
      //     }
      //   }).post('Pc/PcHome/GetDatas', {}).then(function (res) {

      //   });

      var vm = this;
      Util.post("Pc/PcHome/GetDatas", {}, vm, function(res, data) {
        if (res === "1") {
            vm.img=data.data.SlideImgs;

        } else {
        }
      });
    }
  }
};
</script>

