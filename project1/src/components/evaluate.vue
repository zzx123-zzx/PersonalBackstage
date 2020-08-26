<template>
  <!-- 管理文章评论模块 -->
  <el-table
     :data="evaluate"
     style="width: 100%">
     <el-table-column
       prop="content"
       label="所属文章"
       width="300">
     </el-table-column>
     <el-table-column
        prop="sr_content"
        label = "文章所属评论"
        width="600">
     </el-table-column>
     <el-table-column
       prop="name"
       label="操作"
       width="200">
       <template slot-scope="scope">
             <el-button type="primary" @click="del(scope.row.sr_id,scope.row.title)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
</template>

<script>
  export default{
    data(){
      return {
        evaluate:[]
      }
    },
    async created(){
       this.getEvaluate()
    },
    methods:{
      //获取所有评论
      async getEvaluate() {
        await this.$axios.get("admin/evaluate.php").then(result => {
          this.evaluate = result.data;
          console.log(result.data);
        })
      },
      async getEvaluate2() {
        await this.$axios.get("admin/son_evaluate.php").then(result => {
          // this.evaluate = result.data;
          // console.log(result.data);
        })
      },

      async del(id,title){
        await this.$axios.get("admin/del_evaluate.php?id="+id).then(result=>{
          this.getEvaluate();
          this.$message({
            showClose: true,
            message: '删除成功!',
            type: 'success'
          })
        });
      }
    }
  }
</script>

<style>
</style>
