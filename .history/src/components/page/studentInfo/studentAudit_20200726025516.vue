<template>
  <div>
    <el-form :model="student" label-position="left" ref="stus" label-width="120px" class="demo-ruleForm">

      <el-form-item label="真实姓名" >
        <el-input class="y" v-model="student.realName" disabled></el-input>
      </el-form-item>

      <el-form-item label="身份证号" >
        <el-input class="y" v-model="student.cardId" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="linkNum">
        <el-input class="y" v-model="student.linkNum" disabled></el-input>
      </el-form-item>

      <el-form-item label="车牌号码" >
        <el-input class="y" v-model="student.busNum" disabled></el-input>
      </el-form-item>

      <el-form-item label="学员头像" >
         <el-upload
         disabled
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

      <el-form-item label="相片审核状态">
          <el-select class="y1" v-model="headImgStatus" placeholder="请选择活动区域">
          <el-option label="待审核"   value="4"></el-option>
          <el-option label="通过"     value="5"></el-option>
          <el-option label="未通过"   value="6"></el-option>
        </el-select>
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
      headImgStatus:[]
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
    updateStudents() {
      const currThis = this
      currThis.$axios.get('http://localhost:8081/studentinfo/updateStudent', {
        params: {
          id:currentThis.stuid,
          headImgStatus:
        }
      })
      .then(res => currThis.$emit('updateSuccessClick', res.data))
      .catch(error => console.log(error))
    },
  }
}
</script>
