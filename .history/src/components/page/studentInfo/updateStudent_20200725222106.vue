<template>
  <div>
    <el-form :model="student" label-position="left" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-divider content-position="left"><h1>基本信息</h1></el-divider>
        
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
  .y1{
    width: 555px;
    height: 10px;
  }

</style>
