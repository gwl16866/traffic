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
                    <el-radio v-model="learnType" label="2" @change="changeLearnType(2)">现场培训</el-radio>
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
                <div v-show="list.learnType==2">培训地点：{{list.address}}</div>
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
                <span v-show="list.status==1">进行中</span>
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

        <el-dialog v-if="dialogProduct" title="参训学员" :visible.sync="dialogProduct">
            <el-table :data="studentList" border style="width: 100%;">
                <el-table-column prop="headImg" label="头像" width="90"></el-table-column>
                <el-table-column prop="realName" label="真实姓名" width="80"></el-table-column>
                <el-table-column prop="cardId" label="身份证号" width="120"></el-table-column>
                <el-table-column prop="busNum" label="车牌号码" width="80"></el-table-column>
                <el-table-column prop="jobName" label="岗位名称" width="80"></el-table-column>
                <el-table-column prop="linkNum" label="联系电话" width="90"></el-table-column>
                <el-table-column label="状态" width="80">
                    <template slot-scope="scope">
                        <span v-show="scope.row.completion==1">
                            <i class="el-icon-circle-close">未完成</i>
                        </span>
                        <span v-show="scope.row.completion==2">
                            <el-button type="text" size="small" icon="el-icon-circle-check">已完成</el-button>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否离职" width="80">
                    <template slot-scope="scope">
                        <span v-show="scope.row.status==1">否</span>
                        <span v-show="scope.row.status==2">是</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
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
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="40" />
                    <el-table-column prop="id" label="编号" width="90"></el-table-column>
                    <el-table-column prop="headImg" label="头像" width="90"></el-table-column>
                    <el-table-column prop="realName" label="真实姓名" width="80"></el-table-column>
                    <el-table-column prop="cardId" label="身份证号" width="120"></el-table-column>
                    <el-table-column prop="jobName" label="岗位名称" width="80"></el-table-column>
                    <el-table-column prop="LinkNum" label="联系电话" width="90"></el-table-column>
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

        <el-dialog v-if="dialogVisiblelession" title="课程" :visible.sync="dialogVisiblelession">
            <el-table :data="lessionlist" border style="width: 100%;">
                <el-table-column prop="id" label="编号" width="90"></el-table-column>
                <el-table-column prop="oneTitle" label="课程名称" width="90"></el-table-column>
                <el-table-column prop="vedio" label="观看" width="80"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import addSafetyEdu from '@/components/page/safetyEdu/addSafetyEdu.vue';
export default {
    components: {
        addSafetyEdu
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
            }
        };
    },
    mounted() {
        this.selectSaftyEdu();
    },
    methods: {
        selectSaftyEdu: function() {
            var qwe = this;
            this.$axios
                .get('http://localhost:8081/saftyEdu/selectSaftyEdu', {
                    params: {
                        learnType: this.learnType
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
                        .get('http://localhost:8081/saftyEdu/deleteSaftyedu?id=' + e)
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
                .get('http://localhost:8081/saftyEdu/classDetailList?id=' + e)
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
                .get('http://localhost:8081/saftyEdu/selectSaftyEdu', {
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
        //查询学员
        selectStudent: function(e) {
            this.dialogProduct = true;
            var qwe = this;
            this.$axios
                .get('http://localhost:8081/saftyEdu/selectStudent?id=' + e)
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
                        .get('http://localhost:8081/saftyEdu/deleteStudent?studentid=' + e.studentid + '&saftyid=' + e.saftyid)
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
                .get('http://localhost:8081/saftyEdu/selectAllStudent?saftyid=' + qwe.zhutiid)
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
                    .get('http://localhost:8081/saftyEdu/batchAddStudent?saftyid=' + qwe.zhutiid + '&batchList=' + qwe.batchList)
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
</style>