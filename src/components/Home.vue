<!--  -->
<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/1234.png" class="home_img" />
        <span>物资管理系统</span>
      </div>
      <el-button type="primary" @click="quit">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠菜单栏按钮 -->
        <div class="aside_button" @click="asideCollapse">|||||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconObj: {
        125: "el-icon-user-solid",
        103: "el-icon-s-platform",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-data",
      },
      isCollapse: false,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getMenuList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 退出
    quit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取菜单数据
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      // console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      // console.log(this.menulist);
    },
    // 折叠菜单栏事件
    asideCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.home_container {
  height: 100%;
}
.home_img {
  height: 8vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  // flex的弹性布局
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  // 优化菜单栏边框溢出
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.aside_button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>