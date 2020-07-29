<template>
	<div>
		<el-card class="box-card">
      <el-form ref="student" :inline="true" :model="student" class="demo-form-inline">
        <el-form-item label="学员姓名">
          <el-input v-model="student.realName" placeholder="用户姓名" />
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
          <el-button type="primary" @click="queryAllStudent">查询</el-button>
          <el-button @click="resetForm('student')">重置</el-button>
        </el-form-item>
      </el-form>
			<el-radio-group v-model="student.status" @change="queryAllStudent">
				<el-radio :label="1">激活</el-radio>
				<el-radio :label="2">离职</el-radio>
				<el-radio :label="0">禁用</el-radio>
				<el-radio>所有人员</el-radio>
			</el-radio-group>

			<!-- <el-button type="success" round @click="addUser">添加学员</el-button>
			<el-button type="success" round @click="addUser">导入学员</el-button> -->
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

			<el-table-column label="身份证号" align="center" min-width="32%">
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
          <el-button v-if="scope.row.status === 1" type="primary" round @click="updateStudent(scope.row)">编辑用户</el-button>
					<el-button v-if="scope.row.status !== 1" type="primary" round @click="updateStudentStatus(scope.row)">激活</el-button>
        </template>
      </el-table-column>
    </el-table>
		<!-- --------------------分页开始------------------------------------------------------------------------------ -->
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[10,20,30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- --------------------分页结束------------------------------------------------------------------------------ -->
		<!-- --------------------操作弹出框开始------------------------------------------------------------------------ -->
    <el-dialog title="编辑学员" :visible.sync="updateStudentVisible">
      <updateStudent v-if="updateStudentVisible"  :stuid="studentId" @updateSuccessClick="updateSuccessClick"/>
    </el-dialog>

		<el-dialog title="提示"	:visible.sync="updateStatus"	width="30%" :before-close="handleClose">
			<span>你确定要激活账号吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="updateStatus = false">取 消</el-button>
				<el-button type="primary" @click="okClickUpdateStatus">确 定</el-button>
			</span>
		</el-dialog>
    <!-- --------------------操作弹出框结束------------------------------------------------------------------------ -->
	</div>
</template>




<script>
import updateStudent from '@/components/page/studentInfo/updateStudent'
	export default {
		components: {
    updateStudent,
  },
		data() {
			return {
				student: {status:1},
				studentStatus:{},
				studentList: [],
				currentPage: 1, // 分页用的
				pageSize: 10, // 分页用的
				totalNum: 0, // 分页用的
				updateStudentVisible:false,//编辑学员的弹出框
				studentId:0,
				updateStatus: false,//激活账号的弹出框
			};
		},
		mounted() {
			this.queryAllStudent();
		},
		methods: {
			//按条件查询所有的学员
			queryAllStudent(){
				const currentThis = this
				let createTimes = ''
				let endTimes = ''
				if (currentThis.student.createTime != null && currentThis.student.endTime != null) {
					createTimes = currentThis.$moment(currentThis.student.createTime).format('YYYY-MM-DDTHH:mm:ss')
					endTimes = currentThis.$moment(currentThis.student.endTime).format('YYYY-MM-DDTHH:mm:ss')
				}
				currentThis.$axios.get('http://localhost:8081/studentinfo/queryAllStudentInFo',{
					params: {
						realName: currentThis.student.realName,
						createTimes: createTimes,
						endTimes: endTimes,
						currentPage: currentThis.currentPage,
						pageSize: currentThis.pageSize,
						status:	currentThis.student.status
					}
				})
				.then(res=>{
					currentThis.studentList=res.data.records
					currentThis.totalNum = res.data.total
				})
				.catch(err=>console.log(err))
			},
			//按状态查询
			// statusClick(){
			// 	console.log(this.student.status)
			// 	this.queryAllStudent()
			// },
			// 每页条数
			handleSizeChange(pageSize) {
				const currentThis = this
				currentThis.pageSize = pageSize
				currentThis.queryAllStudent()
			},
			// 当前页
			handleCurrentChange(currentSize) {
				const currentThis = this
				currentThis.currentPage = currentSize
				currentThis.queryAllStudent()
			},
			//编辑学员信息
			updateStudent(student){
				this.updateStudentVisible=!this.updateStudentVisible
				this.studentId = student.id
			},
			//编辑学员信息成功回调
			updateSuccessClick(returnJson){

			} 
			//修改学员状态
			updateStudentStatus(student){
				this.updateStatus = !this.updateStatus
				this.studentStatus= student
			},
			okClickUpdateStatus(){
				const currentThis = this
				currentThis.studentStatus.status=1
				currentThis.$axios.get('http://localhost:8081/studentinfo/updateOneStudent',{
					params:{
						id:currentThis.studentStatus.id,
						status:currentThis.studentStatus.status,
					}
				})
				.then(res=>{
					if(res.data.code===200){
						currentThis.updateStatus = !currentThis.updateStatus
						currentThis.$message({
							message: res.data.message,
							type: 'success'
        		});
					}else{
						currentThis.updateStatus = !currentThis.updateStatus
						currentThis.$message.error(res.data.message);
					}
					currentThis.student.status=1
					currentThis.queryAllStudent()
				})
				.catch(err=>console.log(err))
			},
			handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
			// 重置表单
			// 重置表单并刷新页面
			resetForm() {
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