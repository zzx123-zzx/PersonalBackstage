<template>
 <div>
    <div class="AllPlateTitle">子版块列表</div>
    <div class="AllPlateName">
      <div>排序</div>
      <div>板块名称</div>
      <div>操作</div>
      <div>所属父版块</div>
      <div>版主</div>
    </div>
    <div class="AllPlateBodyContainer" v-for="item in sonAllPlate">
      <div>
        <input type="text" style="width: 50px;"/>
      </div>
      <div>
        {{item.module_name}}[id:{{item.id}}]
      </div>
      <div>
        <router-link :to="'sonModuleUpdate/'+item.id">修改</router-link>
        <input type="button" value="删除" @click="del(item.id,item.module_name)"/>
      </div>
      <div>
        {{item.father_module_name}}
      </div>
      <div>
        {{item.member_id}}
      </div>
    </div>
  </div>
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
      this.getAllSonList()
    },
    methods:{
      getAllSonList(){
         this.$axios.get("http://localhost/php/sfkbbs/admin/son_module.php").then(result=>{
          this.sonAllPlate = result.data;
        })
      },
      async delFunction(id){
        await this.$axios.post("http://localhost/php/sfkbbs/admin/son_module_delete.php?id="+id).then(result=>{
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
  .container{}
  .AllPlateTitle{background-color: #CCCCCC; line-height: 50px; text-align: left;}
  .AllPlateName{
    width: 600px;
    display: flex;
    flex-wrap: nowrap;
  }
  .AllPlateName div{width: 200px;line-height: 50px; text-align: center;}

  /*主体内容容器样式*/
  .AllPlateBodyContainer{width: 600px; line-height: 50px;display: flex; flex-wrap: nowrap;}
  .AllPlateBodyContainer div{width: 200px; line-height: 50px; background: #8CC5FF; text-align: center;}
</style>
