<template>
<div>
    <!-- 培训报告 -->
<el-table
     v-show="istable"
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
    <el-table-column
       prop="id"
       label="编号"
       width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="头像"
      width="450">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="姓名"
      width="440">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="身份证号"
      width="440">
    </el-table-column>
      <el-table-column
      prop="createTime"
      label="联系电话"
      width="440">
    </el-table-column>
      <el-table-column
      prop="createTime"
      label="车牌号码"
      width="440">
    </el-table-column>
      <el-table-column
      prop="createTime"
      label="岗位名称"
      width="440">
    </el-table-column>
      <el-table-column
      prop="createTime"
      label="培训内容"
      width="440">
    </el-table-column>
      <el-table-column
      prop="createTime"
      label="培训结果"
      width="440">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="照片状态"
      width="440">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="学习照片"
      width="440">
    </el-table-column>
  <el-table-column
        label="操作"
        width="440"
      >
<template slot-scope="scope">
            <el-button type="primary" size="small" plain  @click="upd(scope.row)" icon="el-icon-edit">编辑</el-button>
          ||  
           <el-button type="danger" @click="del(scope.row,scope.row)" icon="el-icon-delete">删除</el-button>
          || 
           <el-button type="primary" @click="sel(scope.row)" icon="el-icon-view">查看</el-button>
        </template>
      </el-table-column>
      </el-table>


<el-pagination v-show="fen"
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[4,10,20,30,40,50,60,70,80,90,100]"
      :page-size="pagesize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>


</div>
   
</template>




<script>
export default {
    data(){
        return{
             istable: true,
            pagesize: 10,
            currpage: 1,
            tableData: [],
             fen:true,
        }

    },mounted() {
this.loadDate()

    },methods:{
loadDate() {
        var a = this
        this.$axios.get('http://localhost:8081/yearPlan/yearplan/selectYearplan')
            .then(res => {
            a.tableData = res.data
            })
            .catch(err => {
            console.log(err)
            })
    },  handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    handleSelectionChange(val) {
      // this.tableData = res.data
    },

    }
    
}
</script>


<style scoped>

</style>