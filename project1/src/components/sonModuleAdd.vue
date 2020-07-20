<template>
  <div>
    <div class="title">添加子版块</div>
    <el-form :model="sonForm" ref="sonForm" label-width="80px">
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
      <el-form-item label="简介内容">
        <textarea v-model="sonForm.info"></textarea>
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
          memberId:''
        },
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
     async onsumbit(){
        await this.$axios.post("http://localhost/php/sfkbbs/admin/son_module_add.php",stringify(this.sonForm)).then(result=>{
          if(result.data =='200'){
            this.$message({
              showClose:'true',
              message:'恭喜你，添加成功',
              type:'success'
            })
          }
        });
      },
      //获取所有父版块
      async getFather(){
        await this.$axios.get("http://localhost/php/sfkbbs/admin/son_module_add.php").then(result=>{
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
</style>
