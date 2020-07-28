<template>
	<div>
		<el-card class="box-card">
      <el-form ref="student" :inline="true" :model="studentList" class="demo-form-inline">
        <el-form-item label="学员姓名">
          <el-input v-model="studentList.userName" placeholder="用户姓名" width="10px"/>
        </el-form-item>

				<el-form-item label="活动时间">
					<el-col :span="11">
						<el-date-picker v-model="studentList.startTime" type="date" placeholder="选择日期" />
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-date-picker v-model="studentList.endTime" type="date" placeholder="选择日期" />
					</el-col>
				</el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryAllUser">查询</el-button>
          <el-button @click="resetForm('student')">重置</el-button>
        </el-form-item>
      </el-form>
			<el-radio-group v-model="radio">
					<el-radio :label="3">激活</el-radio>
					<el-radio :label="6">离职</el-radio>
					<el-radio :label="9">禁用</el-radio>
					<el-radio :label="9">所有人员</el-radio>
				</el-radio-group>
				<el-button type="success" round @click="addUser">添加学员</el-button>
				<el-button type="success" round @click="addUser">导入学员</el-button>
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
		mounted() {

		},
		methods: {
			//按条件查询所有的学员
			queryAllStudent(){
				const currentThis = this
				currentThis.$axios.get('')
			}
		}
	};
</script>


<style>
	.box-card {
		height: 120px;
	}
</style>