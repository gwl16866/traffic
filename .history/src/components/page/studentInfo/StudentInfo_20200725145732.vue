<template>
	<div>
		<el-card class="box-card">
      <el-form ref="student" :inline="true" :model="student" class="demo-form-inline">
        <el-form-item label="学员姓名">
          <el-input v-model="student.realName" placeholder="用户姓名" width="10px"/>
        </el-form-item>

				<el-form-item label="录入时间">
					<el-col :span="11">
						<el-date-picker v-model="student.createTime" type="date" placeholder="选择日期" />
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-date-picker v-model="student.endTime" type="date" placeholder="选择日期" />
					</el-col>
				</el-form-item>

        <el-form-item>
          <el-button type="primary" @click="likeQueryStudent">查询</el-button>
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
		<el-table :data="studentList" align="center">
			<el-table-column label="用户头像" align="center" min-width="33%">
        <template slot-scope="scope">
          <img :src="scope.row.headImg" class="avatar">
        </template>
      </el-table-column>

			<el-table-column label="公司名称" align="center" min-width="30%">
        <template slot-scope="scope">
          {{ scope.row.companyName }}
        </template>
      </el-table-column>

			<el-table-column label="真实姓名" align="center" min-width="30%">
        <template slot-scope="scope">
          {{ scope.row.realName }}
        </template>
      </el-table-column>

			<el-table-column label="身份证号" align="center" min-width="30%">
        <template slot-scope="scope">
          {{ scope.row.cardId }}
        </template>
      </el-table-column>

			<el-table-column label="联系电话" align="center" min-width="30%">
        <template slot-scope="scope">
          {{ scope.row.linkNum }}
        </template>
      </el-table-column>

			<el-table-column label="车牌号码" align="center" min-width="30%">
        <template slot-scope="scope">
          {{ scope.row.busNum }}
        </template>
      </el-table-column>

			<el-table-column label="岗位名称" align="center" min-width="30%">
        <template slot-scope="scope">
          {{ scope.row.jobName }}
        </template>
      </el-table-column>

			<!-- <el-table-column label="群组名称" align="center" min-width="30%">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userAccount }}</span>
        </template>
      </el-table-column> -->

			<el-table-column label="创建时间" align="center" min-width="30%">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

			<el-table-column label="状态" align="center" min-width="30%">
        <template slot-scope="scope">
					{{ scope.row.status === 0 ?'禁用': scope.row.status===1?'激活':'离职'}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="20%">
        <template slot-scope="scope">
          <el-button type="primary" round @click="updateUser(scope.row)">编辑用户</el-button>
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>




<script>
	export default {
		data() {
			return {
				student: {},
				studentList: []
			};
		},
		mounted() {
			this.queryAllStudent();
		},
		methods: {
			//按条件查询所有的学员
			queryAllStudent(){
				const currentThis = this
				currentThis.$axios.get('http://localhost:8081/studentinfo/queryAllStudentInFo')
				.then(res=>currentThis.studentList=res.data)
				.catch(err=>console.log(err))
			},
			// 重置表单
			// 重置表单并刷新页面
			resetForm() {
				if(s){

				}
				this.student={}
				this.queryAllStudent()
			}
		}
	};
</script>


<style>
	.box-card {
		height: 120px;
	}
</style>