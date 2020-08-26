<template>
 <!-- <div>
    <div class="AllPlateTitle">子版块列表</div>
    <div class="AllPlateName">
      <div>文章名称 </div>
      <div>操作</div>
      <div>所属类别</div>
    </div>
    <div class="AllPlateBodyContainer" v-for="item in sonAllPlate">
      <div>
        {{item.module_name}}[id:{{item.id}}]
      </div>
      <div>
        <router-link :to="'sonModuleUpdate/'+item.id">修改</router-link>
        <el-button type="primary" @click="del(item.id,item.module_name)">删除</el-button>
      </div>
      <div>
        {{item.father_module_name}}
      </div>
    </div>
  </div> -->
      <el-table
        :data="sonAllPlate"
        style="width: 100%">
        <el-table-column
          prop="father_module_name"
          label="所属类别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="module_name"
          label="文章名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作"
          width="180">
          <template slot-scope="scope">
                  <router-link :to="'sonModuleUpdate/'+scope.row.id">修改</router-link>
                  <el-button type="primary" @click="del(scope.row.id,scope.row.module_name)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
</template>

<script>
  import {stringify} from 'querystring';
  export default{
    data(){
      return {
        sonAllPlate:[]
      }
    },
    async created(){
      this.getAllSonList(),
      this.show()
    },
    methods:{
      async getAllSonList(){
         await this.$axios.get("admin/son_module.php").then(result=>{
          this.sonAllPlate = result.data;
          // console.log(result.data);
          // console.log('ssss');
        })
      },
      show(){
        console.log('aaaa');
      },
      async delFunction(id){
        await this.$axios.post("admin/son_module_delete.php?id="+id).then(result=>{
          this.getAllSonList();
        })
      },
      async del(id,module_name){
        this.$confirm(`此操作将永久删除${module_name}版块,是否继续`,'警告',{
          confirmButtonText :'确定',
          cancelButtonText : '取消',
          type:'warning'
        }).then(()=>{
          this.$message({
            type:'success',
            message:'删除成功!'
          });
          this.delFunction(id);
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'操作已取消'
          })
        })
      }
    },
    watch:{
      sonAllPlate(){
        this.getAllSonList();
      }
    }
  }
</script>

<style lang="less" scoped>
  a{text-decoration: none;}
  .container{}
  .AllPlateTitle{background-color: #CCCCCC; line-height: 50px; text-align: left;box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.5);}
  .AllPlateName{
    width: 600px;
    display: flex;
    flex-wrap: nowrap;
  }
  .AllPlateName div{width: 200px;line-height: 50px; text-align: center;}

  /*主体内容容器样式*/
  .AllPlateBodyContainer{width: 600px; line-height: 50px;display: flex; flex-wrap: nowrap;box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.5);}
  .AllPlateBodyContainer div{width: 200px; line-height: 50px; background: #C8C9CC; text-align: center;}
</style>
