<template>
  <div>
    <el-form :model="student" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="真实姓名" prop="name">
        <el-input class="y" v-model="student.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="name">
        <el-input class="y" v-model="student.cardId"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="name">
        <el-input class="y" v-model="student.linkNum"></el-input>
      </el-form-item>

      <el-form-item label="岗位名称" prop="region">
        <el-select class="y" v-model="student.jobName" placeholder="请选择活动区域">
          <el-option label="驾驶员"       value="驾驶员"></el-option>
          <el-option label="客运驾驶人"   value="客运驾驶人"></el-option>
          <el-option label="危货驾驶人"   value="危货驾驶人"></el-option>
          <el-option label="普货驾驶人"   value="普货驾驶人"></el-option>
          <el-option label="出租车驾驶人" value="出租车驾驶人"></el-option>
          <el-option label="企业负责人"   value="企业负责人"></el-option>
          <el-option label="安全管理人员" value="安全管理人员"></el-option>
          <el-option label="维修人员"     value="维修人员"></el-option>
          <el-option label="场站管理人员" value="场站管理人员"></el-option>
          <el-option label="装卸员"       value="装卸员"></el-option>
          <el-option label="压运员"       value="压运员"></el-option>
          <el-option label="乘务员"       value="乘务员"></el-option>
          <el-option label="后勤人员"     value="后勤人员"></el-option>
          <el-option label="安全员"       value="安全员"></el-option>
          <el-option label="安全检查员"   value="安全检查员"></el-option>
          <el-option label="公交车驾驶员" value="公交车驾驶员"></el-option>
          <el-option label="旅游驾驶员"   value="旅游驾驶员"></el-option>
          <el-option label="工程车驾驶员" value="工程车驾驶员"></el-option>
          <el-option label="教练员"       value="教练员"></el-option>
          <el-option label="监控人员"     value="监控人员"></el-option>
          <el-option label="办公室管理人员" value="办公室管理人员"></el-option>
          <el-option label="网约车驾驶员" value="网约车驾驶员"></el-option>
          <el-option label="车主"         value="车主"></el-option>
          <el-option label="大队负责人"   value="大队负责人"></el-option>
          <el-option label="大队副职" value="大队副职"></el-option>
          <el-option label="分管安全领导" value="分管安全领导"></el-option>
          <el-option label="科室负责人" value="科室负责人"></el-option>
          <el-option label="科员" value="科员"></el-option>
          <el-option label="其他管理人员" value="其他管理人员"></el-option>
          <el-option label="企业副职领导" value="企业副职领导"></el-option>
          <el-option label="校车照管员" value="校车照管员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车牌号码" prop="name">
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
          <img v-if="student.headImg" :src="student.headImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="submitForm('student')">立即创建</el-button>
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
      student:{
        headImg: ''
      },
      uploadUrl: 'http://localhost:8080/upload/uploadImage',
      headImg: '',
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
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
    handleAvatarSuccess(res, file) {
      const currThis = this
      if (res.code === 200) {
        currThis.headImg = res.filename
        currThis.$message.success(res.message)
        currThis.queryUserById()
      } else {
        currThis.$message.error(res.message)
      }
      // console.log(res)
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

  }
}
</script>
<style>
  .y{
    width: 150px;
    height: 10px;
  }
</style>
