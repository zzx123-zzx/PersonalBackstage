<template>
 <!-- 推荐文章组件 -->
 <!-- <el-form :model="recFrom" ref="recFrom" label-width="80px">
    <el-select v-model="recFrom.article_id" placeholder="请选择">
      <el-option v-for="item in all_article" :key="item.id" :label="item.title" :value="item.title"></el-option>
    </el-select>
    <el-input placeholder="请输入内容" v-model="recFrom.url">
      <template slot="prepend">http://</template>
    </el-input>
    <el-button :plain="true" type="primary" @click="recom">立即提交</el-button>
  </el-form> -->
  <div class="container">
    <el-table
       :data="all_article"
       style="width: 60%">
       <el-table-column
         prop="title"
         label="文章"
         width="300">
       </el-table-column>
       <el-table-column
         prop="name"
         label="操作"
         width="200">
         <template slot-scope="scope">
               <el-button type="primary" @click="recom(scope.row.id,scope.row.title)">推荐文章</el-button>
         </template>
       </el-table-column>
     </el-table>
     <el-table
        :data="recommend"
        style="width: 30%">
        <el-table-column
          prop="article_title"
          label="已推荐文章"
          width="300">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作"
          width="200">
          <template slot-scope="scope">
                <el-button type="danger" @click="del_recom(scope.row.id,scope.row.title)">撤销推荐</el-button>
          </template>
        </el-table-column>
     </el-table>
  </div>
</template>

<script>
  import {
    stringify
  } from 'querystring';
  export default {
    data() {
      return {
        recFrom: {
          article_id: '',
          url:'',           //双向绑定过来的url
          article_url: '',
          article_title:''
        },
        all_article: [],
        aa: 'post过去',
        recommend:[]
      }
    },
    async created() {
      this.getArticle()
    },
    methods: {
      async getArticle() {
        await this.$axios.get("admin/all_article.php").then(result => {
          this.all_article = result.data;
        });
        await this.$axios.get("admin/recommend.php").then(result =>{
          this.recommend = result.data;
          console.log(result.data);
        })
      },
      //推荐文章
      async recom(id,title){
        let url = 'https://www.zzxzuishuai.cn/frontwebsite/dist/#/article/'+id;
        this.recFrom.article_url = url;
        this.recFrom.article_title = title;
        await this.$axios.post("admin/recommend.php",stringify(this.recFrom)).then(result=>{
          if(result.data == '200'){
            this.$message({
              showClose: true,
              message: '推荐成功!',
              type: 'success'
            })
            this.getArticle();
          }
        })
      },
      //撤销推荐
      async del_recom(id,title){
        await this.$axios.get("admin/del_recommend.php?id="+id).then(result=>{
          if(result.data =='200'){
            this.$message({
              showClose: true,
              message: '撤销成功!',
              type: 'success'
            });
            this.getArticle();
          }
        })
      }
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: space-between;
  }
  .el-form {
    width: 400px;
    display: flex;
    flex-wrap: wrap;
  }

  .el-input {
    width: 400px;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
