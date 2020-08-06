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
      <el-form-item label="选择图片" class="file">
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
        await this.$axios.get("admin/son_module.php").then(result=>{
          this.options = result.data;
        })
        // this.publishFrom.member = this.$store.state.loginUser;     //可以换成去浏览器去拿
        this.publishFrom.member = sessionStorage.getItem('token');  //获取登录的用户名
      },

      //发布文章具体内容
      async postContent(){
        let oForm = document.getElementById('form1');
        let formData = new FormData(oForm);

        formData.append('file',this.publishFrom.filename);
        formData.append('sonModuleId',this.publishFrom.sonModuleId);
        formData.append('title',this.publishFrom.title);
        formData.append('content',this.publishFrom.content);
        formData.append('member',this.publishFrom.member);
        await this.$axios.post("admin/upload.php",formData).then(result=>{
           if(result.data=='200'){
             this.$message({
               message:'发布成功',
               type:'success'
             })
           }
           this.publishFrom.content = '';
           this.publishFrom.title = '';
           this.publishFrom.sonModuleId = '';
        })
      }
    }
  }
</script>

<style scoped>
  .el-input{width: 300px;}
  .title{height: 50px; background-color: #CCCCCC; display: flex; align-items: center;}
  .file {
      position: relative;
      display: inline-block;
      background: #D0EEFF;
      border: 1px solid #99D3F5;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      color: #1E88C7;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
  }
  .file input {
      position: absolute;
      font-size: 50px;
      right: 0;
      top: 0;
      opacity: 0;
  }
  .file:hover {
      background: #AADFFD;
      border-color: #78C3F3;
      color: #004974;
      text-decoration: none;
  }
</style>
