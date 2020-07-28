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

      <el-form-item label="岗位名称" prop="jobName">
        <el-select class="y" v-model="student.jobName" placeholder="请选择活动区域">
          <el-option label="驾驶员"         value="驾驶员"></el-option>
          <el-option label="客运驾驶人"     value="客运驾驶人"></el-option>
          <el-option label="危货驾驶人"     value="危货驾驶人"></el-option>
          <el-option label="普货驾驶人"     value="普货驾驶人"></el-option>
          <el-option label="出租车驾驶人"   value="出租车驾驶人"></el-option>
          <el-option label="企业负责人"     value="企业负责人"></el-option>
          <el-option label="安全管理人员"   value="安全管理人员"></el-option>
          <el-option label="维修人员"       value="维修人员"></el-option>
          <el-option label="场站管理人员"   value="场站管理人员"></el-option>
          <el-option label="装卸员"         value="装卸员"></el-option>
          <el-option label="押运员"         value="压运员"></el-option>
          <el-option label="乘务员"         value="乘务员"></el-option>
          <el-option label="后勤人员"       value="后勤人员"></el-option>
          <el-option label="安全员"         value="安全员"></el-option>
          <el-option label="安全检查员"     value="安全检查员"></el-option>
          <el-option label="公交车驾驶员"   value="公交车驾驶员"></el-option>
          <el-option label="旅游驾驶员"     value="旅游驾驶员"></el-option>
          <el-option label="工程车驾驶员"   value="工程车驾驶员"></el-option>
          <el-option label="教练员"         value="教练员"></el-option>
          <el-option label="监控人员"       value="监控人员"></el-option>
          <el-option label="办公室管理人员" value="办公室管理人员"></el-option>
          <el-option label="网约车驾驶员"   value="网约车驾驶员"></el-option>
          <el-option label="车主"           value="车主"></el-option>
          <el-option label="大队负责人"     value="大队负责人"></el-option>
          <el-option label="大队副职"       value="大队副职"></el-option>
          <el-option label="分管安全领导"   value="分管安全领导"></el-option>
          <el-option label="科室负责人"     value="科室负责人"></el-option>
          <el-option label="科员"           value="科员"></el-option>
          <el-option label="其他管理人员"   value="其他管理人员"></el-option>
          <el-option label="企业副职领导"   value="企业副职领导"></el-option>
          <el-option label="校车照管员"     value="校车照管员"></el-option>
        </el-select>
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
      
      <el-divider content-position="left"><h1>职业信息</h1></el-divider>

      <el-form-item label="从业证号" prop="employedNum">
        <el-input  v-model="student.employedNum"></el-input>
      </el-form-item>

      <el-form-item label="驾驶证到期时间" prop="driverOverTime">
        <el-col :span="11" class="y1">
          <el-date-picker  type="date" placeholder="选择日期" v-model="student.driverOverTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="车辆年审时间" prop="busCarefulTime">
         <el-col :span="11" class="y1">
          <el-date-picker  type="date" placeholder="选择日期" v-model="student.busCarefulTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="联系地址" prop="linkAddress">
        <el-input  v-model="student.linkAddress"></el-input>
      </el-form-item>
      <el-form-item label="从业类型" prop="jobType">
          <el-select class="y1" v-model="student.jobType" placeholder="请选择活动区域">
          <el-option label="客运"     value="客运"></el-option>
          <el-option label="普货"     value="普货"></el-option>
          <el-option label="危险品"   value="危险品"></el-option>
          <el-option label="出租车"   value="出租车"></el-option>
          <el-option label="安管人员" value="安管人员"></el-option>
          <el-option label="押运员"   value="押运员"></el-option>
          <el-option label="卸货员"   value="卸货员"></el-option>
          <el-option label="乘务员"   value="乘务员"></el-option>
          <el-option label="维修人员" value="维修人员"></el-option>
          <el-option label="站场管理" value="站场管理"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="入职时间" prop="induction">
        <el-col :span="11" class="y1">
          <el-date-picker  type="date" placeholder="选择日期" v-model="student.induction" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item size="large">
        <el
        <el-button type="primary" @click="addStudent("stus")">确定修改</el-button>
        <el-button @click="resetForm('stus')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addStudent',
  data() {
    return {
      student:{
        headImg: ''
      },
      uploadUrl: 'http://localhost:8080/upload/uploadImage',
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
          { required: true, message: '请输入从业证书', trigger: 'blur' },
        ],
        driverOverTime: [
          { required: true, message: '请选择驾驶证到期时间', trigger: 'blur' }
        ],
        busCarefulTime: [
          { required: true, message: '请选择车辆年审时间', trigger: 'blur' }
        ],
        linkAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ],
        jobType: [
          { required: true, message: '请选择从业类型', trigger: 'blur' }
        ],
        induction: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    // 添加用户信息
    addStudent(stus) {
      this.$refs[stus].validate((valid) => {
        if (valid) {
          const currThis = this
          currThis.$axios.get('http://localhost:8080/user/addUser', {
            params: currThis.user,
          })
            .then(res => currThis.$emit('addSuccessClick', res.data))
            .catch(error => console.log(error))
        } else {
          return false
        }
      })
    },

    // 重置表单内容
    resetForm(user) {
      this.$refs[user].resetFields()
    }
  }
}
</script>
