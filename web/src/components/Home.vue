<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/image/1.jpg" style="width:60px;height:61px" /><span
          >各种管理系统</span
        >
      </div>
      <el-button type="info" @click="logout()">退出</el-button></el-header
    >
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="flag ? '64px' : '200px'">
        <!-- 侧边栏菜单区 -->
        <div class="zhedie" @click="zhedie()">|||</div>
        <el-menu
          background-color="#d3dce6"
          :default-active="activepath"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="flag"
          :collapse-transition="false"
          :router="true"
        >
          <!-- 一级菜单 -->
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            二级菜单
            <el-menu-item index="1">
              <span style="margin-left:30px">选项一</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            v-bind:key="item.id"
          >
            <template slot="title">
              <i :class="icon[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <el-menu-item
              :index="'/' + c.path"
              v-for="c in item.children"
              v-bind:key="c.id"
              @click="saveNavState('/' + c.path)"
            >
              <span style="margin-left:30px">{{ c.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      icon: {
        125: "el-icon-platform-eleme",
        103: "el-icon-user-solid",
        101: "el-icon-star-on",
        102: "el-icon-question",
        145: "el-icon-zoom-in"
      },
      flag: false,
      activepath: ""
    };
  },
  //生命周期函数 去后台拿所有左菜单
  created() {
    this.getMenuList();
    this.activepath = window.sessionStorage.getItem("navpath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status != 200) {
        this.$message.error(res.meta.msg);
        return;
      }
      this.menuList = res.data;
    },
    //折叠 与展开
    zhedie() {
      this.flag = !this.flag;
    },
    saveNavState(nav_path) {
      window.sessionStorage.setItem("navpath", nav_path);
    }
  }
};
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.zhedie {
  background-color: #d3dce6;
  color: #333;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;
}
.el-menu-vertical-demo {
  border-right: 0px;
}
</style>
