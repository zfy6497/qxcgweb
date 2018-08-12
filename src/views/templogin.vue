<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <div class="form-con">
                    <input  v-model="userName" type="text"  placeholder="请输入用户名" />{{userName}}
                    <input type="password" v-model="password" placeholder="请输入密码" />
                    <Button @click="handleSubmit" type="primary" >登录</Button>
                    <p class="login-tip">输入任意用户名和密码即可</p>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import md5 from "js-md5";
import Util from "../libs/util";
export default {
  name: "app",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      let t1 = {
        UserName: this.userName,
        PassWord: md5(this.password),
        CheckCode: "",
        AutoLogin: "1"
      };
      let vm=this;
      let loginurl = "/api/User/UserLogin";
      console.log(t1);
      t1["Sign"] = Util.createsign(t1, this.$store.state.app.mmkey);
      Util.ajax
        .post(loginurl, t1)
        .then(res => {
          var data = res.data;
          if (data.resultCode == "0") {
            console.log(data);
            Cookies.set("qxweb_name", this.userName, { expires: 30});
            Cookies.set("qxweb_token", data.data.Token, { expires: 30 });
            Cookies.set("qxweb_mmnum", data.data.MemberID, { expires: 30 });
            Cookies.set("qxweb_photo", data.data.Photo, { expires: 30 });
            vm.$store.commit("loginin", {
              token: data.data.Token,
              id: data.data.MemberID,
              name:vm.userName,
              photo:data.data.Photo
            });
            vm.$router.push({ name: "home" }); //店长登录首页可修改
          } else {
            vm.$layer.msg(data.message);
          }
        })
        .catch(error => {
          this.$layer.msg("请求错误");
        });
    }
  },
  mounted() {}
};
</script>