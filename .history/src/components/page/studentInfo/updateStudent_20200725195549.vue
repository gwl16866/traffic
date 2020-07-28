<template>
  <div>
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
  </div>
</template>
<script>
export default {
  name: 'updateStudent',
  props: ['stuid'],
  data() {
    return {
      student:{},
    }
  },
  mounted() {
    this.queryStudentById();
  },

  methods: {
    queryStudentById(){
      const currentThis = this
      currentThis.$axios.get('http://localhost:8081/studentinfo/queryStudentById',{
					params: {
						id:currentThis.stuid
					}
				})
				.then(res=>{
					currentThis.student=res.data
				})
				.catch(err=>console.log(err))

    }

  }
}
</script>
