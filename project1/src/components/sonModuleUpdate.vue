<template>
  <div>
    <div>
      <div class="title">修改子版块---{{module_name}}</div>
      <el-form :model="updateFrom" ref="updateFrom" label-width="80px">
        <el-form-item label="所属版块">
          <el-select v-model="updateFrom.fatherModuleId" placeholder="请选择">
            <!-- 这个module_name是父版块的modulename -->
            <el-option v-for="item in options" :key="item.value" :value="item.id" :label="item.module_name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label = "选择版主">
          <el-select v-model="updateFrom.memberId" placeholder="请选择">
            <el-option :value="updateFrom.memberId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版块名称" prop="ModuleName">
          <el-input v-model="updateFrom.ModuleName" :placeholder="module_name"></el-input>
        </el-form-item>
        <el-form-item label="版块排序">
          <el-input v-model="updateFrom.ModuleSort" :placeholder="module_sort"></el-input>
        </el-form-item>
        <el-form-item label="简介内容">
          <textarea v-model="updateFrom.info" :placeholder="info"></textarea>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="onSubmit">立即修改</el-button>
          <router-link :to="{name:'sonPlate'}">返回</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
          updateFrom:{
            id: this.$route.params.id,
            fatherModuleId:'',         //父版块id
            ModuleName:'',             //子版块名称
            ModuleSort:'',             //子版块序号
            info:'',                    //子版块简介
            memberId:'0'
          },
          options:[],
          module_name:'',
          module_sort:'',
          father_module_name:'',
          info:''                   ,//子版块简介,
      }
    },
     async created(){
       this.getAllPlate(),
       this.getFather()
     },
    methods:{
      async getAllPlate(){
        await this.$axios.get("http://localhost/php/sfkbbs/admin/son_module_update.php?id="+this.updateFrom.id).then(result=>{
          this.module_name = result.data.module_name;
          this.module_sort = result.data.sort;
          this.info = result.data.info;
        })
      },
      async onSubmit(){
        await this.$axios.post("http://localhost/php/sfkbbs/admin/son_module_update.php?id="+this.updateFrom.id,stringify(this.updateFrom)).then(result=>{
          console.log(result.data);
        })
      },
      async getFather(){
        await this.$axios.get("http://localhost/php/sfkbbs/admin/son_module_add.php").then(result=>{
          this.options = result.data;
          console.log(this.options);
        })
      }
    }
  }
</script>

<style scoped>
  .el-input{width: 300px;}
  .title{height: 50px; background-color: #CCCCCC; display: flex; align-items: center;}
</style>
