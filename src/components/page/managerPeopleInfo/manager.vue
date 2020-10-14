<template>
<div>

    <el-button type="primary" @click="add()">添加</el-button>


    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      >
        <el-table-column label="用户头像" align="center" >
            <template slot-scope="scope">
                <img :src="scope.row.headImg" class="avatar">
            </template>
        </el-table-column>
    <el-table-column
      prop="name"
      label="真实姓名"
     >
    </el-table-column>
    <el-table-column
      prop="cardId"
      label="身份证号"
      >
    </el-table-column>
        <el-table-column
      prop="linkNum"
      label="电话号码"
      >
    </el-table-column>
          <el-table-column
      prop="job"
      label="职位名称"
      >
    </el-table-column>
  
  <el-table-column
        label="操作"
       
      >
<template slot-scope="scope">
            <el-button type="primary" size="small" plain  @click="upd(scope.row)" icon="el-icon-edit">编辑</el-button>
          ||  
           <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
      </el-table>

      <el-pagination 
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5,10,20,30,40,50,60,70,80,90,100]"
      :page-size="pagesize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

     <el-dialog title="添加管理员" :visible.sync="addManager" v-if="addManager" @close="clo()"
     >
         <el-form>

             <el-form-item label="姓名：">
               <el-input v-model="save.name" ></el-input>
             </el-form-item>


                    <el-form-item label="身份证号：">
                    <el-input v-model="save.cardId"></el-input>
             </el-form-item>

                    <el-form-item label="电话：">
                      <el-input v-model="save.linkNum"></el-input>
             </el-form-item>

                    <el-form-item label="职位：">
                         <el-select style="width:400px;" v-model="save.job" filterable placeholder="请选择">
                           <el-option label="安全管理员"     value="安全管理员"></el-option>
                           <el-option label="企业负责人"     value="企业负责人"></el-option>
                        </el-select>
             </el-form-item>
             <el-form-item label="学员头像">
                 <el-upload
                         class="avatar-uploader"
                         :action="uploadUrl"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload"
                 >
                     <img  v-if="save.headImg" :src="save.headImg" class="avatar"/>
                     <i v-else class="el-icon-plus avatar-uploader-icon" />
                 </el-upload>
             </el-form-item>
             <el-button type="primary" @click="okadd">确定添加</el-button>

         </el-form>
   
    </el-dialog>

    <el-dialog title="修改信息" :visible.sync="updateManager" v-if="updateManager"
     >
         <el-form>

             <el-form-item label="姓名：">
               <el-input v-model="saves.name" ></el-input>
             </el-form-item>


                    <el-form-item label="身份证号：">
                    <el-input v-model="saves.cardId"></el-input>
             </el-form-item>

                    <el-form-item label="电话：">
                      <el-input v-model="saves.linkNum"></el-input>
             </el-form-item>

                    <el-form-item label="职位：">
                         <el-select style="width:400px;" v-model="saves.job" filterable placeholder="请选择">
                           <el-option label="安全管理员"     value="安全管理员"></el-option>
                           <el-option label="企业负责人"     value="企业负责人"></el-option>
                        </el-select>
             </el-form-item>
             <el-form-item label="学员头像">
                 <el-upload
                         class="avatar-uploader"
                         :action="uploadUrl"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload"
                 >
                     <img  v-if="saves.headImg" :src="saves.headImg" class="avatar"/>
                     <i v-else class="el-icon-plus avatar-uploader-icon" />
                 </el-upload>
             </el-form-item>
             <el-button type="primary" @click="okupdate">修改</el-button>

         </el-form>
   
    </el-dialog>



</div>
    
</template>

<script>
export default {
    data(){
        return{
            uploadUrl: 'http://47.114.1.9/traffic/studentinfo/uploadFile',
            headImg: '',
            pagesize: 5,
            currpage: 1,
            tableData: [],
            addManager:false,
            updateManager:false,
            save:{
                 name:"",
                 cardId:"",
                 linkNum:"",
                 job:"",
                  headImg: ""
            },
             saves:{
                 name:"",
                 cardId:"",
                 linkNum:"",
                 job:"",
                 headImg: ""
            }
            ,id:""



        }



    },mounted(){
        this.load()

   



    },methods:{
        handleAvatarSuccess(res, file) {
            const currThis = this
            if (res.code == 0) {
                console.log(res.filename)
                currThis.headImg = res.filename
                currThis.$message.success("上传成功")
                currThis.saves.headImg = res.filename
                currThis.save.headImg = res.filename
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
        },
        load(){
                 var that = this
        this.$axios.post('http://47.114.1.9/traffic/manager/selectList')
            .then(res => {
            that.tableData = res.data
            })
            .catch(err => {
            console.log(err)
            })

        },
        clo(){
            this.save.name=""
            this.save.cardId=""
            this.save.linkNum=""
            this.save.job=""
            that.save.headImg=""
        },
        handleCurrentChange(cpage) {
      this.currpage = cpage
    },
    handleSizeChange(psize) {
      this.pagesize = psize
    },add(){
        this.addManager=true
    },okadd(){

         let formData = new FormData;
          for(const key in this.save){
         formData.set(key,this.save[key]);
                }
                const that=this;
                this.$axios({
                    method:"post",
                    url:"http://47.114.1.9/traffic/manager/insert",
                     /* headers: {
                         "Content-Type": "multipart/form-data"
                     }, */
                  
                    data:formData
                }).then((res)=>{
                    if(res.data == true){
                        that.addManager=false
                        that.load()
                            that.save.name=""
                            that.save.cardId=""
                            that.save.linkNum=""
                            that.save.job=""
                            that.save.headImg=""
                            that.$message({
                                            message: '添加成功',
                                            type: 'success'
                                });
                    }else{
                         that.$message({
                                            message: '添加失败',
                                            type: 'error'
                                });
                    }
                  
                });


    },del(ida){

           var that = this
        this.$axios.post('http://47.114.1.9/traffic/manager/delete?id='+ida,
          
        )
            .then(res => {
                  if(res.data == true){
                        that.load()
                            that.$message({
                                            message: '删除成功',
                                            type: 'success'
                                });
                    }else{
                         that.$message({
                                            message: '删除失败',
                                            type: 'error'
                                });
                    }
           

            })
            .catch(err => {
            console.log(err)
            })
    },upd(row){
        this.updateManager=true
        this.saves=row
        this.id=row.id



    },okupdate(){
        const that = this;
          let formData = new FormData;
          for(const key in this.saves){
         formData.set(key,this.saves[key]);
                }
                formData.set("id",that.id);

                 this.$axios({
                    method:"post",
                    url:"http://47.114.1.9/traffic/manager/update",
                     /* headers: {
                         "Content-Type": "multipart/form-data"
                     }, */
                  
                    data:formData
                }).then((res)=>{
                     if(res.data == true){
                                   that.$message({
                                  showClose: true,
                                  duration: 1000,
                                  message: "修改成功",
                                  type: "success"
                                });
                               that.load()
                               that.updateManager=false
                          }
                   
                  
                });

                
    }




    }
    
}
</script>

<style scoped>

</style>