<template>
  <el-container class="container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo" :class="{current:isCollapse}"></div>
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="my_menu"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggle"></span>
        <span class="text">传智播客什么什么公司来的？</span>
        <el-dropdown class="my_dropdown">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" style="width:30px;vertical-align:middle" />
            web前端吊车尾
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggle () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  .el-header {
    width: 100%;
    height: 60px;
    line-height: 54px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
    .my_dropdown {
      float: right;
    }
  }
  .el-aside {
    width: 200px;
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: url(../../assets/images/logo_admin.png) no-repeat center/140px;
    }
    .current {
      background: url(../../assets/images/logo_admin_01.png) no-repeat
        center/36px;
    }
    .my_menu {
      border-right: 0;
    }
  }
}
</style>
