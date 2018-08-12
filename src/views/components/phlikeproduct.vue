<template>

    <div v-if="productList && productList.length>0">
        <router-link  v-for="item in productList" :key="item.SkuId" :to="'/pdetail/'+item.SkuId">
            <span class="pic"><img class="image178" :src="item.ImageUrl_200" /></span>
            <span class="price">¥{{item.ShowPrice}}</span>
            <div class=" skuname">{{item.SkuName}}</div>
            <div class="name ell2">{{item.ProductName}}</div>
        </router-link>
    </div>

</template>
<script>
import Util from "../../libs/util.js";
export default {
  name: "App",
  data() {
    return {};
  },
  props: {
    productList: {
      type: Array
    }
  },
  methods: {},
  mounted() {}
};
</script>

