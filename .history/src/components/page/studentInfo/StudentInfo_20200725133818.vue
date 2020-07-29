<template>
	<div>
		<el-card class="box-card">
      <el-form ref="user" :inline="true" :model="studentList" class="demo-form-inline">
        <el-form-item label="用户姓名">
          <el-input v-model="studentList.userName" placeholder="用户姓名" />
        </el-form-item>

				<el-form-item label="活动时间">
					<el-col :span="11">
						<el-date-picker v-model="studentList.startTime" type="date" placeholder="选择日期" />
						<!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker> -->
					</el-col>
					<el-col class="line" :span="2">~</el-col>
					<el-col :span="11">
						<el-date-picker v-model="studentList.endTime" type="date" placeholder="选择日期" />
						<!-- <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker> -->
					</el-col>
				</el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryAllUser">查询</el-button>
          <el-button @click="resetForm('studentList')">重置</el-button>
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