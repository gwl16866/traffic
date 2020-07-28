<template>
	<div>
		<el-card class="box-card">
      <el-form ref="user" :inline="true" :model="user" class="demo-form-inline">
        <el-form-item label="用户姓名">
          <el-input v-model="user.userName" placeholder="用户姓名" />
        </el-form-item>

        <el-form-item label="用户账号">
          <el-input v-model="user.userAccount" placeholder="用户账号" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryAllUser">查询</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="success" round @click="addUser">添加用户</el-button>
    </el-card>
	</div>
</template>




<script>
	export default {
		data() {
			return {
				studentList:[]
			};
		},
		mounted() {},
		methods: {}
	};
</script>


<style>
	.box-card {
		height: 120px;
	}
</style>