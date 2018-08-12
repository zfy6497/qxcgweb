<template>
    <div id="pagin-btm" class="page_area" v-if="countPage>0">
       <a class="" v-if=" nowPage>1"  href="javascript:;" @click="nowPage-=1">上一页</a> <a class=""  v-if="nowPage<=1">上一页</a>
        <a :class="item==nowPage?'page_select':''" href="javascript:;"  @click="nowPage=item" v-for="item in numcount1" :key="item">{{item}}</a><span class="text" v-if="isshowtxt1">...</span>
        <a :class="item==nowPage?'page_select':''" href="javascript:;" v-if="numcount2 && numcount2.length>0"  @click="nowPage=item" v-for="item in numcount2" :key="item">{{item}}</a><span v-if="isshowtxt2" class="text">...</span>
        <a :class="item==nowPage?'page_select':''" href="javascript:;" v-if="numcount3 && numcount3.length>0"  @click="nowPage=item" v-for="item in numcount3" :key="item">{{item}}</a>
        <a href="javascript:;" v-if="nowPage<countPage" @click="nowPage+=1">下一页</a><a v-if="nowPage>=countPage">下一页</a>
      <span class="page-skip">
          <em>&nbsp;&nbsp;共 </em><em id="pageCount">{{countPage}}</em><em>页
           到第</em><input class="jumpto" type="number" value="1" id="jumpInput" v-model="gopagenum" :max="countPage" min="1"><em>页</em>
            <a class="btn-skipsearch" id="pageJump" href="javascript:;" @click="gopage">确定</a>
     </span></div>
</template>
<script>
export default {
  name: "App",
  props: {
    countPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    numcount1: function() {
      let vm = this;
      if (vm.countPage <= 8) {
        return vm.countPage;
      }
      if (vm.nowPage < 7) {
        return 7;
      } else {
        return 2;
      }
    },
    isshowtxt1: function() {
      return this.nowPage >= 7 && this.countPage > 8 ? true : false;
    },
    numcount2: function() {
      let vm = this;
      if (vm.nowPage >= 7 && vm.countPage > 8 && vm.countPage - 4 > vm.nowPage) {
        return [
          vm.nowPage - 2,
          vm.nowPage - 1,
          vm.nowPage,
          vm.nowPage + 1,
          vm.nowPage + 2
        ];
      } else {
        return [];
      }
    },
    isshowtxt2: function() {
      let vm = this;
      return vm.countPage > 8 ? true : false;
    },
    numcount3: function() {
      let vm = this;
      if (vm.countPage > 8) {
        if (vm.countPage - 4 < vm.nowPage) {
            return [vm.countPage-4,vm.countPage-3,vm.countPage -2,vm.countPage -1,vm.countPage ]

        } else {
            return [vm.countPage ]
        }
      } else {
        return [];
      }
    }
  },
  data() {
    return {
        gopagenum:1,
        nowPage:1
    };
  },
  methods: {
    gonext: function(isnext) {
      if (isnext) {
      }
    },
    gopage:function(){
       if(this.gopagenum<=0){
           this.nowPage=1;
           return;
       }
       if(this.gopagenum>this.countPage){
           this.nowPage=this.countPage;
           return;
       }
       this.nowPage=this.gopagenum?this.gopagenum:1;
    }
  },
  watch:{
      nowPage:function(val,oldvalue){
           this.$emit("search", val);
      }
  }
};
</script>

