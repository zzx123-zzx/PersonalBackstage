<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
    <el-form-item label="版块名称" prop="moduleName">
      <el-input v-model="ruleForm.moduleName"></el-input>
    </el-form-item>
    <el-form-item label="版块排序">
      <el-input v-model="ruleForm.moduleSort" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :plain="true" type="primary" @click="onSubmit">立即提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
     data() {
          return {
            ruleForm: {
              moduleName: '',
              moduleSort: ''
            },
            rules:{
              //版块内容验证
              moduleName: [
                  { required: true, message: '版块内容不能为空', trigger: 'blur' },
                  { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          };
        },
        methods: {
          async onSubmit() {
              await this.$axios.post("admin/father_module_add.php",stringify(this.ruleForm)).then(result=>{
                if(result.data =='200'){
                  this.$message({
                            showClose: true,
                            message: '恭喜你,添加成功',
                            type: 'success'
                   });
                   this.ruleForm.moduleName = '';
                   this.ruleForm.moduleSort = '';          //清空文本框
                }else if(result.data =='400'){
                  this.$message({
                    showClose:true,
                    message:'该版块已存在，不能继续添加',
                    type:'warning'
                  })
                }
                console.log(result.data);
              });
          }
        }
  }
</script>

<style scoped lang="less">
  .el-input{width: 300px}
</style>
