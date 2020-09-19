<template>
    <div>
        <el-form :model="addEdu" :rules="rules" ref="ruleForm" :online="true">
            <template>
                <el-radio v-model="learnType" label="1" value="1" @change="changeLearnType(1)">线上培训</el-radio>
                <!-- <el-radio v-model="learnType" label="2" @change="changeLearnType(2)">现场培训</el-radio>-->
                <el-radio v-model="learnType" label="3" @change="changeLearnType(3)">线上+现场培训</el-radio> 
            </template>
            <br />
            <br />
            <br />
            <el-form-item prop="a1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;培训主题：
                <el-input v-model="addEdu.theme" autocomplete="off" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item prop="a2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;培训时长：
                <el-select v-model="addEdu.learnTime" placeholder="请选择培训时长" style="width:300px">
                    <el-option label="15分钟" value="15分钟"></el-option>
                    <el-option label="20分钟" value="20分钟"></el-option>
                    <el-option label="30分钟" value="30分钟"></el-option>
                    <el-option label="45分钟" value="45分钟"></el-option>
                    <el-option label="1小时" value="1小时"></el-option>
                    <el-option label="90分钟" value="90分钟"></el-option>
                    <el-option label="2小时" value="2小时"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="a3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;培训课程：
                <el-button icon="el-icon-plus" @click="addLession()">选择课程</el-button>
                <el-input v-model="lessionname" autocomplete="off" style="width:300px" readonly></el-input>
                &nbsp;&nbsp;&nbsp;<span v-if="questionCount !=0">题目总数量-{{questionCount}}题，</span>
                <span v-if="vedioSumTime !=0">视频总时长-{{vedioSumTime}}分钟</span>
                <el-input
                    v-model="addEdu.lession"
                    autocomplete="off"
                    style="width:100px"
                    type="hidden"
                ></el-input>
            </el-form-item>
            <el-form-item prop="a4">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参训人员：
                <el-button icon="el-icon-plus" @click="addcanxun()">添加人员</el-button>
                <el-input v-model="studentname" autocomplete="off" style="width:300px" readonly></el-input>
                <el-input
                    v-model="addEdu.student"
                    autocomplete="off"
                    style="width:100px"
                    type="hidden"
                ></el-input>
            </el-form-item>
            <el-form-item prop="a5">
                安全管理人员：
                <el-button icon="el-icon-plus" @click="addguanli()">选择安全管理员</el-button>
                <el-input v-model="addEdu.manager" autocomplete="off" style="width:300px" readonly></el-input>
            </el-form-item>
            <el-form-item prop="a6">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考核人：
                <el-button icon="el-icon-plus" @click="addkaohe()">选择考核人</el-button>
                <el-input
                    v-model="addEdu.testPeople"
                    autocomplete="off"
                    style="width:300px"
                    readonly
                ></el-input>
            </el-form-item>
            <el-form-item prop="a6">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;及格分数：
                <el-input
                    v-model="addEdu.passscore"
                    autocomplete="off"
                    style="width:300px"
                ></el-input><span v-if="questionCount !=0">建议：共{{questionCount}}题，乘以80%，建议取整数过关</span>
            </el-form-item>
            <el-divider></el-divider>线上培训
            <el-form-item prop="a7">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开始时间：
                <template>
                    <div class="block" style=" display: inline">
                        <el-date-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="addEdu.startTime"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </div>
                </template>
            </el-form-item>
            <el-form-item prop="a8">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结束时间：
                <template>
                    <div class="block" style=" display: inline">
                        <el-date-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="addEdu.endTime"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </div>
                </template>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submintSafetyEdu()">确 定</el-button>
            <el-button @click="back()">取 消</el-button>
        </div>
        <el-dialog
            v-if="dialogVisibleaddlession"
            title="添加课程"
            :visible.sync="dialogVisibleaddlession"
            :append-to-body="true"
        >
            <el-form>
                <el-table
                    ref="lessiontable"
                    :data="treelist"
                    border
                    style="width: 100%;"
                    @select="selectlession"
                    @selection-change="handleSelectionlession"
                >
                    <el-table-column type="selection" width="40" />
                    <el-table-column prop="id" label="编号" width="90"></el-table-column>
                    <el-table-column prop="oneTitle" label="视频名称" width="200"></el-table-column>
                      <el-table-column prop="vedioTime" label="时长（分钟）" ></el-table-column>
                      <el-table-column prop="count" label="题目数量" ></el-table-column>
                </el-table>
                <el-button :plain="true" @click="submitlession()">提交</el-button>
                <el-button @click="quxiaolession()">取消</el-button>
            </el-form>
        </el-dialog>
        <el-dialog
            v-if="dialogVisiblecanxun"
            title="添加学员"
            :visible.sync="dialogVisiblecanxun"
            :append-to-body="true"
        >
            <el-form>
                <el-table
                    :data="allStudent"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectioncanxun"
                >
                    <el-table-column type="selection" width="40" />
                    <el-table-column prop="id" label="编号" width="90"></el-table-column>
                    <el-table-column prop="headImg" label="头像" width="90">
                           <template slot-scope="scope">
                            <img :src="scope.row.headImg" class="avatar">
                         </template>
                    </el-table-column>
                    <el-table-column prop="realName" label="真实姓名" width="80"></el-table-column>
                    <el-table-column prop="cardId" label="身份证号" width="120"></el-table-column>
                    <el-table-column prop="jobName" label="岗位名称" width="80"></el-table-column>
                    <!-- <el-table-column prop="LinkNum" label="联系电话" width="90"></el-table-column> -->
                </el-table>
                <el-button :plain="true" @click="submitcanxun()">提交</el-button>
                <el-button @click="quxiao()">取消</el-button>
            </el-form>
        </el-dialog>
        <el-dialog
            v-if="dialogVisibleaddanquan"
            title="选择安全管理员"
            :visible.sync="dialogVisibleaddanquan"
            :append-to-body="true"
        >
            <el-form>
                <el-table
                    ref="multipleTable"
                    @row-click="handleRowClick"
                    :data="guanliyuan"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectionguanli"
                >
                    <el-table-column type="selection" width="40" />
                    <el-table-column prop="id" label="编号" width="90"></el-table-column>
                    <el-table-column prop="headImg" label="头像" width="90">
                           <template slot-scope="scope">
                            <img :src="scope.row.headImg" class="avatar">
                         </template>
                    </el-table-column>
                    <el-table-column prop="realName" label="真实姓名" width="80"></el-table-column>
                    <el-table-column prop="cardId" label="身份证号" width="120"></el-table-column>
                    <el-table-column prop="jobName" label="岗位名称" width="80"></el-table-column>
                   <!--  <el-table-column prop="LinkNum" label="联系电话" width="90"></el-table-column> -->
                </el-table>
                <el-button :plain="true" @click="submitanquan()">提交</el-button>
                <el-button @click="anquan()">取消</el-button>
            </el-form>
        </el-dialog>
        <el-dialog
            v-if="dialogVisibleaddkaohe"
            title="选择考核人"
            :visible.sync="dialogVisibleaddkaohe"
            :append-to-body="true"
        >
            <el-form>
                <el-table
                    ref="multipleTable"
                    @row-click="handleRowClick"
                    :data="kaoheren"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectionkaohe"
                >
                    <el-table-column type="selection" width="40" />
                    <el-table-column prop="id" label="编号" width="90"></el-table-column>
                    <el-table-column prop="headImg" label="头像" width="90">
                           <template slot-scope="scope">
                            <img :src="scope.row.headImg" class="avatar">
                         </template>
                    </el-table-column>
                    <el-table-column prop="realName" label="真实姓名" width="80"></el-table-column>
                    <el-table-column prop="cardId" label="身份证号" width="120"></el-table-column>
                    <el-table-column prop="jobName" label="岗位名称" width="80"></el-table-column>
                   <!--  <el-table-column prop="LinkNum" label="联系电话" width="90"></el-table-column> -->
                </el-table>
                <el-button :plain="true" @click="submitkaohe()">提交</el-button>
                <el-button @click="kaohe()">取消</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aaa: true,
            learnType: '1',
            allStudent: [],
            anquanguanli: [],
            kaoheren: [],
            guanliyuan: [],
            treelist: [],
            lessionList: [],
            lessionname: [],
            studentname: [],
            studentlist: [],
            multipleSelection: [],
            dialogVisibleaddlession: false,
            dialogVisiblecanxun: false,
            dialogVisibleaddkaohe: false,
            dialogVisibleaddanquan: false,
            addEdu: {
                theme: '',
                student:[],
                starTime: '',
                endTime: '',
                lession: '',
                address: '',
                trainteacher: '',
                learnType:1,
                manager: '',
                testPeople: '',
                passscore:''
            },questionCount:0,
              vedioSumTime:0
        };
    },
    mounted() {},
    methods: {
        changeLearnType: function(e) {
            this.$emit('changeLearnType', e);
        },
        back: function() {
            this.$emit('back', 'false');
        },
        //提交整个页面 
        submintSafetyEdu() {
            var qwe = this;
            this.$axios
                .post('http://47.114.1.9/traffic/saftyEdu/addSaftyEdu',
                qwe.addEdu
                )
                .then(function(res=1) {
                    qwe.$message({
                    message: '添加成功',
                    type: 'success'
                });
                qwe.back();
                })
                .catch(function(err) {
                    console.log(err);
                    qwe.$message({
                    message: '添加失败',
                    type: 'error'
                });
                });
        },
        //取消
        quxiaolession: function() {
            this.dialogVisibleaddlession = false;
        },
        quxiao: function() {
            this.dialogVisiblecanxun = false;
        },
        anquan: function() {
            this.dialogVisibleaddanquan = false;
        },
        kaohe: function() {
            this.dialogVisibleaddkaohe = false;
        },
        //添加参训人员
        addcanxun: function() {
            this.dialogVisiblecanxun = true;
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/selectAllStu')
                .then(function(res) {
                    const result = res.data;
                    qwe.allStudent = result.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //循环学员id
        handleSelectioncanxun(val) {
            const bl = new Array();
            const na = new Array();
            val.forEach(row => {
                bl.push(row.id);
                na.push(row.realName);
            });
            this.studentlist = bl;
            this.studentname = na;
        },
        //提交参训
        submitcanxun: function() {
            if (this.studentlist.length == 0) {
                this.$message({
                    showClose: true,
                    duration: 1000,
                    message: '请先选择',
                    type: 'error'
                });
            } else {
                var qwe = this;
                console.log('----------------' + qwe.studentlist);
                qwe.addEdu.student = qwe.studentlist;
                qwe.$message({
                    message: '添加成功',
                    type: 'success'
                });
                qwe.dialogVisiblecanxun = false;
            }
        },
        //添加课程
        addLession: function() {
            var qwe = this;
            qwe.dialogVisibleaddlession = true;
            this.$axios
                .get('http://localhost:8081/saftyEdu/treeList')
                .then(function(res) {
                    qwe.treelist = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //循环课程id
        handleSelectionlession(val) {
            const bl = new Array();
            const na = new Array();
            var c= 0;
            var v= 0;
            val.forEach(row => {
                bl.push(row.id);
                na.push(row.oneTitle);
                c=c+row.count
                v=v+row.vedioTime
            });
             this.questionCount=c
             this.vedioSumTime=v
            this.$message({
                    message: '总时长'+v+'分钟，'+'考试题共'+c+'题',
                    type: 'success'
                });
            this.lessionList = bl;
            this.lessionname = na;
        },
        //提交课程
        submitlession() {
            if (this.lessionList.length == 0) {
                this.$message({
                    showClose: true,
                    duration: 1000,
                    message: '请先选择',
                    type: 'error'
                });
            } else {
                var qwe = this;
                qwe.addEdu.lession = qwe.lessionList;
                qwe.$message({
                    message: '添加成功',
                    type: 'success'
                });
                qwe.dialogVisibleaddlession = false;
            }
        },
        //点击触发
        handleRowClick(row, column, event) {
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        //管理单选安全管理员
        handleSelectionguanli(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop();
            }
            console.log(this.multipleSelection);
        },
        //选择安全管理员
        addguanli: function() {
            this.dialogVisibleaddanquan = true;
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/selectAllStu')
                .then(function(res) {
                    const result = res.data;
                    qwe.guanliyuan = result.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //提交安全管理员
        submitanquan: function() {
            this.addEdu.manager = this.multipleSelection.realName;
            this.$message({
                message: '添加成功',
                type: 'success'
            });
            this.dialogVisibleaddanquan = false;
        },
        //考核人单选
        handleSelectionkaohe(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop();
            }
        },
        //选择考核人
        addkaohe: function() {
            this.dialogVisibleaddkaohe = true;
            var qwe = this;
            this.$axios
                .get('http://47.114.1.9/traffic/saftyEdu/selectAllStu')
                .then(function(res) {
                    const result = res.data;
                    qwe.kaoheren = result.data;
                    for(var i=0;i<qwe.kaoheren.length;i++){
                                if(qwe.kaoheren[i].id == qwe.multipleSelection.id){
                                         qwe.kaoheren.splice(qwe.kaoheren.indexOf(qwe.kaoheren[i]),1)
                                }
                     }
                     

                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        //提交考核人
        submitkaohe: function() {
            this.addEdu.testPeople = this.multipleSelection.realName;
            this.$message({
                message: '添加成功',
                type: 'success'
            });
            this.dialogVisibleaddkaohe = false;
        }
    }
};
</script>
