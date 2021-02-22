
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 使用element.js 中表单组件 -->
      <el-form :model="loginForm" :rules="rules" ref="a" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="用户名" prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-paperclip"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row :span="24">
            <el-col :span="12">
              <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" size></el-input>
            </el-col>
            <el-col :span="12">
              <div class="login-code" @click="refreshCode">
                <!--验证码组件-->
                <SIdentify :identifyCode="identifyCode"></SIdentify>
              </div>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm('a')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from "@/components/SIdentify";

export default {
  name: "Login",
  components: {
    SIdentify
  },
  data() {
    return {
      //登录表单的数据对象
      loginForm: {
        username: "",
        password: "",
        code: ""
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      //表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 初始化验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  created() {
    this.refreshCode();
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$refs.a.validate(async valid => {
        console.log(valid);
        //没通过表单验证
        if (!valid) {
          return;
        }
        console.log("code", this.loginForm.code);
        console.log("vcode", this.identifyCode);
        if (this.loginForm.code == "") {
          alert("请输入验证码");
          return;
        }
        if (this.identifyCode !== this.loginForm.code) {
          this.code = "";
          this.refreshCode();
          alert("请输入正确的验证码");
          return;
        }
        //通过表单验证
        const { data: res } = await this.$http.post("login", this.loginForm);

        if (res.meta.status != 200) {
          //console.log(res);
          this.$message.error("登陆失败");
          return;
        }
        //console.log(res.data.token);
        window.sessionStorage.setItem("token", res.data.token);
        this.$message.success("登录成功");
        //将登陆成功后的token 保存在客户端得sessionStorage 中
        //登陆成功了 才可以访问后台api
        // token只在当前网站打开时候生效,所以存在sessionStorage中 (localStorage为持久化存储)
        // 然后跳转 主页面 /home
        //路由跳转
        this.$router.push("/home");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
