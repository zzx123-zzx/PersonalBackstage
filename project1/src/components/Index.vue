<template>
  <el-container class="homeHieght">
    <el-header height="15vh">
      <HeaderComponent :username="loginUsername"></HeaderComponent>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span>
              <router-link :to="{name:'fatherPlate'}">父板块列表</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link :to="{name:'fatherModuleAdd'}">添加父板块</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">
              <router-link :to="{name:'sonModuleAdd'}">添加子版块</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">
              <router-link :to="{name:'sonPlate'}">子版块列表</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">
              <router-link :to="{name:'publish'}">发布文章吧</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">
              <router-link :to="{name:'banner'}">管理轮播图</router-link>
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {
    stringify
  } from 'querystring';

  import HeaderComponent from './header.vue';
  export default {

    name: 'HelloWorld',
    data() {
      return {
        form: {
          name: ''
        },
        loginUsername: ''
      }
    },
    created() {
      this.getVuexData();
    },
    methods: {
      getVuexData() {
        this.loginUsername = sessionStorage.getItem('token');
      }
    },
    components:{
      HeaderComponent       //给子标题的子组件传值，传的是当前登录的用户
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .homeHieght {
    height: 100vh;
  }

  .el-header,
  .el-footer {
    background-color: #003371;
    color: white;
    text-align: center;
  }

  .el-aside {
    background-color: #003371;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  .el-menu-item,
  .el-submenu {
    background-color: #003371;
  }

  a {
    color: white;
  }

  .el-header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
</style>
