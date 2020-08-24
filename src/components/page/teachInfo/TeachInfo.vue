<template>
<div>
    <el-container>
  <el-aside width="200px">

<div style="height:600px;width:200px;overflow:auto">
  <div>添加</div>
  <el-button type="danger" style="width:50px" size="mini" @click="addLession">菜单</el-button>
  <el-button type="danger" style="width:50px" size="mini" @click="addLessionKejie">课节</el-button>
  <el-button type="danger" style="width:50px" size="mini" @click="addLittleLes">小节</el-button><br><br>
  <el-button type="danger" style="width:50px" size="mini" @click="addQuestion">题目</el-button>
  <el-divider></el-divider>
      <el-row>
                <el-col :span="24" v-for="cla in leftClassName" :key="cla.id">
                  <span style="cursor: default" @click="handleOpen(cla)">{{cla.classTitle}}</span>
                  <el-divider></el-divider>
                  <br>
                  <br>
                </el-col>
       </el-row>
  </div>
          
      
      </el-aside>
  <el-container>
        <el-header>
            <el-button style="width:300px;" type="default" :disabled="left" @click="peixun">培训课件</el-button>
            <el-button style="width:300px;" type="default" :disabled="right" @click="tiku">题库管理</el-button>
        </el-header>
    <el-main>

<!--添加课节  -->
 <el-dialog
  title="添加课节"
  :visible.sync="addLessionsShow"
  v-if="addLessionsShow"
  width="40%"
  @close="addLessionsShowClose"
  >
  <el-form label-width="100px">
   <el-form-item label="大纲:">
                        <el-select style="width:400px;" v-model="addKejieShowTemp.dagang" filterable placeholder="请选择" @change="dagangChange">
                              <el-option
                                    v-for="item in leftClassName"
                                    :key="item.id"
                                    :label="item.classTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
            </el-form-item>

                <el-form-item label="章节:">
                        <el-select style="width:400px;" v-model="addKejieShowTemp.zhangjie" filterable placeholder="请选择" @change="zhangChange">
                              <el-option
                                    v-for="item in zhang"
                                    :key="item.id"
                                    :label="item.oneTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="大节:">
                     <el-input style="width:400px;" v-model="addKejieShowTemp.dajie" placeholder="请输入大节"></el-input>
                </el-form-item>


                <el-form-item label="小节:">
                       <el-input style="width:400px;" v-model="addKejieShowTemp.xiaojie" placeholder="请输入小节"></el-input>
                </el-form-item>

                <el-form-item label="视频:">
              <el-upload
                    v-model="addKejieShowTemp.shipin"
                    class="upload-demo"
                    action="http://47.114.1.9/traffic/teachInfo/uploadFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">每次只允许上传一个视频！</div>
            </el-upload>
             </el-form-item>

               <el-form-item>
                    <el-button type="primary" @click="addLessionss()">确 定</el-button>
          </el-form-item>

  </el-form>
</el-dialog>


<el-dialog
  title="添加小节"
  :visible.sync="addLittleLesShow"
  v-if="addLittleLesShow"
  width="40%"
  @close="addLittleLesShowClose"
  >
  <el-form label-width="100px">
   <el-form-item label="大纲:">
                        <el-select style="width:400px;" v-model="addLittleLesTemp.big" filterable placeholder="请选择" @change="dagangChange">
                              <el-option
                                    v-for="item in leftClassName"
                                    :key="item.id"
                                    :label="item.classTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
            </el-form-item>

                <el-form-item label="章节:">
                        <el-select style="width:400px;" v-model="addLittleLesTemp.zh" filterable placeholder="请选择" @change="zhangChange">
                              <el-option
                                    v-for="item in zhang"
                                    :key="item.id"
                                    :label="item.oneTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
                </el-form-item>

                 <el-form-item label="节:">
                        <el-select style="width:400px;" v-model="addLittleLesTemp.da" filterable placeholder="请选择" @change="jieChange">
                              <el-option
                                    v-for="item in jie"
                                    :key="item.id"
                                    :label="item.oneTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
            </el-form-item>


                <el-form-item label="小节:">
                       <el-input style="width:400px;" v-model="addLittleLesTemp.xj" placeholder="请输入小节"></el-input>
                </el-form-item>

                <el-form-item label="视频:">
              <el-upload
                    v-model="addLittleLesTemp.sp"
                    class="upload-demo"
                    action="http://47.114.1.9/traffic/teachInfo/uploadFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">每次只允许上传一个视频！</div>
            </el-upload>
             </el-form-item>

               <el-form-item>
                    <el-button type="primary" @click="addLittleLesSubmit()">确 定</el-button>
          </el-form-item>

  </el-form>
