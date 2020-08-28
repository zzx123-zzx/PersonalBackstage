<template>
	<!-- 反馈意见 -->
	<!-- <div class="container">
	  <el-table
	     :data="contact"
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
	</div> -->
</template>

<script>
	export default{
		data(){
			return {
				contact:[]
			}
		},
		async created(){
			this.getContact()
		},
		methods:{
			async getContact(){
				await this.$axios.get("before/contacts.php").then(result=>{
					this.contact = result.data;
					console.log(result.data);
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
