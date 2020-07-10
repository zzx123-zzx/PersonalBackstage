<template>
  <div>
    <el-form :model="regFrom" ref="regFrom" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="regFrom.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="regFrom.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="regFrom.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postMessage">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        regFrom:{
          username:'',
          password:'',
          confirmPassword:''
        }
      }
    },
    methods:{
      async postMessage(){
        await this.$axios.post("http://localhost/php/sfkbbs/user/register.php",stringify(this.regFrom)).then(result=>{
          console.log(result.data);
        })
      }
    }
  }
</script>

<style>
</style>