</el-dialog>


<el-dialog
  title="添加题目"
  :visible.sync="addQuestionShow"
  v-if="addQuestionShow"
  width="40%"
  @close="addQuestionShowClose"
  >
    <el-form label-width="100px" :inline="true">

             <el-form-item label="大纲:">
                        <el-select style="width:400px;" v-model="questionTemp.classId" filterable placeholder="请选择" @change="dagangChange">
                              <el-option
                                    v-for="item in leftClassName"
                                    :key="item.id"
                                    :label="item.classTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
            </el-form-item>

                <el-form-item label="章节:">
                        <el-select style="width:400px;" v-model="questionTemp.zhangs" filterable placeholder="请选择" @change="zhangChange">
                              <el-option
                                    v-for="item in zhang"
                                    :key="item.id"
                                    :label="item.oneTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
            </el-form-item>

                <el-form-item label="节:">
                        <el-select style="width:400px;" v-model="questionTemp.jies" filterable placeholder="请选择" @change="jieChange">
                              <el-option
                                    v-for="item in jie"
                                    :key="item.id"
                                    :label="item.oneTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
            </el-form-item>

             <el-form-item label="小节:">
                        <el-select style="width:400px;" v-model="questionTemp.xiaojies" filterable placeholder="请选择">
                              <el-option
                                    v-for="item in xiaojie"
                                    :key="item.id"
                                    :label="item.oneTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
            </el-form-item>

            <el-form-item label="题目:">
                  <el-input style="width:400px;" v-model="questionTemp.titles" placeholder="请输入题目"></el-input>
            </el-form-item>

            <el-form-item label="题型:">
                        <el-radio-group v-model="questionTemp.types">
                              <el-radio label="单选题">单选题</el-radio>
                              <el-radio label="多选题">多选题</el-radio>
                        </el-radio-group>
            </el-form-item>
            <br>

            <el-form-item label="A内容:">
                  <el-input style="width:120px;" v-model="questionTemp.a" placeholder="请输入A选项"></el-input>
            </el-form-item>
            <el-form-item label="B内容:">
                  <el-input style="width:120px;" v-model="questionTemp.b" placeholder="请输入B选项"></el-input>
            </el-form-item>
            <el-form-item label="C内容:">
                  <el-input style="width:120px;" v-model="questionTemp.c" placeholder="请输入C选项"></el-input>
            </el-form-item>
            <el-form-item label="D内容:">
                  <el-input style="width:120px;" v-model="questionTemp.d" placeholder="请输入D选项"></el-input>
            </el-form-item>

            <el-form-item label="应选答案:" v-if="questionTemp.types=='单选题'">
                 <el-radio-group v-model="questionTemp.danAnswer">
                              <el-radio label="A">A</el-radio>
                              <el-radio label="B">B</el-radio>
                              <el-radio label="C">C</el-radio>
                              <el-radio label="D">D</el-radio>
                  </el-radio-group>
            </el-form-item>

          <el-form-item label="应选答案:" v-if="questionTemp.types=='多选题'">
                      <el-checkbox-group v-model="questionTemp.duoAnswer">
              <el-checkbox label="A">A</el-checkbox>
              <el-checkbox label="B">B</el-checkbox>
              <el-checkbox label="C">C</el-checkbox>
              <el-checkbox label="D" >D</el-checkbox>
              
            </el-checkbox-group>
          </el-form-item>
                <el-form-item label="分析:">
                  <el-input style="width:400px;" v-model="questionTemp.analyzes" placeholder="请输入分析"></el-input>
            </el-form-item>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-form-item>
                    <el-button type="primary" @click="addTi('ti')">确 定</el-button>
          </el-form-item>

      </el-form>
 
