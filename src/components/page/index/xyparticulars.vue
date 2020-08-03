<template>
   <div>
   <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px">

   <el-col :span="24" style="background:#DCDFE6;"><div class="grid-content bg-purple-dark" style="height:70px;text-align:center; line-height:70px;border:#18a077 solid 1px; ">
    <h3 style="display: inline;">参训学员</h3>
    </div></el-col>

  <el-col :span="24"><div class="grid-content bg-purple-dark">
 
     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="headImg"
      label="头像"
      width="180">
    </el-table-column>
    <el-table-column
      prop="realname"
      label="真实姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cardid"
      label="身份证号"
       width="180">
    </el-table-column>
      <el-table-column
      prop="jobname"
      label="岗位名称"
        width="180">
    </el-table-column>
      <el-table-column
      prop="busnum"
      label="车牌号码"
        width="180">
    </el-table-column>
      <el-table-column
      prop="linknum"
      label="联系电话"
      width="180">
    </el-table-column>
       <el-table-column
      prop="status"
      label="培训状态"
      width="180">
    </el-table-column>
       <el-table-column
      prop="联系电话"
      label="开始时间"
      width="180">
    </el-table-column>
       <el-table-column
      prop="score"
      label="考试分数"
      width="180">
    </el-table-column>
       <el-table-column
      prop="联系电话"
      label="考试详情"
      width="180">
    </el-table-column>
       <el-table-column
      prop="联系电话"
      label="操作"
      width="180">
    </el-table-column>
    
  </el-table>

    </div></el-col>
</el-row>

   </div>
</template>
<script>
export default {
  
  

data() {
        return {
          tableData:{},
          id:""
        };
    }, 
     mounted(){
      this.id=this.$route.query.value;
      this.tableinit();

     },
      methods: {
        tableinit(){
               var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/xiangqing2?id='+a.id)
			  .then(function (response) {
                a.tableData=response.data
                
			  })
			  .catch(function (error) {
			    console.log(error);
			  });




        }

      }

}
</script>
<style>

</style>