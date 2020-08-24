<template>
   <div>
   <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px">

   <el-col :span="24" style="background:#DCDFE6;"><div class="grid-content bg-purple-dark" style="height:70px;text-align:center; line-height:70px;border:#18a077 solid 1px; ">
    <h3 style="display: inline;">参训学员</h3>
    </div></el-col>
 


 		<el-card class="box-card">
      <el-form  :inline="true"  class="demo-form-inline">
       <el-form-item>
             <el-select v-model="aaa">
              <el-option value="按姓名">按姓名</el-option>
              <el-option value="按身份证">按身份证</el-option>
              <el-option value="按联系电话"> 按联系电话</el-option>
              <el-option value="按车牌号"> 按车牌号</el-option>
             </el-select>
        </el-form-item>
        <el-form-item>
          <el-input  v-model="realName" placeholder="请输入查询条件" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryAllStudent">查询</el-button>
          <el-button @click="congzhi" >重置</el-button>
        </el-form-item>
      </el-form>
        
 
    	<el-radio-group v-model="radio" @change="queryAllStudent">
	    <el-radio   label="1">所有</el-radio>
      <el-radio   label="2">已完成</el-radio>
      <el-radio   label="3">未开始</el-radio>
      <el-radio   label="4">考试未合格</el-radio>
			</el-radio-group>

    </el-card>


  <el-col :span="24"><div class="grid-content bg-purple-dark">
 
     <el-table
   :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
    border
    style="width: 100%">
    <el-table-column
      prop="headImg"
      label="头像"
    >
              <template slot-scope="scope">
          <img :src="scope.row.headImg" class="avatar">
        </template>
    </el-table-column>
    <el-table-column
      prop="realName"
      label="真实姓名"
     >
    </el-table-column>
    <el-table-column
      prop="cardId"
      label="身份证号"
      >
    </el-table-column>
      <el-table-column
      prop="jobName"
      label="岗位名称"
       >
    </el-table-column>
      <el-table-column
      prop="busNum"
      label="车牌号码"
       >
    </el-table-column>
      <el-table-column
      prop="linkNum"
      label="联系电话"
     >
    </el-table-column>
       <el-table-column
      prop="status"
      label="培训状态"
     >
       <template slot-scope="scope" >
        <el-tag v-if="scope.row.astatus=='1'" type="danger">未合格</el-tag>
        <el-tag v-else-if="scope.row.astatus=='2'" type="success">培训合格</el-tag>
        <el-tag v-else-if="scope.row.astatus==null" type="danger">未开始</el-tag>
       
      </template>
    </el-table-column>
       <el-table-column
      prop="startTime"
      label="开始时间"
     >
         <template slot-scope="scope" >
        <el-tag v-if="scope.row.startTime==null" type="danger">未开始</el-tag>
        <el-tag v-else>{{scope.row.startTime}}</el-tag>


      </template>
    </el-table-column>
       <el-table-column
      prop="score"
      label="考试分数"
     >
       <template scope="scope">                    
                    <p v-if="scope.row.score==null">暂未考试</p>
                    <p v-if="scope.row.score!=null">{{scope.row.score}}</p>             
                </template>
    </el-table-column>

  <el-table-column
      prop="playtime"
      label="视频观看总时长"
       >
          <template scope="scope">                    
                    <p v-if="scope.row.playtime==null">暂未观看</p>
                    <p v-if="scope.row.playtime!=null">{{scope.row.playtime}}</p>             
                </template>
    </el-table-column>

       <el-table-column
      label="考试详情"
     >
       <template slot-scope="scope" >
        <el-button
        align="center"
          size="mini"
          
          type="danger"
          @click="scorexiangqing(scope.row.aid)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"   
          :page-size="pagesize"       
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">   
        </el-pagination>

    
<el-dialog
  title="考试详情"
  :visible.sync="dialogVisible"
  width="70%"
>
  <span>

 <el-table
    :data="tableData2"
    border
    style="width: 100%">
   <el-table-column
      label="题号"
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="questionType"
      label="题型"
      width="230">
    </el-table-column>
    <el-table-column
      prop="questionTitle"
      label="题目"
      width="250">
    </el-table-column>
    <el-table-column
      prop="options"
      label="选项"
       width="230">
    </el-table-column>
      <el-table-column
      prop="answer"
      label="已选答案"
        width="230">
    </el-table-column>
         <el-table-column
      prop="trueAnswer"
      label="正确答案"
        width="230">
    </el-table-column>
    <el-table-column
      label="判卷"
        width="230">
     <template slot-scope="scope" >
        <el-tag v-if="scope.row.answer==scope.row.trueAnswer" type="success">✔</el-tag>
        <el-tag v-else type="danger">✖</el-tag>
      </template>
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
          dialogVisible: false,
          tableData2:{},
          realName:"",
          aaa:"按姓名",
          radio:"1",
          currentPage:1, //初始页
          pagesize:5,   //    每页的数据
          
        };
    }, 
     mounted(){
      this.id=this.$route.query.value;
      this.tableinit(this.id,"","",1);

     },
      methods: {
        tableinit(id,aaa,realName,radio){
               var a=this;   
             
      		this.$axios.get('http://47.114.1.9/traffic/statistics/statisticsinfo/xiangqing2',{

               params:{
                id:id,
                aaa:aaa,
                realName:realName,
                radio:radio
              
            }

          })
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
                  
      		this.$axios.get('http://47.114.1.9/traffic/statistics/statisticsinfo/corexiangqing?id='+e)
			  .then(function (response) {
                a.tableData2=response.data
                
			  })
			  .catch(function (error) {
			    console.log(error);
			  });


          }
        },
    queryAllStudent(){
    

         var a=this;   
         a.tableinit(a.id,a.aaa,a.realName,a.radio);
    },congzhi(){
        this.radio="1";
        this.realName="";
        this.aaa="按姓名";
        this.tableinit(this.id,"","",1);

    },
               // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        }


      }

}
</script>
<style>

</style>