</el-dialog>


      <el-dialog
  title="添加课件"
  :visible.sync="addkejianShow"
  v-if="addkejianShow"
  width="40%"
  @close="addkejianShowClose"
  >
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-button @click="checkAddGang('1')" :disabled="addGang1">选择左菜单</el-button>
  <el-button @click="checkAddGang('2')" :disabled="addGang2">添加新菜单</el-button>
  <br>
  <br>
  
  <div v-if="addGang==true">
<el-form label-width="100px">
       <el-form-item label="大纲:">
                        <el-select style="width:400px;" v-model="addKejianTemp.d1" filterable placeholder="请选择" @change="dagangChange">
                              <el-option
                                    v-for="item in leftClassName"
                                    :key="item.id"
                                    :label="item.classTitle"
                                    :value="item.id">
                              </el-option>
                        </el-select>
       </el-form-item>

         <el-form-item label="章节:">
                  <el-input style="width:400px;" v-model="addKejianTemp.z" placeholder="请输入章节"></el-input>
            </el-form-item>
         <el-form-item label="节:">
                  <el-input style="width:400px;" v-model="addKejianTemp.j" placeholder="请输入节"></el-input>
            </el-form-item>
         <el-form-item label="小节:">
                  <el-input style="width:400px;" v-model="addKejianTemp.xj" placeholder="请输入小节"></el-input>
            </el-form-item>
<el-form-item label="视频:">
              <el-upload
                    v-model="addKejianTemp.ve"
                    class="upload-demo"
                    action="http://47.114.1.9/traffic/teachInfo/uploadFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">每次只允许上传一个视频！</div>
            </el-upload>
</el-form-item>

            <el-form-item>
                    <el-button size="big" type="primary" @click="addKe()">确 定</el-button>
          </el-form-item>

</el-form>
  </div>
   <div v-if="addGang==false">
<el-form label-width="100px">
       <el-form-item label="大纲:">
                  <el-input style="width:400px;" v-model="addKejianTemp.d2" placeholder="请输入大纲"></el-input>
            </el-form-item>
   <el-form-item label="章节:">
                  <el-input style="width:400px;" v-model="addKejianTemp.z" placeholder="请输入章节"></el-input>
            </el-form-item>
         <el-form-item label="节:">
                  <el-input style="width:400px;" v-model="addKejianTemp.j" placeholder="请输入节"></el-input>
            </el-form-item>
         <el-form-item label="小节:">
                  <el-input style="width:400px;" v-model="addKejianTemp.xj" placeholder="请输入小节"></el-input>
            </el-form-item>

          <el-form-item label="视频:">
              <el-upload
                    v-model="addKejianTemp.ve"
                    class="upload-demo"
                    action="http://47.114.1.9/traffic/teachInfo/uploadFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">每次只允许上传一个视频！</div>
            </el-upload>
</el-form-item>

   <el-form-item>
                    <el-button size="big" type="primary" @click="addKe()">确 定</el-button>
          </el-form-item>
</el-form>
  </div>
  
  </el-dialog>




