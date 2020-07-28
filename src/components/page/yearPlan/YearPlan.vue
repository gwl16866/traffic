<template>
<div>
   
   <div v-show="sele" style="margin-top: 15px;">
     <el-select v-model="select" slot="prepend" placeholder="按标题">
      <el-option label="按标题" value="1"></el-option>
    </el-select>
  <el-input placeholder="请输入内容" v-model="name" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"  @click="somebutton()">搜索</el-button>
   </el-input>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;
<div class="lbutton" v-show="lbutton">
<el-button type="primary" @click="xinzeng()" icon="el-icon-plus">新增年度计划</el-button>
<el-button type="primary" @click="jiazai()" icon="el-icon-refresh">加载</el-button>
</div>
<el-table
     v-show="istable"
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
    <el-table-column
       prop="id"
       label="ID"
       width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="大纲"
      width="450">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
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



<el-form
      v-show="isform"
      ref="form"
      :model="year"
      label-width="80px">
      <el-form-item label="大纲">
        <el-input v-model="year.title" />
      </el-form-item>
     
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 内容：</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div> 
        <div class="container">
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
        </div>   
      <el-form-item>
        <el-button
          type="primary"
          @click="onbutton()"
        >
          修改
        </el-button>
        <el-button @click="reback()">取 消</el-button>
      </el-form-item>
    </el-form>
<el-form
      v-show="isform1"
      ref="form"
      :model="year"
      label-width="80px">
      <el-form-item label="大纲">
        <el-input v-model="year.title" disabled/>
      </el-form-item>
     
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 内容：</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div> 
        <div class="container">
            <div class="plugins-tips">
                <h1>不可以修改</h1>
            </div> 
            <quill-editor ref="myTextEditor" disabled v-model="year.bodys" :options="editorOption"></quill-editor>
        </div>   
      <el-form-item>
          <el-button type="danger" plain @click="guanbi()" icon="el-icon-switch-button">关 闭</el-button>
      </el-form-item>
    </el-form>

<el-form
      v-show="addtian"
      ref="form"
      :model="year"
      label-width="80px">
      <div>
      <el-form-item label="大纲">
        <el-input v-model="year.title" />
      </el-form-item>
      </div>
     <div class="crumbs">
     <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 内容：</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div> 
        <div class="container">
            <quill-editor ref="myTextEditor"  v-model="content" :options="editorOption"></quill-editor>
        </div>   
      <el-form-item>
          <el-button @click="add()" >添加</el-button>
          <el-button @click="reback()">取 消</el-button>
      </el-form-item>
    </el-form>

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

  import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
export default {
     name: 'editor',
    data:function(){
        return{
            lbutton:true,
            addtian:false,
            fen:true,
            sele:true,
            isform:false,
            isform1:false,
            istable: true,
            show: false,
            fid: '',
            name:'',
         year: {
            id:'',
            title: '',
            bodys:'', 
            createTime:''
        },
            select: '',
            pagesize: 10,
            currpage: 1,
            tableData: [],
             content: '',
        editorOption: {
        placeholder: 'Hello World'
                }
            }

    },
    components: {
            quillEditor
        },mounted() {
     this.loadDate()

    },methods:{
      
    upd(row) {
        this.year.id=row.id
      this.year.title = row.title
      this.content=row.bodys
      this.istable = false
      this.isform = true 
      this.sele=false
       this.isform1=false
      this.fen=false
      this.lbutton=false,
      console.log(row)
    },
    xinzeng(){
       this.lbutton=false,
      this.istable = false
      this.isform = false 
      this.sele=false
       this.isform1=false
      this.fen=false
      this.addtian=true 
      this.year.title=""
      this.content=""
    },reback(){
                this.$emit("add","reback");
            },
     sel(row) {
      this.lbutton=false,
      this.year = row
      this.istable = false
      this.isform = false 
       this.isform1=true
      this.sele=false
      this.fen=false
      console.log(row)
    },
     loadDate() {
        var a = this
        this.$axios.get('http://localhost:8081/yearPlan/yearplan/selectYearplan')
            .then(res => {
            a.tableData = res.data
            })
            .catch(err => {
            console.log(err)
            })
    },
       jiazai() {
        var a = this
        this.$axios.get('http://localhost:8081/yearPlan/yearplan/selectYearplan')
            .then(res => {
            a.tableData = res.data
            })
            .catch(err => {
            console.log(err)
            })
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },
    handleSelectionChange(val) {
      // this.tableData = res.data
    },
       somebutton() {
		 const a = this
      this.$axios.get('http://localhost:8081/yearPlan/yearplan/selectYearplan', {
        params: {
         title:a.name
        }

      })
        .then(res => {
          a.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
       del: function(c, a) {
          var that = this
      this.$axios.get('http://localhost:8081/yearPlan/yearplan/del', {
        params: {
          id: c.id
        }
      })
    .then(function(response) {
          that.loadDate()
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
     onbutton() {
      var a = this
      this.$axios.get('http://localhost:8081/yearPlan/yearplan/upd', {
        params: {
            id:a.year.id,
          title: a.year.title,
          bodys:a.content
        }

      })
        .then(function(response) {
          a.isform = false
          a.istable = true
          a.sele=true
          a.fen=true
           a.lbutton=true
          a.loadDate()
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

add () {
          let formData = new FormData;
          for(const key in this.year){
         formData.set(key,this.year[key]);
                }
                formData.set('bodys',this.content)
                const that=this;
                this.$axios({
                    method:"post",
                    url:"http://localhost:8081/yearPlan/yearplan/tianjiaYearplan",
                     headers: {
                         "Content-Type": "multipart/form-data"
                     },
                  
                    data:formData
                }).then((res)=>{
                   that.$emit("add","success");
                    that.addtian=false
                    that.istable = true
                    that.sele=true
                    that.fen=true
                    that.lbutton=true
                    that.loadDate()
                });
                   
            },

 guanbi() {
     var a = this

     this.$axios.get('http://localhost:8081/yearPlan/yearplan/selectYearplan')
            .then(res => {
          a.isform=false
          a.isform1 = false
          a.istable = true
          a.sele=true
          a.fen=true
          a.lbutton=true
            a.tableData = res.data
            })
            .catch(err => {
            console.log(err)
            }) 

    },



 reback() {
     var a1 = this

     this.$axios.get('http://localhost:8081/yearPlan/yearplan/selectYearplan')
            .then(res => {
          a1.isform=false
          a1.isform1 = false
          a1.istable = true
          a1.sele=true
          a1.fen=true
          a1.lbutton=true
          a1.addtian=false 
          a1.tableData = res.data
            })
            .catch(err => {
            console.log(err)
            }) 

    },
    }
    
}
</script>


<style scoped>
.el-select {
    width: 130px;
  }
  .el-input{
      width: 500px;
  }  
  .input-with-select .el-input-group__prepend {
    background-color: rgb(242, 249, 247);
  }
  .el-table{
    border-radius: 2px
  }
</style>