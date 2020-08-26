<template>
  <div>
    <el-form :model="sonForm" ref="sonForm" label-width="80px" id="form1">
      <el-form-item label="所属版块">
        <el-select v-model="sonForm.fatherModuleId" placeholder="请选择">
          <!-- 表面上是选名字，其实提交过去的是id值 -->
          <el-option v-for="item in options" :key="item.value" :value="item.id" :label="item.module_name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版块名称">
        <el-input v-model="sonForm.sonMoudleName"></el-input>
      </el-form-item>
      <el-form-item label="选择图片" class="file">
        <input type="file" v-on:change="onChange($event)"/>
      </el-form-item>
      <el-form-item :label='filename' style="background-color: red;text-align: left;" label-width="auto">
        <!-- <i class="el-alert--error"></i> -->
      </el-form-item>
      <el-form-item label="简介内容">
        <textarea v-model="sonForm.info" rows="10" style="width: 500px;"></textarea>
      </el-form-item>
      <el-form-item label="版块排序">
        <el-input v-model="sonForm.sonModuleSort"></el-input>
      </el-form-item>
      <el-form-item label="选择版主">
        <el-select v-model="sonForm.memberId" placeholder="请选择">
           <el-option v-for="item in memBerOptions" :key="item.value" :label="item.label" :value="item.value">
           </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :plain="true" type="primary" @click="onsumbit">立即提交</el-button>
        <!-- <router-link :to="{name:'fatherPlate'}">返回</router-link> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        sonForm:{
          sonMoudleName:'',
          sonModuleSort:'',
          fatherModuleId:'',
          info:'',
          memberId:'',
          src:''
        },
        filename:'',
        options:[],
        memBerOptions:[
          {
            value:'0',
            label:'会员'
          }
        ]
      }
    },
    async created(){
      this.getFather()
    },
    methods:{
     onChange(event){
       this.sonForm.src = event.target.files[0];
       this.filename = '图片名称:'+event.target.files[0].name;
     },
     async onsumbit(){
       let oForm = document.getElementById('form1');
       let formData = new FormData(oForm);

       formData.append('file',this.sonForm.src);
       formData.append('fatherModuleId',this.sonForm.fatherModuleId);
       formData.append('sonMoudleName',this.sonForm.sonMoudleName);
       formData.append('info',this.sonForm.info);
       formData.append('memberId',this.sonForm.memberId);
       formData.append('sonModuleSort',this.sonForm.sonModuleSort);
       await this.$axios.post("admin/son_module_add2.php",formData).then(result=>{
          if(result.data =='200'){
            this.$message({
              showClose:'true',
              message:'恭喜你，添加成功',
              type:'success'
            })
          }
          console.log(result.data);
        });
      },
      //获取所有父版块
      async getFather(){
        await this.$axios.get("admin/son_module_add.php").then(result=>{
          this.options = result.data;
          // console.log(result.data);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
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