<div v-show="pageCheck==true">
  <div class="mainDiv">
          {{title}}
      </div>

        <span style="cursor: default">序号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;课件名称</span>
        <div style="text-align:center;font-size:30px;" v-if="classDetails == ''">暂无数据</div>
         <div style="text-align:center;font-size:30px;" v-if="title == ''">请点击左侧选择</div>
      <div style="cursor: default" v-for="(item,index) in classDetails" :key="item.id">
            <div >
              <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
           {{index+1}}
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            
            {{item.oneTitle}}
             <el-button type="primary" size="mini" @click='updateTitle(item)'>修改</el-button>&nbsp;&nbsp;
             <el-button type="danger" size="mini" @click='deleteTitle(item.id)'>删除</el-button>
            </div>
            <br>
        <div v-for="item1 in item.list" :key="item1.id">
          <div>
             <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
             &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{item1.oneTitle}} 
             <el-button type="primary" size="mini" @click='updateTitle(item1)'>修改</el-button>&nbsp;&nbsp;
             <el-button type="danger" size="mini" @click='deleteTitle(item1.id)'>删除</el-button>
           
          </div>

           <div v-for="item2 in item1.list" :key="item2.id">
          <div>
             <hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
             &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;
            {{item2.oneTitle}} 
             <el-button type="primary" size="mini" @click='updateTitle(item2)'>修改</el-button>&nbsp;&nbsp;
             <el-button type="danger" size="mini" @click='deleteTitle(item2.id)'>删除</el-button>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button @click='checkVideoFun(item2.vedio)'>观看</el-button>
          
          </div>
          <br>


        </div>  


        </div>  

      </div>
                <!-- //外层的遮罩 v-if用来控制显示隐藏 点击事件用来关闭弹窗 -->
            <div class='mask' v-if='videoState == true' @click='masksCloseFun'></div>
            <!-- //弹窗 -->
            <div class="videomasks" v-if="videoState == true">
            <!-- //视频：h5的视频播放video -->
            
              <video :src='videoSrc' controls='controls' autoplay>
              <!-- 您的浏览器不支持 video 标签。 -->
              </video>
            </div>



</div>
    <el-dialog
  title="修改标题"
  :visible.sync="updateTitleShow"
  v-if="updateTitleShow"
  width="30%"
  >
  <el-input v-model="titles"></el-input>
  <br>
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-button type="primary" @click="updateTitleOk">修改</el-button>
  </el-dialog>
        <div v-show="pageCheck==false">
          <el-table 
            :data="questions"
            border
            style="width: 100%">

        <!-- <el-table-column prop="date" label="序号" width="180"></el-table-column> -->
        <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="50px"></el-table-column>
        <el-table-column prop="oneTitle" label="课件" width="200"></el-table-column>
        <el-table-column prop="questionTitle" label="题目" width="550" ></el-table-column>

       


        <el-table-column prop="questionType" label="题型" width="70"></el-table-column>

        <el-table-column label="答案">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">选项/分析</el-button>
             
            </template>
        </el-table-column>

    </el-table>

    <el-dialog
  title="答案解析"
  :visible.sync="dialogVisible"
  v-if="dialogVisible"
  width="30%"
  >
  <div style="font-size:19px;">试题:<div style="font-size:15px;">{{questionAnswer.questionTitle}}</div></div>
  <br>
   <div style="font-size:19px;">选项:<div style="font-size:15px;">{{questionAnswer.options}}</div></div>
   <br>
    <div style="font-size:19px;">答案:<div style="font-size:15px;">{{questionAnswer.answer}}</div></div>
    <br>
     <div style="font-size:19px;">分析:<div style="font-size:15px;">{{questionAnswer.analyzes}}</div></div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>





   
      </div>

      

        
    
        </el-main>
  </el-container>
</el-container>
</div>
   
</template>




