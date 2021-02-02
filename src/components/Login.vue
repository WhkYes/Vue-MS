<!-- 登录组件 -->
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 图标 -->
      <div class="login_logo">
        <img src="../assets/点赞哥.jpg" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form
        label-width="70px"
        class="login_form"
        label-position="top"
        :model="loginFrom"
        :rules="loginFromRules"
        ref="loginFromRef"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名:" prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginFrom.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginFrom.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="buttons">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginFrom: {
        username: "admin",
        password: "123456",
      },
      // 登录表单的验证规则对象
      loginFromRules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    resetLoginFrom() {
      // 表单重置。resetFields()需要操作表单的实例对象
      this.$refs.loginFromRef.resetFields();
    },
    login() {
      // 1. 表单登录前进行预校验。validate()参数为回调函数，该回调函数会在校验后被调用
      this.$refs.loginFromRef.validate(async (valid) => {
        // console.log(valid);
        // 1.1 如果校验不通过，直接返回
        if (!valid) return;

        // 2. 通过axios发起post请求获取数据
        const { data: res } = await this.$http.post("login", this.loginFrom);
        console.log(res);

        // 3. 如果状态码是200，即登陆成功
        if (res.meta.status != 200) return this.$message.error("登录失败");
        this.$message.success("登陆成功");

        // 4. 登录成功后返回的数据中包含token，要保存到客户端的sessionStorage中
        // 4.1 项目其它API接口必须要在登录后才可使用
        // 4.2 token只在当前网页打开时生效，所以要保存在sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);

        // 5. 跳转到后台主页，路由地址是 /home
        this.$router.push("/home");

        //
      });
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.login_container {
  background-color: gray;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_logo {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  // 圆角
  border-radius: 50%;
  padding: 10px;
  //边框阴影
  box-shadow: 0 0 10px rgb(182, 66, 66);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    // 圆角
    border-radius: 50%;
    background-color: #eee;
  }
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>