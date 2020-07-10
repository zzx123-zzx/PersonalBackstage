<template>
<el-container class="homeHieght">
  <el-header>{{loginUsername}}</el-header>
  <el-container>
    <el-aside width="200px">
          <el-menu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span><router-link :to="{name:'fatherPlate'}">父板块列表</router-link></span>
              </template>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link :to="{name:'fatherModuleAdd'}">添加父板块</router-link></span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title"><router-link :to="{name:'sonModuleAdd'}">添加子版块</router-link></span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title"><router-link :to="{name:'sonPlate'}">子版块列表</router-link></span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title"><router-link :to="{name:'publish'}">发布文章</router-link></span>
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
import {stringify} from 'querystring';
export default {

  name: 'HelloWorld',
  data () {
    return {
      form: {
       name: '',
       date1: '',
       date2: '',
       desc: ''
     },
     loginUsername:''
    }
  },
  created(){
    this.getVuexData();
  },
  methods:{
    getVuexData(){
      this.loginUsername = this.$store.state.loginUser;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .homeHieght{
      height: 100vh;
    }

    .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
    }

    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
    }
</style>
