<template>
    <div>
        <el-row>
            <el-col>
                培训方式：
                <template>
                    <el-radio
                        v-model="learnType"
                        label="9"
                        value="9"
                        @change="changeLearnType(9)"
                    >全部</el-radio>
                    <el-radio v-model="learnType" label="1" @change="changeLearnType(1)">线上培训</el-radio>
                    <el-radio v-model="learnType" label="3" @change="changeLearnType(3)">线上+现场培训</el-radio>
                </template>
                <el-button
                    @click="dialogsubmitProduct = true"
                    class="addAnquan"
                    icon="el-icon-circle-plus"
                >安全培训</el-button>
            </el-col>
            <br />
            <br />
            <br />
            <el-col v-for="list in saftyEduList" :key="list.id">
                培训主题：{{list.theme}}
                <br />
                培训时间：{{list.startTime| dateFormat}}-{{list.endTime| dateFormat}}
                <br />
                <div v-show="list.learnType==3">培训地点：{{list.address}}</div>
                培训时长：{{list.learnTime}}
                <br />培训课程：
                <el-button
                    type="text"
                    size="small"
                    icon="el-icon-s-order"
                    @click="selectlession(list.id)"
                >查看</el-button>
                <br />参训学员：
                <el-button type="text" size="small" @click="selectStudent(list.id)">{{list.count}}人</el-button>
                <el-button
                    type="text"
                    size="small"
                    icon="el-icon-user"
                    @click="addStudent(list.id)"
                >增加学员</el-button>
                安全管理员：{{list.manager}} 考核人：{{list.testPeople}}
                <br />培训状态：
                <span v-show="list.status==1">进行中<el-button @click="dianjijieshu(list.id)">点击结束</el-button></span>
                <span v-show="list.status==2">已结束</span>
                <br />学习方式：
                <span v-show="list.learnType==1">线上</span>
                <span v-show="list.learnType==2">现场</span>
                <span v-show="list.learnType==3">线上+现场</span>
                <el-button
                    class="delete"
                    type="text"
                    size="medium"
                    icon="el-icon-delete"
                    @click="deleteSaftyedu(list.id)"
                ></el-button>
                <el-divider></el-divider>
            </el-col>
        </el-row>

        <el-dialog v-if="dialogProduct" title="参训学员" :visible.sync="dialogProduct" width="70%">
            <el-table :data="studentList" border>
                <el-table-column prop="headImg" label="头像"></el-table-column>
                <el-table-column prop="realName" label="真实姓名" ></el-table-column>
                <el-table-column prop="cardId" label="身份证号" width="150px"></el-table-column>
                <el-table-column prop="busNum" label="车牌号码"></el-table-column>
                <el-table-column prop="jobName" label="岗位名称" ></el-table-column>
                <el-table-column prop="linkNum" label="联系电话" ></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <span v-show="scope.row.completion==1">
                            <i class="el-icon-circle-close">未完成</i>
                        </span>
                        <span v-show="scope.row.completion==2">
                            <el-button type="text" size="small" icon="el-icon-circle-check">已完成</el-button>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否离职" >
                    <template slot-scope="scope">
                        <span v-show="scope.row.status==1">否</span>
                        <span v-show="scope.row.status==2">是</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="deleteStudent(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog v-if="dialogVisibleadd" title="添加学员" :visible.sync="dialogVisibleadd">
            <el-form>
                <el-table
                    :data="allStudent"
                    border
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection"  />
                    <el-table-column prop="id" label="编号" ></el-table-column>
                    <el-table-column prop="headImg" label="头像" ></el-table-column>
                    <el-table-column prop="realName" label="真实姓名" ></el-table-column>
                    <el-table-column prop="cardId" label="身份证号" ></el-table-column>
                    <el-table-column prop="jobName" label="岗位名称" ></el-table-column>
                    <el-table-column prop="LinkNum" label="联系电话" ></el-table-column>
                </el-table>
                <el-button :plain="true" @click="submitStudent()">添加</el-button>
                <el-button @click="quxiao()">取消</el-button>
            </el-form>
        </el-dialog>

        <el-dialog
            title="培训课程"
            :visible.sync="dialogsubmitProduct"
            v-if="dialogsubmitProduct"
            width="60%"
        >
            <addSafetyEdu @back="listener" @changeLearnType="tiaozhuan"></addSafetyEdu>
        </el-dialog>
        <el-dialog
            title="培训课程"
            :visible.sync="dialogsubmitProductCopy"
            v-if="dialogsubmitProductCopy"
            width="60%"
        >
            <addSafetyEduCopy @back="listener1" @changeLearnType="tiaozhuan"></addSafetyEduCopy>
        </el-dialog>

        <el-dialog v-if="dialogVisiblelession" title="课程" :visible.sync="dialogVisiblelession" >
            <el-table :data="lessionlist" border >
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="oneTitle" label="课程名称" ></el-table-column>
                <el-table-column label="视频" >
                    <template slot-scope="scope">
                        <el-button @click="checkVideoFun(scope.row.vedio)">观看</el-button>
                    </template>
                </el-table-column>
            </el-table>
                         <!-- //外层的遮罩 v-if用来控制显示隐藏 点击事件用来关闭弹窗 -->
            <div class='mask' v-if='videoState == true' @click='masksCloseFun'></div>
            <!-- //弹窗 -->
            <div class="videomasks" v-if="videoState == true">
            <!-- //视频：h5的视频播放video -->
            
              <video :src='videoSrc' controls='controls' autoplay>
              <!-- 您的浏览器不支持 video 标签。 -->
              </video>
            </div>
        </el-dialog>
      
    </div>
