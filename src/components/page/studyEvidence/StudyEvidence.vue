<template>
    <el-tabs type="border-card" style="height:100%">
        <el-tab-pane label="月度证明">
            <el-container>
                <el-header style="height:80%">
                    <el-container>
                        <el-main>
                            <div>
                                <div class="block">
                                    <span>选择月份：</span>
                                    <el-date-picker
                                        v-model="yuefen"
                                        type="month"
                                        placeholder="选择月份："
                                    ></el-date-picker>
                                    <el-button round @click="tijiaoshijian">根据月份查询</el-button>
                                    <el-button round @click="onloadsaftyEdu()">查看全部</el-button>
                                </div>
                                <div>
                                    <el-table
                                        ref="multipleTable"
                                        :data="tableData"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        border
                                        @selection-change="handleSelectionChange"
                                    >
                                        <el-table-column type="selection"></el-table-column>

                                        <el-table-column prop="theme" label="培训名称"></el-table-column>
                                        <el-table-column prop="learnType" label="培训类型"></el-table-column>
                                        <el-table-column sortable label="开始时间">
                                            <template slot-scope="scope">{{ scope.row.startTime }}</template>
                                        </el-table-column>
                                        <el-table-column label="结束时间">
                                            <template slot-scope="scope">{{ scope.row.endTime }}</template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="block">
                                    <el-pagination
                                        background
                                        layout="prev, pager, next, sizes, total, jumper"
                                        :page-sizes="[3,5, 10, 15, 20]"
                                        :page-size="pagesize"
                                        :total="tableDatasize"
                                        @current-change="handleCurrentChange"
                                        @size-change="handleSizeChange"
                                    ></el-pagination>
                                </div>
                            </div>
                        </el-main>

                        <el-main v-if="ifmain">
                            <div class="block">
                                <el-input
                                    placeholder="请输入内容"
                                    v-model="neirong"
                                    class="input-with-select"
                                >
                                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                                        <el-option label="姓名" value="realName"></el-option>
                                        <el-option label="身份证号" value="cardId"></el-option>
                                        <el-option label="车牌号" value="busName"></el-option>
                                    </el-select>
                                </el-input>
                                <el-button @click="xialashuru" icon="el-icon-search"></el-button>
                            </div>
                            <div>
                                <el-table
                                    :data="tableData2"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange2"
                                >
                                    <el-table-column type="selection"></el-table-column>

                                    <el-table-column prop="headImg" width="100px" label="头像">
                                        <img src alt />
                                    </el-table-column>
                                    <el-table-column prop="realName" width="100px" label="真实姓名"></el-table-column>
                                    <el-table-column prop="cardId" width="100px" label="身份证号"></el-table-column>
                                    <el-table-column prop="busNum" width="100px" label="车牌号"></el-table-column>
                                </el-table>
                            </div>
                            <div class="block">
                                <el-pagination
                                    background
                                    layout="prev, pager, next, sizes, total, jumper"
                                    :page-sizes="[3,5, 10, 15, 20]"
                                    :page-size="pagesize2"
                                    :total="tableDatasize2"
                                    @current-change="handleCurrentChange2"
                                    @size-change="handleSizeChange2"
                                ></el-pagination>
                            </div>
                        </el-main>
                    </el-container>
                </el-header>
                <!-- <el-footer style="height:10%">
                    <el-button type="success" @click="dayin()" plain>下载</el-button>
                </el-footer> -->
            </el-container>
        </el-tab-pane>
        <el-tab-pane label="自定义查询证明">
            <el-container>
                <el-header style="height:80%">
                    <div class="block">
                        <span>开始日期</span>
                        <el-date-picker v-model="kaishiriqi" type="date" placeholder="选择日期"></el-date-picker>

                        <span>结束日期</span>
                        <el-date-picker v-model="jieshuriqi" type="date" placeholder="选择日期"></el-date-picker>

                        <el-input placeholder="请输入内容" v-model="input01" class="input-with-select">
                            <el-select v-model="select01" slot="prepend" placeholder="请选择">
                                <el-option label="餐厅名" value="1"></el-option>
                                <el-option label="订单号" value="2"></el-option>
                                <el-option label="用户电话" value="3"></el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div>
                        <el-table
                            :data="tableData3"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange3"
                        >
                            <el-table-column type="selection" width="55"></el-table-column>

                            <el-table-column prop="headImg" label="头像" width="150">
                                <img src alt />
                            </el-table-column>
                            <el-table-column prop="realName" label="姓名" width="140"></el-table-column>
                            <el-table-column prop="cardId" label="身份证号" width="150"></el-table-column>
                            <el-table-column prop="linkNum" label="联系电话" width="140"></el-table-column>
                            <el-table-column prop="busNum" label="车牌号" width="140"></el-table-column>
                            <el-table-column prop="jobName" label="岗位名称" width="150"></el-table-column>
                            <el-table-column prop="ffff" label="群组名称" width="140"></el-table-column>
                            <el-table-column label="创建时间" width="150">
                                <template slot-scope="scope">{{ scope.row.createTime }}</template>
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                width="150"
                                :filters="[{ text: '激活', value: '0' }, { text: '禁用', value: '1' },{text:'离职',value:'2'}]"
                                filter-placement="bottom-end"
                            >
                                <template slot-scope="scope">
                                    <el-tag
                                        :type="scope.row.status === '0' ? 'success' : 'danger'"
                                        disable-transitions
                                    >{{scope.row.status}}</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="block">
                        <el-pagination
                            background
                            layout="prev, pager, next, sizes, total, jumper"
                            :page-sizes="[3,5, 10, 15]"
                            :page-size="pagesize3"
                            :total="tableDatasize3"
                            @current-change="handleCurrentChange3"
                            @size-change="handleSizeChange3"
                        ></el-pagination>
                    </div>
                </el-header>
                <el-footer style="height:10%">
                    <el-button type="success" @click="dayin()" plain>成功按钮</el-button>
                </el-footer>
            </el-container>
        </el-tab-pane>
        <div></div>
    </el-tabs>
