<template>
  <div>
    <div class="title">修改父版块---{{module_name}}</div>
    <el-form :model="updateFrom" :rules="rules" ref="updateFrom" label-width="80px">
      <el-form-item label="版块名称" prop="newModuleName">
        <el-input v-model="updateFrom.newModuleName" :placeholder="module_name"></el-input>
      </el-form-item>
      <el-form-item label="版块排序">
        <el-input v-model="updateFrom.newModuleSort" :placeholder="module_sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :plain="true" type="primary" @click="onSubmit">立即修改</el-button>
        <router-link :to="{name:'fatherPlate'}">返回</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {stringify} from 'querystring';

 export default{
   data(){
     return {
       updateFrom:{
         id: this.$route.params.id,
         newModuleName:'',
         newModuleSort:''
       },
       rules:{
         //版块内容验证
         newModuleName: [
             { required: true, message: '版块内容不能为空', trigger: 'blur' },
             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
         ]
       },
       module_name:'',                     //版块名称
       module_sort:''
     }
   },
   async created(){
     this.getPlate()
   },
   methods:{
     //提交表单
     async onSubmit(){
       if(this.updateFrom.newModuleName==''){
          this.$message({
            showClose:true,
            message:'修改内容不能为空',
            type:'error'
          })
          return;
       }

       await this.$axios.post("admin/father_module_update.php",stringify(this.updateFrom)).then(result=>{
          if(result.data =='200'){
            this.$message({
                      showClose: true,
                      message: '恭喜你,添加成功',
                      type: 'success'
             });
          }
          console.log(result.data);
       })
     },
     //获取具体的版块名称
     async getPlate(){
      await this.$axios.get("admin/father_module_update.php?id="+this.updateFrom.id).then(result=>{
        this.module_name = result.data.module_name;
        this.module_sort = result.data.sort;
        console.log(result.data);
      })
     }
   }
 }
</script>

<style lang="less" scoped>
  .el-input{width: 300px;}
  .title{height: 50px; background-color: #CCCCCC; display: flex; align-items: center;}
</style>
