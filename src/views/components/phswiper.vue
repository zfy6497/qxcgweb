<template>
  <div class="scroll">
    <swiper :options="swiperOption" ref="mySwiper" :style="'width:'+width+'px;'">
      <swiper-slide v-for="item in imgList" :key="item.Id">
        <a :href="item.Url" target="_blank"><img :src="item.ImageUrl" /></a>
         	<!-- <router-link :to="item.Url"  ><img :src="item.ImageUrl" /></router-link> -->
      </swiper-slide>
      <div class="swiper-scrollbar"></div>
      <!-- ////滚动条 -->
      <div class="swiper-button-next"></div>
      <!-- ////下一项 -->
      <div class="swiper-button-prev"></div>
      <!-- ////上一项 -->
      <div class="swiper-pagination"></div>
      <!-- ////标页码 -->
    </swiper>
  </div>

</template>
<script>
import "swiper/dist/css/swiper.css"; ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "App",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: true,
        // autoplay: {
        //     delay: 3000,
        //     stopOnLastSlide: false,
        //     disableOnInteraction: true,
        // },
        // 设置轮播
        effect: "flip",
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        // grabCursor : true,
        //滑动之后回调函数
        on: {
          slideChangeTransitionEnd: function() {}
        },
        //左右点击
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        paginationClickable: true,
        reverseDirection: true, //开启反向自动轮播。
        autoplayStopOnLast: false, //当切换到最后一个slide时停止自动切换,
        autoplayDisableOnInteraction:false,


      }
    };
  },
  props: {
    imgList: {
      type: Array
    },
    height:{
      type:Number,
      default:460
    },
    width:{
      type:Number,
      default:740
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.swiper-slide {

}
</style>