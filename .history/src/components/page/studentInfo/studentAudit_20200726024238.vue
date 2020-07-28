<template>
  <div>
    <el-form :model="student" label-position="left" :rules="rules" ref="stus" label-width="120px" class="demo-ruleForm">
      <el-divider content-position="left"><h1>基本信息</h1></el-divider>
      <el-form-item label="真实姓名" prop="realName">
        <el-input class="y" v-model="student.realName"></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="cardId">
        <el-input class="y" v-model="student.cardId"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="linkNum">
        <el-input class="y" v-model="student.linkNum"></el-input>
      </el-form-item>

      <el-form-item label="车牌号码" prop="busNum">
        <el-input class="y" v-model="student.busNum"></el-input>
      </el-form-item>

      <el-form-item label="学员头像">
         <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img  v-if="student.headImg" :src="student.headImg" class="avatar"/>
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      
      <el-form-item size="large">
        <el-button type="primary" @click="updateStudents('stus')">确定修改</el-button>
        <el-button @click="resetForm('stus')">重置</el-button>
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
    },
    updateStudents(stus) {
      this.$refs[stus].validate((valid) => {
        if (valid) {
          const currThis = this
          currThis.$axios.get('http://localhost:8081/studentinfo/updateStudent', {
            params: currThis.student,
          })
            .then(res => currThis.$emit('updateSuccessClick', res.data))
            .catch(error => console.log(error))
        } else {
          return false
        }
      })
    },
  }
}
</script>