<script>
export default {
    data(){
        return{
            leftClassName:[],
            classDetails:[],
            left:false,
            right:false,
            thisCla:"",
            title:"",
            videoSrc:'',
            videoState:false,
            pageCheck:true,
            questions:[],
            questionAnswer:"",
            dialogVisible:false,
            addQuestionShow:false,
            zhang:[],
            jie:[],
            xiaojie:[],
            questionTemp:{
              classId:"",
              zhangs:"",
              jies:"",
              xiaojies:"",
              titles:"",
              types:"",
              a:"",
              b:"",
              c:"",
              d:"",
              danAnswer:"",
              analyzes:"",
              duoAnswer:[]
            }, 
            addkejianShow:false,
            addGang:true,
            addGang1:true,
            addGang2:false,
            fileList:[],
            addKejianTemp:{
              d1:"",
              d2:"",
              z:"",
              j:"",
              xj:"",
              ve:"",
            },
            addFirstJieShow:false,
            addLessionsShow:false,
            addKejieShowTemp:{
              dagang:"",
              zhangjie:"",
              dajie:"",
              xiaojie:"",
              shipin:""
            },addLittleLesShow:false,
            addLittleLesTemp:{
              big:"",
              zh:"",
              da:"",
              xj:"",
              sp:"",
            },titles:"",
            titlesId:"",
            updateTitleShow:false

        }

    },mounted() {
        this.queryAllTeachinfo()
        this.queryAllQuestion()
        this.loadVedio()
    },methods:{
      updateTitleOk(){
         const that = this;
                     this.$axios
                           .get("http://47.114.1.9/traffic/teachInfo/updateTitle", {
                          params:{
                            id:that.titlesId,
                            title:that.titles
                          }
                        })
                        .then(function(res) {
                          if(res.data == 1){
                                   that.$message({
                                  showClose: true,
                                  duration: 1000,
                                  message: "修改成功",
                                  type: "success"
                                });
                               that.queryClassDetail(that.thisCla);
                               that.updateTitleShow=false
                               that.titles=""
                          }
                        });


      },
      updateTitle(items){
       this.titles=items.oneTitle;
       this.titlesId=items.id;
       this.updateTitleShow=true
      },
      deleteTitle(id){
           
           this.$confirm('标题下若有小的课节，也将会被删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            const that = this;
                     this.$axios
                           .get("http://47.114.1.9/traffic/teachInfo/deleteTitleById", {
                          params:{
                            id:id
                          }
                        })
                        .then(function(res) {
                          if(res.data == 1){
                                   that.$message({
                                  showClose: true,
                                  duration: 1000,
                                  message: "删除成功",
                                  type: "success"
                                });
                               that.queryClassDetail(that.thisCla);

                          }
                        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


      },
      addLittleLesShowClose(){
            this.addLittleLesTemp.big=""
                              this.addLittleLesTemp.zh=""
                              this.addLittleLesTemp.da=""
                              this.addLittleLesTemp.xj=""
                              this.addLittleLesTemp.sp=""
      },
      addLittleLesSubmit(){
                  const that = this;
                     this.$axios
                        .post("http://47.114.1.9/traffic/teachInfo/addLittleLes",
                          that.addLittleLesTemp
                        )
                        .then(function(res) {
                          that.addLittleLesShow=false
                          that.queryAllTeachinfo()
                           that.queryClassDetail(that.thisCla);
                              that.addLittleLesTemp.big=""
                              that.addLittleLesTemp.zh=""
                              that.addLittleLesTemp.da=""
                              that.addLittleLesTemp.xj=""
                              that.addLittleLesTemp.sp=""
                             that.$message({
                                  showClose: true,
                                  duration: 1000,
                                  message: "添加成功",
                                  type: "success"
                                });
                        });
      },
      addLessionss(){
                  const that = this;
                     this.$axios
                        .post("http://47.114.1.9/traffic/teachInfo/addLessionsJie",
                          that.addKejieShowTemp
                        )
                        .then(function(res) {
                          that.addLessionsShow=false
                          that.queryAllTeachinfo()
                           that.queryClassDetail(that.thisCla);
                              that.addKejieShowTemp.dagang=""
                              that.addKejieShowTemp.zhangjie=""
                              that.addKejieShowTemp.dajie=""
                              that.addKejieShowTemp.xiaojie=""
                              that.addKejieShowTemp.shipin=""
                             that.$message({
                                  showClose: true,
                                  duration: 1000,
                                  message: "添加成功",
                                  type: "success"
                                });
                        });
      },
      addLessionsShowClose(){
         this.addKejieShowTemp.dagang=""
         this.addKejieShowTemp.zhangjie=""
         this.addKejieShowTemp.dajie=""
         this.addKejieShowTemp.xiaojie=""
         this.addKejieShowTemp.shipin=""
      },
      uploadSuccess(res){
        console.log(res)
        if(res.code == 0){
           this.$message({
                      showClose: true,
                      duration: 1000,
                      message: "上传成功",
                      type: "success"
                      });
        }
        this.addKejianTemp.ve=res.filename
        this.addKejieShowTemp.shipin=res.filename
        this.addLittleLesTemp.sp=res.filename
      },uploadError(res){
               this.$message({
                      showClose: true,
                      duration: 1000,
                      message: "上传失败，可能文件过大",
                      type: "error"
                      });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      checkAddGang(e){
        if(e==1){
        this.addGang=true
        this.addGang1=true
        this.addGang2=false
        }else{
        this.addGang=false
        this.addGang2=true
        this.addGang1=false
        }
      },
      loadVedio(){
              let myPlayer = this.$video({
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay: "muted",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "800px",
            //设置视频播放器的显示高度（以像素为单位）
            height: "400px"
        });
      },
      addKejianShowClose(){
              this.addKejianTemp.d1=""
                              this.addKejianTemp.d2=""
                              this.addKejianTemp.j=""
                              this.addKejianTemp.xj=""
                              this.addKejianTemp.ve=""
                              this.addKejianTemp.z=""
      },
      addKe(e){
            const that = this;
                     this.$axios
                        .post("http://47.114.1.9/traffic/teachInfo/addLession",
                          that.addKejianTemp
                        )
                        .then(function(res) {
                          that.addkejianShow=false
                          that.queryAllTeachinfo()
                          that.queryClassDetail(that.thisCla)
                               that.addKejianTemp.d1=""
                              that.addKejianTemp.d2=""
                              that.addKejianTemp.j=""
                              that.addKejianTemp.xj=""
                              that.addKejianTemp.ve=""
                              that.addKejianTemp.z=""
                             that.$message({
                                  showClose: true,
                                  duration: 1000,
                                  message: "添加成功",
                                  type: "success"
                                });
                        });

      },
      addTi(e){
            const that = this;
                     this.$axios
                        .post("http://47.114.1.9/traffic/teachInfo/addQues",
                          that.questionTemp
                        )
                        .then(function(res) {
                          that.addQuestionShow=false
                          that.queryAllQuestion()
                           that.queryClassDetail(that.thisCla);
                               that.questionTemp.classId=""
                              that.questionTemp.zhangs=""
                              that.questionTemp.jies=""
                              that.questionTemp.xiaojies=""
                              that.questionTemp.titles=""
                              that.questionTemp.types=""
                              that.questionTemp.a=""
                              that.questionTemp.b=""
                              that.questionTemp.c=""
                              that.questionTemp.d=""
                              that.questionTemp.danAnswer=""
                              that.questionTemp.analyzes=""
                              that.questionTemp.duoAnswer=[]
                             that.$message({
                                  showClose: true,
                                  duration: 1000,
                                  message: "添加成功",
                                  type: "success"
                                });
                        });

      },
      addQuestionShowClose(){
       this.questionTemp.classId=""
       this.questionTemp.zhangs=""
       this.questionTemp.jies=""
       this.questionTemp.xiaojies=""
       this.questionTemp.titles=""
       this.questionTemp.types=""
       this.questionTemp.a=""
       this.questionTemp.b=""
       this.questionTemp.c=""
       this.questionTemp.d=""
       this.questionTemp.danAnswer=""
       this.questionTemp.analyzes=""
       this.questionTemp.duoAnswer=[]
        
      },
             dagangChange(e){
               this.questionTemp.zhangs=""
               this.questionTemp.jies=""
               this.questionTemp.xiaojies=""
                 const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryZhangByClass", {
                          params:{
                            id:e
                          }
                        })
                        .then(function(res) {
                        that.zhang = res.data;
                        });
             }, zhangChange(e){
               this.questionTemp.jies=""
               this.questionTemp.xiaojies=""
                 const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryJieByClass", {
                          params:{
                            id:e
                          }
                        })
                        .then(function(res) {
                        that.jie = res.data;
                        });
             },jieChange(e){
               this.questionTemp.xiaojies=""
                 const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryJieByClass", {
                          params:{
                            id:e
                          }
                        })
                        .then(function(res) {
                        that.xiaojie = res.data;
                        });
             },

             queryAllTeachinfo() {

                    const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryAllTeachinfo", {})
                        .then(function(res) {
                        that.leftClassName = res.data;
                        });
            },
            queryAllQuestion() {

                    const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryAllQuestion", {})
                        .then(function(res) {
                        that.questions = res.data;
                        });
            },       queryAllQuestionById(e) {

                    const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryAllQuestionById", {
                          params:{
                            id:e
                          }
                        })
                        .then(function(res) {
                        that.questions = res.data;
                        });
            },
              queryClassDetail(e) {

                    const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryClassDetail", {
                          params:{
                              cid:e
                          }
                        })
                        .then(function(res) {
                        that.classDetails = res.data;
                        });
            },
              handleOpen(cla) {
              this.title=cla.classTitle
              this.thisCla=cla.id;
              this.queryClassDetail(cla.id);
              this.queryAllQuestionById(cla.id)
              this.left=true
              this.pageCheck=true
           } ,
           peixun(){
             this.pageCheck=true
           },tiku(){
             this.pageCheck=false
             this.left=false
           },
           checkVideoFun(videos){
   		    	this.videoState = true;
            this.videoSrc = videos;
   			},
   			masksCloseFun(){
   			this.videoState = false;
         },
         handleEdit(row){
           this.dialogVisible=true
             const that = this;
                    this.$axios
                        .get("http://47.114.1.9/traffic/teachInfo/queryOneAnswer", {
                          params:{
                            id:row.id
                          }
                        })
                        .then(function(res) {
                        that.questionAnswer = res.data;
                        });
         },
         addLession(){
           this.addkejianShow=true
                 this.addKejianTemp.d1=""
                 this.addKejianTemp.d2=""
                 this.addKejianTemp.j=""
                 this.addKejianTemp.xj=""
                 this.addKejianTemp.ve=""
                 this.addKejianTemp.z=""
         },addLessionKejie(){
            this.addLessionsShow=true
         },addLittleLes(){
            this.addLittleLesShow=true
         }
         ,addQuestion(){
           this.addQuestionShow=true
           this.queryAllTeachinfo()
                 this.addKejianTemp.d1=""
                              this.addKejianTemp.d2=""
                              this.addKejianTemp.j=""
                              this.addKejianTemp.xj=""
                              this.addKejianTemp.ve=""
                              this.addKejianTemp.z=""
         }



    }
    
}
</script>


<style scoped>

  .mainDiv{
    text-align: center;
    font-size:19px
  }


 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .mask{
	position:fixed;
	top:0;
	left:0;
	bottom:0;
	right:0;
	z-index:10;
	background-color: #000000;
    opacity: .6;
}
/* // 内容层 z-index要比遮罩大，否则会被遮盖 */
.videomasks{
    max-width: 1200px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 20;
    transform: translate(-50%,-50%);
  }
  .videomasks video{
    width: 100%;
    height: 100%;
  }



</style>