<!-- 前台轮播图 -->
<template>
  <div>
    <form ref="form1" id="form1">
      <!-- 自己写的多文件上传 -->
      <!-- <input type="file" v-on:change="onChange($event)" multiple=""/> -->
      <!-- <button @click="postFile">立即提交</button> -->
    </form>
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost/php/sfkbbs/admin/banner.php"
      :on-success	="success"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="container" v-for="item in banner_src">
      <div class="img_container">
         {{item.banner_src}}
         <!-- <img :src="require('C:/Users/zzx/Desktop/'+src+'.jpg')" /> -->
      </div>
      <div class="img_delete">
        <el-button type="primary" @click="deleteBanner(item.id)">立即删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        forms:{
          fileArray:[]
        },
        banner_src:[]
      }
    },
    async created(){
      this.getBanner()
    },
    methods:{
      onChange(event){
          var that = this;
          for(var i = 0; i<event.target.files.length;i++){
            that.forms.fileArray.push(event.target.files[i]);
          }
        },
        async postFile(){
          let oForm = document.getElementById('form1');
          let formData = new FormData(oForm);
          let headers = {
              'Content-Type': 'multipart/form-data'
          }
          for(var n = 0; n<this.forms.fileArray.length; n++){
              formData.append('file'+n,this.forms.fileArray[n]);
          }
          await this.$axios.post("admin/banner.php",formData,{headers:headers}).then(result=>{
            console.log(result.data);
          })
        },
        //获取轮播图数据
        async getBanner(){
          await this.$axios.get("admin/banner.php").then(result=>{
            console.log(result.data);
            this.banner_src = result.data;
          })
        },
        handleChange(file, fileList) {

        },
        async deleteBanner(id){
          await this.$axios.get("admin/banner_delete.php?id="+id).then(result=>{
            console.log(result.data);
            if(result.data=='200'){
              this.getBanner();

              this.$message({
                message:'删除成功!',
                type:'success'
              })
            }
          })
        },
        //文件上传成功的回调函数(element-ui的方法)
        success(response, file, fileList){
          this.$message({
                message: '恭喜你，文件上传成功!',
                type: 'success'
          });
          console.log(response);
        }
      }
    }
</script>

<style scoped>
.container{
  width: 30%;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.img_container{
  width: 80%;
}
.img_container img{
  width: 20%;
  height: 10vh;
}
.img_delete{
  width: 20%;
}
</style>
