<template>
  <el-container class="homeHieght">
    <el-header height="15vh">
      <HeaderComponent :username="loginUsername"></HeaderComponent>
    </el-header>
    <el-container>
      <el-aside width="15%">
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-s-order"></i>
            <span>
              <router-link :to="{name:'fatherPlate'}">父板块列表</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-circle-plus"></i>
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
            <i class="el-icon-bottom"></i>
            <span slot="title">
              <router-link :to="{name:'sonPlate'}">子版块列表</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-edit"></i>
            <span slot="title">
              <router-link :to="{name:'publish'}">发布文章吧</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">
              <router-link :to="{name:'allArticle'}">总文章管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-picture"></i>
            <span slot="title">
              <router-link :to="{name:'banner'}">管理轮播图</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-thumb"></i>
            <span slot="title">
              <router-link :to="{name:'recommend'}">推荐--文章</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="9">
            <i class="el-icon-thumb"></i>
            <span slot="title">
              <router-link :to="{name:'evaluate'}">管理--评论</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="10">
            <i class="el-icon-thumb"></i>
            <span slot="title">
              <router-link :to="{name:'contact'}">管理--留言</router-link>
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
    overflow: hidden;
    margin: 0; padding: 0;
  }

  .el-header,
  .el-footer {
    background-color: #003366;
    color: white;
    text-align: center;
  }

  .el-aside {
    background-color: #003366;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  .el-menu-item,
  .el-submenu {
    background-color: #003366;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: 1000;
  }

  .el-header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
</style>
