<template>
  <div>
    <el-form :model="regFrom" ref="regFrom" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="regFrom.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="regFrom.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postMessage">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState,mapActions,mapGetters} from 'vuex';
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        regFrom:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      ...mapActions(['VuexFunction']),
      async postMessage(){
        await this.$axios.post("http://localhost/php/sfkbbs/user/login.php",stringify(this.regFrom)).then(result=>{
          console.log(result.data);
          if(result.data=='200'){
            console.log('aaaa');
            sessionStorage.setItem("token",result.data.token);
            this.$router.push("/index");
            this.VuexFunction(this.regFrom.username);
          }
        })
      }
    },
    computed:{
      ...mapState(['loginUser'])
    }
  }
</script>

<style>
</style>
