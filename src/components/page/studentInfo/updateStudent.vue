<template>
  <div>
    <el-form :model="student" label-position="left" :rules="rules" ref="stus" label-width="120px" class="demo-ruleForm">
      <el-divider content-position="left"><h1>基本信息</h1></el-divider>
      <el-form-item label="真实姓名" prop="realName" >
        <el-input class="y" v-model="student.realName" placeholder="请输入真实姓名"></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="cardId">
        <el-input class="y" v-model="student.cardId" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="linkNum">
        <el-input class="y" v-model="student.linkNum" placeholder="请输入联系电话"></el-input>
      </el-form-item>

      <el-form-item label="岗位名称" prop="jobName">
        <el-select class="y" v-model="student.jobName" placeholder="请选择岗位名称">
          <el-option label="危货驾驶员" value="危货驾驶员"></el-option>
          <el-option label="危货押运员" value="危货押运员"></el-option>
          <el-option label="危货驾驶员+危货押运员" value="危货驾驶员+危货押运员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学员状态" prop="status">
        <el-select class="y" v-model="student.status" placeholder="请选择学员状态">
          <el-option  label="禁用"     value="0"></el-option>
          <el-option  label="激活"     value="1"></el-option>
          <el-option  label="离职"     value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车牌号码" prop="busNum">
        <el-input class="y" v-model="student.busNum" placeholder="请输入车牌号码"></el-input>
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
      
      <el-divider content-position="left"><h1>职业信息</h1></el-divider>

      <el-form-item label="从业证号" prop="employedNum">
        <el-input  v-model="student.employedNum" placeholder="请输入从业证号"></el-input>
      </el-form-item>

      <el-form-item label="驾驶证到期时间" prop="driverOverTime">
        <el-col :span="11" class="y1">
          <el-date-picker  type="date" placeholder="请选择驾驶证到期日期" v-model="student.driverOverTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="车辆年审时间" prop="busCarefulTime">
         <el-col :span="11" class="y1">
          <el-date-picker  type="date" placeholder="选择车辆年审日期" v-model="student.busCarefulTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="联系地址" prop="linkAddress">
        <el-input  v-model="student.linkAddress" placeholder="请输入联系地址"></el-input>
      </el-form-item>
      <el-form-item label="从业类型" prop="jobType">
          <el-select class="y1" v-model="student.jobType" placeholder="请选择从业类型">
<!--          <el-option label="客运"     value="客运"></el-option>-->
<!--          <el-option label="普货"     value="普货"></el-option>-->
          <el-option label="危险品"   value="危险品"></el-option>
<!--          <el-option label="出租车"   value="出租车"></el-option>-->
<!--          <el-option label="安管人员" value="安管人员"></el-option>-->
<!--          <el-option label="押运员"   value="押运员"></el-option>-->
<!--          <el-option label="卸货员"   value="卸货员"></el-option>-->
<!--          <el-option label="乘务员"   value="乘务员"></el-option>-->
<!--          <el-option label="维修人员" value="维修人员"></el-option>-->
<!--          <el-option label="站场管理" value="站场管理"></el-option>-->
        </el-select>
      </el-form-item>

      <el-form-item label="入职时间" prop="induction">
        <el-col :span="11" class="y1">
          <el-date-picker  type="date" placeholder="请选择入职日期" v-model="student.induction" style="width: 100%;"></el-date-picker>
        </el-col>
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
      
      student:{
        headImg: ''
      },
      uploadUrl: 'http://47.114.1.9/traffic/studentinfo/uploadFile',
      headImg: '',
      rules: {
          realName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { min: 18, max: 18, message: '必须为18位', trigger: 'blur' }
          ],
          linkNum: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
          ],
          jobName: [
            { required: true, message: '请选择岗位名称', trigger: 'blur' }
          ],
          busNum: [
            { required: true, message: '车牌号码', trigger: 'blur' },
            { min: 7, max: 7, message: '请输入正确的车牌号码', trigger: 'blur' }
          ],
          employedNum: [
            { required: false, message: '请输入从业证书', trigger: 'blur' },
          ],
          driverOverTime: [
            { required: false, message: '请选择驾驶证到期时间', trigger: 'blur' }
          ],
          busCarefulTime: [
            { required: false, message: '请选择车辆年审时间', trigger: 'blur' }
          ],
          linkAddress: [
            { required: false, message: '请输入联系地址', trigger: 'blur' }
          ],
          jobType: [
            { required: false, message: '请选择从业类型', trigger: 'blur' }
          ],
          induction: [
            { required: false, message: '请选择入职时间', trigger: 'blur' }
          ],
        }
    }
  },
  mounted() {
    this.queryStudentById();
  },

  methods: {
    queryStudentById(){
      const currentThis = this
      currentThis.$axios.get('http://47.114.1.9/traffic/studentinfo/queryStudentById',{
					params: {
						id:currentThis.stuid
					}
				})
				.then(res=>{
          currentThis.student=res.data
          currentThis.student.studentOCardId=currentThis.student.cardId
          let status = currentThis.student.status
          if(status==0){
            status="禁用"
          }else if(status==1){
            status="激活"
          }else{
            status="离职"
          }
          currentThis.student.status = status
          if (currentThis.headImg !== '') {
            currentThis.student.headImg = currentThis.headImg
          }
				})
				.catch(err=>console.log(err))
    },
    updateStudents(stus) {
      this.$refs[stus].validate((valid) => {
        if (valid) {
          const currThis = this
            currThis.student.inductions = currThis.$moment(currThis.student.induction).format('YYYY-MM-DDTHH:mm:ss')
            currThis.student.driverOverTimes = currThis.$moment(currThis.student.driverOverTime).format('YYYY-MM-DDTHH:mm:ss')
            currThis.student.busCarefulTimes = currThis.$moment(currThis.student.busCarefulTime).format('YYYY-MM-DDTHH:mm:ss')
            currThis.student.createTimes = currThis.$moment(currThis.student.createTime).format('YYYY-MM-DDTHH:mm:ss')
            currThis.student.induction=''
            currThis.student.driverOverTime=''
            currThis.student.busCarefulTime=''
            currThis.student.createTime=''
            if(currThis.student.status=='激活'){
              currThis.student.status=1;
            }
          currThis.$axios.post('http://47.114.1.9/traffic/studentinfo/updateStudent', {
            params: currThis.student,
          })
            .then(res => currThis.$emit('updateSuccessClick', res.data))
            .catch(error => console.log(error))
        } else {
          return false
        }
      })
    },
    resetForm(stus) {
      this.student={}
      this.queryStudentById()
    },
    handleAvatarSuccess(res, file) {
      const currThis = this
      if (res.code == 0) {
        currThis.headImg = res.filename
        currThis.$message.success("上传成功")
        currThis.queryStudentById()
      } else {
        currThis.$message.error("上传失败")
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
    width: 545px;
    height: 10px;
  }
  .y1{
    width: 545px;
    height: 10px;
  }
</style>
