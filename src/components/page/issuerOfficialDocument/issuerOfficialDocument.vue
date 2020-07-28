<template>
    <div>
        <div>
            <!-- <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>-->

            <el-button
                type="success"
                plain
                icon=" el-icon-circle-plus"
                @click="dialogFormVisible = true"
            >发布公文</el-button>

            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="form" >
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公文号" :label-width="formLabelWidth">
                        <el-input v-model="form.num" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="container">
                            <quill-editor
                                ref="myTextEditor"
                                v-model="content"
                                :options="editorOption"
                            ></quill-editor>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onsubmit()">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="title" label="标题" width="120"></el-table-column>
                <el-table-column property="num" label="公文号" width="120"></el-table-column>
                <el-table-column property="sendCounts" label="下发数"></el-table-column>
                <el-table-column property="readCounts" label="阅读数"></el-table-column>
                <el-table-column property="readTime" label="阅读时长"></el-table-column>
                <el-table-column property="createTime" label="创建时间"></el-table-column>
                <el-table-column property="updateTime" label="修改时间"></el-table-column>
                <el-table-column property="status" label="状态"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">回执</el-button> -->
                        <el-button size="mini" @click="handleUpdate( scope.row)">编辑</el-button>
                        <el-button size="mini" @click="handleyulan( scope.row)">预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currpage"
                :page-sizes="[3, 5, 10, 20]"
                :page-size="3"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableDatasize"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'editor',
    data() {
        return {
            dialogFormVisible: false,
            form: {
                texts: '',
                id: '',
                num: '',
                title: ''
            },
            formLabelWidth: '120px',
            tableData: [],
            tableDatasize: 0,
            pagesize: 3,
            currpage: 1,
            content: '',
            editorOption: {
                placeholder: '请输入内容！！！'
            },
            sdjkf:false,
        };
    },
    components: {
        quillEditor
    },
    mounted() {
        this.onload();
    },
    methods: {
        onsubmit() {
            console.log(this.form.texts);
            var th = this;
            this.$axios
                .get('http://localhost:8081/document/document/insertdocument', {
                    params: {
                        texts: th.content,
                        num: th.form.num,
                        title: th.form.title
                    }
                })
                .then(function (response) {
                    console.log(response);
                    if (response.data.code == 200) {
                        th.$message('提交成功');
                        th.dialogFormVisible = false;
                        th.onload();
                    } else {
                        th.$message('提交失败');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        onload() {
            var th = this;
            this.$axios
                .get('http://localhost:8081/document/document/queryDocument?pagesize=' + th.pagesize + '&currpage=' + th.currpage)
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

            this.onload();
        },

        handleSizeChange(psize) {
            this.pagesize = psize;

            this.onload();
        },
        handleUpdate(row) {
            console.log('*****' + row.id);
            this.dialogFormVisible = true;

            var th = this;
            this.$axios
                .get('http://localhost:8081/document/document/queryByid?id=' + row.id)
                .then(function (response) {
                    console.log(response);
                    th.form = response.data;
                    console.log(response.data.texts);
                    th.content=response.data.texts;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleyulan(row){
console.log('*****' + row.id);
            this.dialogFormVisible = true;
            this.sdjkf=true;

            var th = this;
            this.$axios
                .get('http://localhost:8081/document/document/queryByid?id=' + row.id)
                .then(function (response) {
                    console.log(response);
                    th.form = response.data;
                    console.log(response.data.texts);
                    th.content=response.data.texts;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>


<style scoped>
.el-select .el-input {
    width: 130px;
}
</style>