<template>
  <el-table
     :data="article"
     style="width: 100%">
     <el-table-column
       prop="title"
       label="文章"
       width="300">
     </el-table-column>
     <el-table-column
        prop="time"
        label = "发布时间"
        width="350">
     </el-table-column>
     <el-table-column
       prop="name"
       label="操作"
       width="180">
       <template slot-scope="scope">
             <el-button type="primary" @click="del(scope.row.id,scope.row.title)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
     data(){
       return {
          article:[]
       }
     },
     async created(){
        this.getArticle()
     },
     methods:{
       //获取所有文章
       async getArticle(){
          await this.$axios.get("admin/all_article.php").then(result=>{
              this.article = result.data;
              console.log(result.data);
          })
       },
       async deleteArticle(id){
         await this.$axios.get("admin/all_article_delete.php?id="+id).then(result=>{
           this.getArticle();
         })
       },
       del(id,module_name){
         this.$confirm(`此操作将永久删除"${module_name}"这篇文章?, 是否继续?`,'警告',{
           confirmButtonText:'确定',
           cancelButtonText: '取消',
           type:'warning'
         }).then(()=>{
           this.$message({
             type:'success',
             message:'删除成功!'
           });
           this.deleteArticle(id);
         }).catch(()=>{
           this.$message({
             type:'info',
             message:'已取消删除'
           })
         })
       },
     }
  }
</script>

<style scoped>
</style>