</template>




<script>


export default {
    components: {
    },
    data() {
        return {
            dayinpanduan: false,
            yuefen: '',
            yuefenfromet: '',
            neirong: '',
            select: '',
            ifmain: false,
            tableData: [],
            tableDatasize: 0,
            pagesize: 3,
            currpage: 1,
            yuefebfeye: 1,
            tableData2: [],
            tableDatasize2: 0,
            pagesize2: 3,
            currpage2: 1,
            multipleSelection: [],
            dayinshuzu: [],
            tableData3: [],
            tableDatasize3: 0,
            pagesize3: 3,
            currpage3: 1,
            pdfTop: 40,

            showTips: true
        };
    },
    mounted() {
        this.onload();
        this.onloadsaftyEdu();
    },
    methods: {
        onload() {
            var th = this;
            this.$axios
                .get(
                    'http://localhost:8081/studyEvidence/saftyedu/queryStudentinfo?pagesize=' +
                        this.pagesize3 +
                        '&currpage=' +
                        this.currpage3
                )
                .then(function (response) {
                    console.log(response);
                    th.tableData3 = response.data.data;
                    th.tableDatasize3 = response.data.count;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        onloadsaftyEdu() {
            this.yuefen = '';
            var th = this;
            this.$axios
                .get('http://localhost:8081/saftyEdu/querySaftyedu?pagesize=' + this.pagesize + '&currpage=' + this.currpage)
                .then(function (response) {
                    console.log(response);
                    th.tableData = response.data.data;
                    th.tableDatasize = response.data.count;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleCurrentChange(cpage) {
            this.currpage = cpage;
            if (this.yuefen == '') {
                this.currpage = cpage;
                this.onloadsaftyEdu();
            } else {
                this.yuefebfeye = cpage;
                this.tijiaoshijian();
            }
        },

        handleSizeChange(psize) {
            this.pagesize = psize;
            if (this.yuefen == '') {
                this.onloadsaftyEdu();
            } else {
                this.tijiaoshijian();
            }
        },
        handleCurrentChange2(cpage) {
            this.currpage2 = cpage;
            this.queryStudentByid();
        },

        handleSizeChange2(psize) {
            this.pagesize2 = psize;
            this.queryStudentByid();
        },
        handleCurrentChange3(cpage) {
            this.currpage3 = cpage;
            this.onload();
        },

        handleSizeChange3(psize) {
            this.pagesize3 = psize;
            this.onload();
        },
        tijiaoshijian() {
            if (this.yuefen == '') {
                this.$message('未选择时间');
            } else {
                var th = this;

                if (this.yuefenfromet == '') {
                    this.yuefenfromet =
                        this.yuefen.getFullYear() +
                        '-' +
                        (this.yuefen.getMonth() + 1) +
                        '-' +
                        this.yuefen.getDate() +
                        ' ' +
                        this.yuefen.getHours() +
                        ':' +
                        this.yuefen.getMinutes() +
                        ':' +
                        this.yuefen.getSeconds();
                }

                this.$axios
                    .get(
                        'http://localhost:8081/saftyEdu/querySaftyeduMonth?yuefen=' +
                            this.yuefenfromet +
                            '&pagesize=' +
                            this.pagesize +
                            '&currpage=' +
                            this.yuefebfeye
                    )
                    .then(function (response) {
                        th.tableData = response.data.data;
                        th.tableDatasize = response.data.count;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },

        handleSelectionChange(val) {
            var th = this;
            if (val.length > 0) {
                th.ifmain = true;
                th.dayinshuzu = [];
                if (val.length > 1) {
                    th.$refs.multipleTable.clearSelection();
                    th.$refs.multipleTable.toggleRowSelection(val.pop());
                } else {
                    th.multipleSelection = val.pop();
                }

                console.log(th.multipleSelection);
                this.$axios
                    .get(
                        'http://localhost:8081/saftyEdu/queryStudentByid?said=' +
                            th.multipleSelection.id +
                            '&pagesize=' +
                            this.pagesize2 +
                            '&currpage=' +
                            this.currpage2
                    )
                    .then(function (response) {
                        th.tableData2 = response.data.data;
                        th.tableDatasize2 = response.data.count;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.multipleSelection == '';
                th.ifmain = false;
                th.dayinshuzu = [];
            }
        },
        handleSelectionChange2(val) {
            var arr = new Array();
            for (var i = 0; i < val.length; i++) {
                arr[i] = val[i].id;
            }

            this.dayinshuzu = arr;
        },
        handleSelectionChange3(val) {
            var arr = new Array();
            for (var i = 0; i < val.length; i++) {
                arr[i] = val[i].id;
            }

            this.dayinshuzu = arr;
        },
        dayin() {
            var th = this;
            if (this.dayinshuzu == '') {
                this.$message('没有可打印的东风西');
            } else if (this.multipleSelection == '') {
                this.$axios
                    .get('http://localhost:8081/saftyEdu/genjustuxiazaipdf?arr=' + this.dayinshuzu)
                    .then(function (response) {
                        th.$message('已下载到本地');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.$axios
                    .get('http://localhost:8081/saftyEdu/xiazaipdf?arr=' + this.dayinshuzu + '&said=' + this.multipleSelection.id)
                    .then(function (response) {
                        th.$message('已下载到本地');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        xialashuru() {
            console.log();
            this.dayinshuzu = '';
            var th = this;
            this.$axios
                .get(
                    'http://localhost:8081/saftyEdu/queryByid?said=' +
                        th.multipleSelection.id +
                        '&select=' +
                        th.select +
                        '&neirong=' +
                        th.neirong +
                        '&pagesize=' +
                        this.pagesize2 +
                        '&currpage=' +
                        this.currpage2
                )
                .then(function (response) {
                    th.tableData2 = response.data.data;
                    th.tableDatasize2 = response.data.count;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        queryStudentByid() {
            var th = this;
            this.$axios
                .get(
                    'http://localhost:8081/saftyEdu/queryStudentByid?said=' +
                        th.multipleSelection.id +
                        '&pagesize=' +
                        this.pagesize2 +
                        '&currpage=' +
                        this.currpage2
                )
                .then(function (response) {
                    th.tableData2 = response.data.data;
                    th.tableDatasize2 = response.data.count;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>
<style>
.el-select .el-input {
    width: 130px;
}
</style>