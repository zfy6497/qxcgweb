<style>
.zhezhao {
  width: 100%;
  height: 100%;
  background-color: #000;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
  position: absolute;
  left: 0px;
  top: 0px;

  z-index: 1000;
}
</style>

<template>
  <div>

    <div class="showfrom" v-if="issuccess">

      <div class="close" @click="issuccess=false"></div>
      <div class="s-top">
        <p class="f-16">Hi,{{username}}，您已登录医疗器械，请填写信息。</p>
        <p>若已填写，请等待后台审核，详情请咨询客服热线：400-185-8586</p>
      </div>
      <div class="s-list">
        <dl>
          <dt>企业类型：</dt>
          <dd>
            <div class="sel-inp show-sel" @click="showtype=!showtype">{{checktypename}}</div>
            <div class="sel-box" v-if="showtype">
              <a href="javascript:" v-for="item in companytypes" :key="item.TypeId" @click="checktypefun(item.TypeId,item.TypeName)">{{item.TypeName}}</a>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>联系人姓名：</dt>
          <dd>
            <input type="text" class="sel-inp" name="" id="" v-model="linkname" />
          </dd>
        </dl>
        <dl>
          <dt>手机号码：</dt>
          <dd>
            <input type="text" class="sel-inp" name="" v-model="phone" />
          </dd>
        </dl>
        <dl>
          <a style="color:#fff;margin-left: 175px;margin-top: 8px;" href="javascript:" class="d-buycart-btn" @click="save">提 交</a>
        </dl>
      </div>
    </div>
  </div>

</template>
<script>
import Util from "../../libs/util.js";
import Cookies from "js-cookie";
export default {
  name: "App",
  data() {
    return {
      issuccess: false,
      showtype: false,
      companytypes: [
        { TypeId: 0, TypeName: "医疗器械经营企业（含药品类企业）" },
        { TypeId: 1, TypeName: "医疗器械专卖店（含药店）" },
        { TypeId: 2, TypeName: "医疗机构" }
      ],
      checktypeid: 0,
      checktypename: "医疗器械经营企业（含药品类企业）",
      linkname: "",
      phone: "",
      username: this.$store.state.user.name || ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    checktypefun: function(typeid, typename) {
      this.checktypeid = typeid;
      this.showtype = false;
      this.checktypename = typename;
    },
    init: function() {
      let isadd = Cookies.get("qxweb_addconsults");
      if (isadd && isadd == "1") {
        return;
      }
      let vm = this;
      Util.post("/api/Consults/IsShowTips", {}, vm, function(res, data) {
        if (res === "1") {
          if (data.data) {
            vm.issuccess = true;
          }else{
              vm.issuccess = false;
          }
        } else {
          vm.issuccess = false;
        }
      });
    },
    save: function() {
      let vm = this;
      if (!vm.linkname) {
        vm.$layer.msg("请输入联系人");
        return;
      }
      if (!vm.phone) {
        vm.$layer.msg("请输入手机号码");
        return;
      }
      if (!Util.istel(vm.phone)) {
        vm.$layer.msg("请输入正确手机号码");
        return;
      }
      Util.post(
        "/api/Consults/Save",
        { CompanyType: vm.checktypeid, LinkName: vm.linkname, Phone: vm.phone },
        vm,
        function(res, data) {
          if (res === "1") {
            Cookies.set("qxweb_addconsults", "1", {
              expires: 7
            });
            vm.$layer.msg("提交成功");
            vm.issuccess = false;
          } else {
            vm.$layer.msg(data);
          }
        }
      );
    }
  }
};
</script>

