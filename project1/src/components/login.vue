<template>

  <div class="login_container">
    <div class="Box">
      <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/logo.png">
        </div>
        <div class="form_class">
          <el-form>
            <!-- 用户 -->
            <el-form-item prop="username" label="用户名:">
              <el-input v-model="regFrom.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码:">
              <el-input v-model="regFrom.password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button type="primary" @click="postMessage()">登录</el-button>
              <el-button type="info">注册</el-button>
            </el-form-item>
          </el-form>
         </div>
      </div>
    </div>
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
        await this.$axios.post("user/login.php",stringify(this.regFrom)).then(result=>{
          console.log(result.data);
          if(result.data=='200'){
            console.log('aaaa');
            this.VuexFunction(this.regFrom.username);
            sessionStorage.setItem("token",this.$store.state.loginUser);
            this.$router.push("/index");
          }
        })
      }
    },
    computed:{
      ...mapState(['loginUser'])
    }
  }
</script>

<style lang="less" scoped>
  .login_container{
    background-color: #006666;
    height: 100%;
    display: flex;
    align-items: center;       /*垂直居中*/
    justify-content: center;   /*水平居中*/
  }
  .Box{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login_box{
    width: 450px;
    height: 450px;
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    flex-wrap:wrap;
    -webkit-box-shadow:0 0 10px green;
  }
  .avatar_box{
    width: 100%;
    height: 30%;
    border-radius: 50%;
    text-align: center;
    padding: 1%;
  }
  .avatar_box img{
      width: 30%;
      height: 100%;
      border-radius: 50%;
      border: green solid 1px;
      padding: 1%;
      -webkit-box-shadow:0 0 10px green;
  }
  .form_class{
    width: 100%;
    height: 50%;
    padding: 0 10%;
  }
  .btns{
    display: flex;
    justify-content: center;
  }
</style>
