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
              <template slot-scope="scope">
          <img :src="scope.row.headImg" class="avatar">
        </template>
    </el-table-column>
    <el-table-column
      prop="realName"
      label="真实姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cardId"
      label="身份证号"
       width="180">
    </el-table-column>
      <el-table-column
      prop="jobName"
      label="岗位名称"
        width="180">
    </el-table-column>
      <el-table-column
      prop="busNum"
      label="车牌号码"
        width="180">
    </el-table-column>
      <el-table-column
      prop="linkNum"
      label="联系电话"
      width="180">
    </el-table-column>
       <el-table-column
      prop="status"
      label="培训状态"
      width="180">
       <template slot-scope="scope" >
        <el-tag v-if="scope.row.astatus=='1'" type="danger">未合格</el-tag>
        <el-tag v-else-if="scope.row.astatus=='2'" type="success">培训合格</el-tag>
        <el-tag v-else-if="scope.row.astatus==null" type="danger">未开始</el-tag>
       
      </template>
    </el-table-column>
       <el-table-column
      prop="startTime"
      label="开始时间"
      width="180">
         <template slot-scope="scope" >
        <el-tag v-if="scope.row.startTime==null" type="danger">未开始</el-tag>
        <el-tag v-else>{{scope.row.startTime}}</el-tag>


      </template>
    </el-table-column>
       <el-table-column
      prop="score"
      label="考试分数"
      width="180">
       <template scope="scope">                    
                    <p v-if="scope.row.score==null">暂未考试</p>
                    <p v-if="scope.row.score!=null">{{scope.row.score}}</p>             
                </template>
    </el-table-column>
       <el-table-column
      prop="联系电话"
      label="考试详情"
      width="180">
       <template slot-scope="scope" >
        <el-button
        align="center"
          size="mini"
          
          type="danger"
          @click="scorexiangqing(scope.row.aid)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>

    
<el-dialog
  title="考试详情"
  :visible.sync="dialogVisible"
  width="70%"
  :before-close="handleClose">
  <span>

 <el-table
    :data="tableData2"
    border
    style="width: 100%">
    <el-table-column
      prop="headImg"
      label="题型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="realName"
      label="题目"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cardId"
      label="选项"
       width="180">
    </el-table-column>
      <el-table-column
      prop="jobName"
      label="已选答案"
        width="180">
    </el-table-column>
         <el-table-column
      prop="jobName"
      label="正确答案"
        width="180">
    </el-table-column>
    <el-table-column
      prop="jobName"
      label="判卷"
        width="180">
    </el-table-column>
   
    
  </el-table>

  </span>
</el-dialog>


    </div></el-col>
</el-row>

   </div>
</template>
<script>
export default {
  
  

data() {
        return {
          tableData:{},
          id:"",
           dialogVisible: false
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




        },
        scorexiangqing(e){
          var a=this;
          if(e==null){
            this.$message({
          message: '未考试，暂无考试详情！',
          type: 'warning'
        });
          }else{
              a.dialogVisible = true



          }



        }

      }

}
</script>
<style>

</style>