</template>

<script>
import addSafetyEdu from '@/components/page/safetyEdu/addSafetyEdu.vue';
import addSafetyEduCopy from '@/components/page/safetyEdu/addSafetyEduCopy.vue';
export default {
    components: {
        addSafetyEdu,
        addSafetyEduCopy
    },
    data() {
        return {
            studentList: [],
            saftyEduList: [],
            batchList: [],
            allStudent: [],
            lessionlist: [],
            learnType: '9',
            zhutiid: '',
            dialogVisibleadd: false,
            dialogsubmitProduct: false,
            dialogsubmitProductCopy:false,
            dialogVisiblelession: false,
            dialogProduct: false,
            addEdu: {
                theme: '',
                starTime: '',
                endTime: '',
                lession: '',
                address: '',
                trainteacher: '',
                learnType: '',
                manager: '',
                testPeople: ''
            },
            videoState:false,
            videoSrc:""

        };
    },
    mounted() {
        this.selectSaftyEdu();
        this.loadVedio();
    },
    methods: {
        //结束
        dianjijieshu: function(e) {
            this.$confirm('确定结束当前培训?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    var qwe = this;
                    this.$axios
                        .get('http://47.114.1.9/traffic/saftyEdu/dianjijieshu?id=' + e)
                        .then(function(res = 1) {
                            qwe.$message({
                                message: '结束成功',
                                type: 'success'
                            });
                            qwe.selectSaftyEdu();
                        })
                        .catch(function(err) {
                            console.log(err);
                            qwe.$message({
                                message: '结束失败',
                                type: 'error'
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        showClose: true,
                        duration: 1000,
                        message: '已取消结束'
                    });
                });
        },
        	masksCloseFun(){
   			this.videoState = false;
         },
        selectSaftyEdu: function() {
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/selectSaftyEdu', {
                    params: {
                        learnType: qwe.learnType
                    }
                })
                .then(function(res) {
                    const result = res.data;
                    qwe.saftyEduList = result.data;
                    qwe.totalSize = result.dataSize;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        checkVideoFun(videos) {
            this.videoState = true;
            this.videoSrc = videos;
        },
        loadVedio() {
            let myPlayer = this.$video({
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: 'muted',
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: 'auto',
                //设置视频播放器的显示宽度（以像素为单位）
                width: '800px',
                //设置视频播放器的显示高度（以像素为单位）
                height: '400px'
            });
        },
        //删除培训
        deleteSaftyedu: function(e) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    var qwe = this;
                    this.$axios
                        .get('http://47.114.1.9/traffic/saftyEdu/deleteSaftyedu?id=' + e)
                        .then(function(res = 1) {
                            qwe.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            qwe.selectSaftyEdu();
                        })
                        .catch(function(err) {
                            console.log(err);
                            qwe.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        showClose: true,
                        duration: 1000,
                        message: '已取消删除'
                    });
                });
        },
        //查看课程
        selectlession: function(e) {
            this.dialogVisiblelession = true;
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/classDetailList?id=' + e)
                .then(function(res) {
                    qwe.lessionlist = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        changeLearnType: function(e) {
            console.log('-----' + e);
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/selectSaftyEdu', {
                    params: {
                        learnType: e
                    }
                })
                .then(function(res) {
                    const result = res.data;
                    qwe.saftyEduList = result.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        changelt: function(e) {
            this.lt = e;
            console.log('=======' + this.lt);
        },
        listener: function(val) {
            if (val == 'false') {
                this.dialogsubmitProduct = false;
                this.selectSaftyEdu();
            }
        },
         listener1: function(val) {
            if (val == 'false') {
                this.dialogsubmitProductCopy = false;
                this.selectSaftyEdu();
            }
        },
        //查询学员
        selectStudent: function(e) {
            this.dialogProduct = true;
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/selectStudent?id=' + e)
                .then(function(res) {
                    const result = res.data;
                    qwe.studentList = result.data;
                    qwe.selectSaftyEdu();
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //删除学员
        deleteStudent(e) {
            this.$confirm('确定删除该学员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    const asd = this;
                    this.$axios
                        .get('http://47.114.1.9/traffic/saftyEdu/deleteStudent?studentid=' + e.stuId + '&saftyid=' + e.saftyid)
                        .then(function(res = 1) {
                            asd.selectStudent(e.saftyid);
                            asd.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            asd.selectSaftyEdu();
                        })
                        .catch(function(err) {
                            asd.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                            console.log(err);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        showClose: true,
                        duration: 1000,
                        message: '已取消删除'
                    });
                });
        },
        //添加学员
        addStudent: function(e) {
            this.zhutiid = e;
            this.dialogVisibleadd = true;
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/selectAllStudent?saftyid=' + qwe.zhutiid)
                .then(function(res) {
                    const result = res.data;
                    qwe.allStudent = result.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //取消
        quxiao: function() {
            (this.dialogVisibleadd = false), (this.batchList = '');
        },
        //循环id
        handleSelectionChange(val) {
            const bl = new Array();
            val.forEach(row => {
                bl.push(row.id);
            });
            this.batchList = bl;
        },
        //批量添加
        submitStudent() {
            if (this.batchList.length == 0) {
                this.$message({
                    showClose: true,
                    duration: 1000,
                    message: '请先选择',
                    type: 'error'
                });
            } else {
                var qwe = this;
                console.log('qwe.zhutiid' + qwe.zhutiid + '----------------' + qwe.batchList);
                this.$axios
                    .get('http://47.114.1.9/traffic/saftyEdu/batchAddStudent?saftyid=' + qwe.zhutiid + '&batchList=' + qwe.batchList)
                    .then(function(res = 1) {
                        qwe.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        qwe.dialogVisibleadd = false;
                        qwe.selectSaftyEdu();
                    })
                    .catch(function(err) {
                        console.log(err);
                        qwe.$message({
                            message: '添加失败',
                            type: 'error'
                        });
                    });
            }
        },
        //跳转
        tiaozhuan(e){
if(e==1){
this.dialogsubmitProduct=true
this.dialogsubmitProductCopy=false
}else if(e==3){
this.dialogsubmitProduct=false
this.dialogsubmitProductCopy=true
}
        }
    }
};
</script>
<style scoped>
.addAnquan {
    position: absolute;
    right: 30px;
}
.el-icon-circle-close {
    color: darkgray;
}
.delete {
    color: red;
    position: absolute;
    right: 30px;
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