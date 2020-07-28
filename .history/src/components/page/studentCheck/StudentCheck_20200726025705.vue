<template>
  <div>
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
          <el-button type="primary" @click="queryNotReviewed">查询</el-button>
          <el-button @click="resetForm('student')">重置</el-button>
        </el-form-item>
      </el-form>
			<el-radio-group v-model="student.headImgStatus" @change="queryNotReviewed">
        <el-radio>所有人员</el-radio>
				<el-radio :label="4">待审核</el-radio>
				<el-radio :label="5">通过</el-radio>
				<el-radio :label="6">未通过</el-radio>
			</el-radio-group>
    </el-card>

		<el-table :data="studentList" align="center">

			<el-table-column label="用户头像" align="center" min-width="20%">
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

			<el-table-column label="照片状态" align="center" min-width="30%">
        <template slot-scope="scope">
					{{ scope.row.headImgStatus === 4 ?'待审核': scope.row.headImgStatus===5?'通过':scope.row.headImgStatus===6?'未通过':'未上传'}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="20%">
        <template slot-scope="scope">
          <el-button type="primary" round @click="studentAudit(scope.row)">审核</el-button>
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
    <el-dialog title="审核相片" :visible.sync="studentAuditVisible">
      <studentAudit v-if="studentAuditVisible"  :stuid="studentId" @AuditSuccessClick="AuditSuccessClick"/>
    </el-dialog>
    <!-- --------------------操作弹出框结束------------------------------------------------------------------------ -->
	</div>
  </div>
</template>




<script>
import studentAudit from '@/components/page/studentInfo/studentAudit'
export default {
  components:{
    studentAudit,
  },
    data(){
      return{
        studentList: [],
        student: {},
        studentId:0,
        studentAuditVisible:false,
        currentPage: 1, // 分页用的
				pageSize: 10, // 分页用的
				totalNum: 0, // 分页用的
      }
    },
    mounted() {
      this.queryNotReviewed();
    },
    methods:{
      //按条件查询所有未审核的学员
			queryNotReviewed(){
				const currentThis = this
				currentThis.$axios.get('http://localhost:8081/studentinfo/queryAllStudentInFo',{
					params: {
            realName: currentThis.student.realName,
            headImgStatus: currentThis.student.headImgStatus,
            currentPage: currentThis.currentPage,
						pageSize: currentThis.pageSize,
					}
				})
				.then(res=>{
					currentThis.studentList=res.data.records
					currentThis.totalNum = res.data.total
				})
				.catch(err=>console.log(err))
      },
      //学员审核
      studentAudit(student){
        this.studentAuditVisible = !this.studentAuditVisible
        this.studentId = student.id
      },
      //学员审核回调
      AuditSuccessClick(){
        const currThis = this
				if (returnJson.code === 200) {
					currThis.studentAuditVisible = !currThis.studentAuditVisible
					currThis.$message.success(returnJson.message)
				} else {
					currThis.studentAuditVisible = !currThis.studentAuditVisible
					currThis.$message.error(returnJson.message)
				}
				currThis.queryNotReviewed()
      },
      // 每页条数
			handleSizeChange(pageSize) {
				const currentThis = this
				currentThis.pageSize = pageSize
				currentThis.queryNotReviewed()
			},
			// 当前页
			handleCurrentChange(currentSize) {
				const currentThis = this
				currentThis.currentPage = currentSize
				currentThis.queryNotReviewed()
      },
    }
    
}
</script>


<style scoped>

</style>