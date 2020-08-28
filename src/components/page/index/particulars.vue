<template>
    <div>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px">

   <el-col :span="24" style="background:#DCDFE6;"><div class="grid-content bg-purple-dark" style="height:70px;text-align:center; line-height:70px;border:#18a077 solid 1px; ">
    <h3 style="display: inline;">枣阳市光武石化有限公司-{{FullYear}}年培训详情</h3>
    </div></el-col>

  <el-col :span="24"><div class="grid-content bg-purple-dark">
 
      <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
    border
    >
    <el-table-column
    align="center"
      prop="learnType"
      label="培训方式"
     >
       <template slot-scope="scope" >
        <el-tag v-if="scope.row.learnType=='1'" type="danger">线上</el-tag>
        <el-tag v-else-if="scope.row.learnType=='2'" type="success">现场</el-tag>
        <el-tag v-else-if="scope.row.learnType=='3'" type="danger">线上+现场</el-tag>
      </template>
    </el-table-column>
    <el-table-column
    align="center"
      prop="theme"
      label="培训主题"
     >
    </el-table-column>
    <el-table-column
    align="center"
      prop="project"
      label="培训科目"
      >
        <template slot-scope="scope" >
        {{scope.row.project}}<br>
        计划时间: {{scope.row.startTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>{{scope.row.endTime}}
      </template>
     </el-table-column>
      <el-table-column
      align="center"
      prop="count"
      label="培训进度"
       >
      <template slot-scope="scope" >
        当前进度：（{{scope.row.a}}/{{scope.row.b}}）
       <el-progress :percentage="scope.row.jd"></el-progress>
      </template>
    </el-table-column>
    <el-table-column label="学员详情" align="center">
      <template slot-scope="scope" >
        <el-button
        align="center"
          size="mini"
          type="danger"
          @click="xiangqing(scope.row.id)">学员详情</el-button>
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

    </div></el-col>
</el-row>
    </div>
</template>

<script>
export default {

data() {
        return {
          tableData:[],
          FullYear:"",
          currentPage:1, //初始页
          pagesize:5,   //    每页的数据
         
        };
    }, 
     mounted(){
         this.inittableData();
         this.nnn();

     },
      methods: {
            nnn(){
              var date=new Date;
              var y = date.getFullYear()
              this.FullYear=y;
             

        },

          nnn(){
              var date=new Date;
              var y = date.getFullYear()
              this.FullYear=y;
             

        },
             inittableData(){
             var a=this;   
      		this.$axios.get('http://47.114.1.9/traffic/statistics/statisticsinfo/xiangqing')
			  .then(function (response) {
                a.tableData=response.data
                
			  })
			  .catch(function (error) {
			    console.log(error);
			  });


        },
        xiangqing(e){
            this.$router.push({path:'/xyparticulars',query:{value:e}});
        },
           // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
        handleUserList() {
            this.$axios.get('http://47.114.1.9/traffic/statistics/statisticsinfo/xiangqing').then(res => {  //这是从本地请求的数据接口，
                this.tableData = res.body
            })
        }

      }


    
}
</script>
<style>

</style>