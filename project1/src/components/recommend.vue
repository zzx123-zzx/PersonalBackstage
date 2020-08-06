<template>
  <!-- 推荐文章组件 -->
    <el-form :model="recFrom" ref="recFrom" label-width="80px">
      <el-select v-model="recFrom.article_id" placeholder="请选择">
        <el-option v-for="item in all_article" :key="item.id" :label="item.title" :value="item.title"></el-option>
      </el-select>
      <el-input v-model="recFrom.article_url"></el-input>
      <el-button :plain="true" type="primary" @click="recom">立即提交</el-button>
    </el-form>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        recFrom:{
          article_id:'',
          article_url:''
        },
        all_article:[],
        aa:'post过去'
      }
    },
    async created(){
      this.getArticle()
    },
    methods:{
      async getArticle(){
         await this.$axios.get("admin/all_article.php").then(result=>{
           this.all_article = result.data;
         })
      },
      async recom(){
        await this.$axios.post("admin/recommend.php",stringify(this.recFrom)).then(result=>{
           console.log(result.data);
        })
      },

    }
  }
</script>

<style>
</style>
