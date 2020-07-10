<template>
  <div>
    <div class="AllPlateTitle">父版块列表</div>
    <div class="AllPlateName">
      <div>排序</div>
      <div>板块名称</div>
      <div>操作</div>
    </div>
    <div class="AllPlateBodyContainer" v-for="item in AllPlate">
      <div>
        <input type="text" :value="item.sort" ref="sortInput"/>    
      </div>
      <div>
        {{item.module_name}}
      </div>
      <div>
        <router-link :to="'fatherModuleUpdate/'+item.id">修改</router-link>
        <input type="button" value="删除" @click="del(item.id,item.module_name)"/>
      </div>
    </div>
    <input type="button" value="排序" @click="ref()"/>
  </div>
</template>

<script>
import {stringify} from 'querystring';
export default{
    data(){
      return {
        AllPlate:[],
        sortId:[]
      }
    },
    created(){
     this.release()
    },
    methods:{
      ref(){
        let ref = this.$refs.sortInput;
        let result = [];
        let indexArr = [];
      },
      release(){
          this.$axios.get("http://localhost/php/sfkbbs/admin/father_module.php").then(result=>{
           this.AllPlate = result.data;
           // this.sortId = result.data.id;
           // console.log(result.data.id);
        })
      },
      async DeletdAllpate(id){
        await this.$axios.get("http://localhost/php/sfkbbs/admin/father_module_delete.php?id="+id).then(result=>{
        })
      },
      del(id,module_name){
        this.$confirm(`此操作将永久删除${module_name}版块, 是否继续?`,'警告',{
          confirmButtonText:'确定',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          this.$message({
            type:'success',
            message:'删除成功!'
          });
          this.DeletdAllpate(id);
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      },
      update(){
        console.log('修改');
      }
    },
    watch:{
      AllPlate(){
        this.release()
      }
    }
}
</script>

<style scoped lang="less">
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
