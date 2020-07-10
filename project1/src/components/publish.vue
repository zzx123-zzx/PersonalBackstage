<!-- 发帖组件 -->
<template>
  <div>
    <form id="form1">
    <el-form :model="publishFrom" ref="updateFrom" label-width="80px">
      <el-form-item label="所属版块">
        <el-select v-model="publishFrom.sonModuleId">
          <el-option v-for="item in options" :key="item.id" :value="item.id" :label="item.module_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入标题">
        <el-input v-model="publishFrom.title"></el-input>
      </el-form-item>
      <el-form-item label="请选择图片">
        <input type="file" v-on:change="onChange($event)" id="file" value="">
      </el-form-item>
      <el-form-item label="编写内容">
        <el-input type="textarea" rows="10" v-model="publishFrom.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postContent">立即发布</el-button>
      </el-form-item>
    </el-form>
    </form>
  </div>
</template>
<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        publishFrom:{
          sonModuleId:'',                //子版块id
          title:'',                      //帖子标题
          content:'',                    //帖子内容
          member:'',
          filename:''
        },                                //数据库中的member_id,版主
        options:[]
      }
    },
    async created(){
      this.getSonModule();
    },
    methods:{
      onChange: function (event) {
      	this.publishFrom.filename = event.target.files[0]; // get input file object
        console.log(this.publishFrom.filename);
      },
      async getSonModule(){
        await this.$axios.get("http://localhost/php/sfkbbs/admin/son_module.php").then(result=>{
          this.options = result.data;
        })
        this.publishFrom.member = this.$store.state.loginUser;     //可以换成去浏览器去拿
      },
      async postContent(){
        let oForm = document.getElementById('form1');
        let formData = new FormData(oForm);

        formData.append('file',this.publishFrom.filename);
        formData.append('sonModuleId',this.publishFrom.sonModuleId);
        formData.append('title',this.publishFrom.title);
        formData.append('content',this.publishFrom.content);
        formData.append('member',this.publishFrom.member);
        await this.$axios.post("http://localhost/php/sfkbbs/admin/upload.php",formData).then(result=>{
          console.log(result.data);
        })
      }
      //发布帖子内容
      // async postContent(){
      //   await this.$axios.post("http://localhost/php/sfkbbs/user/publish.php",stringify(this.publishFrom)).then(result=>{
      //     console.log(result.data);
      //   })
      // }
    }
  }
</script>

<style scoped>
  .el-input{width: 300px;}
  .title{height: 50px; background-color: #CCCCCC; display: flex; align-items: center;}
</style>
