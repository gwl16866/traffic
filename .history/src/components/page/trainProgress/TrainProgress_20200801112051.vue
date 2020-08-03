<template>

<div>
    <div class="top">
        <el-form ref="form" :model="jindu" label-width="80px">
            <el-select v-model="jindu.years" placeholder="请选择" class="selectClass" @change="clealMonth">
                <el-option
                v-for="(item,index) in years"
                :key="index"
                :value="item.startTime+'年'">
                </el-option>
            </el-select>
        
            <div class="button">
                <el-radio-group v-model="mothons" size="medium" @change="selectTableInfo">
                <el-radio-button :label="1">一月</el-radio-button>
                <el-radio-button :label="2">二月</el-radio-button>
                <el-radio-button :label="3">三月</el-radio-button>
                <el-radio-button :label="4">四月</el-radio-button>
                <el-radio-button :label="5">五月</el-radio-button>
                <el-radio-button :label="6">六月</el-radio-button>
                <el-radio-button :label="7">七月</el-radio-button>
                <el-radio-button :label="8">八月</el-radio-button>
                <el-radio-button :label="9">九月</el-radio-button>
                <el-radio-button :label="10">十月</el-radio-button>
                <el-radio-button :label="11">十一月</el-radio-button>
                <el-radio-button :label="12">十二月</el-radio-button>
                </el-radio-group>
            </div>
        </el-form>
    
        <div class="right">
            <el-button type="primary" round icon="el-icon-printer" class="excelsss" @click="importExcel">导出Excel</el-button>
            <el-button type="primary" round >打印</el-button>
        </div> 
       
    </div>

    <!-- <div class="pro">
        <div>{{jindu.years}}培训计划进度 </div>
        <div class="allpro"> 总进度：（{{okStu}}/{{allStu}}）学员</div>            
        <el-progress :text-inside="true" :stroke-width="12" :percentage="zongJinDu"></el-progress>
    </div> -->

    <el-table :data="tableData" >
        <el-table-column prop="theme,startTime,endTime" width="360" ><!-- :formatter="dateFormat" -->
          <template slot-scope="scope">
            {{scope.row.theme}}
            <div class="sizes">计划时间： {{scope.row.startTime}}~{{scope.row.endTime}} </div>
          </template>
        </el-table-column>

        <el-table-column prop="learnType" width="270">
          <template slot-scope="scope">
            培训类型:{{scope.row.learnType==1?"线上培训":"未知"}}
          </template>
        </el-table-column>
        <el-table-column prop="project,learnTime" width="230">
           <template slot-scope="scope">
            培训科目:{{scope.row.project}}
          </template>
        </el-table-column>

        <el-table-column width="200" >
            <template slot-scope="scope">
                <div>当前进度:（{{scope.row.okProper}}/{{scope.row.allProper}}学员）</div>
              <el-progress :text-inside="true" :stroke-width="12" :percentage="Number(scope.row.okProper/scope.row.allProper*100).toFixed(2)"></el-progress>
            </template>
        </el-table-column>
        
        <el-table-column  width="300">
          <template slot-scope="scope">
            <el-link type="success" @click="selectPXClass(scope.row)">培训课程</el-link>&emsp;&emsp;
            <el-link type="success" @click="selectCanXun(scope.row)">参训学员</el-link>&emsp;&emsp;
            <el-link type="success" >考试详情</el-link>&emsp;&emsp;
          </template>
        </el-table-column>
    </el-table>

<!-- 培训课程弹框 -->
    <!-- <el-dialog title="培训课程" :visible.sync="keChengPopUp" width="50%" center>
      <span>
        <template>
          <el-table :data="AuditInfo" style="width: 100%">
            <el-table-column prop="theme" width="230"></el-table-column>
          </el-table> 
        </template>
      </span>
    </el-dialog> -->

<!-- 参训学员弹框 -->
     <el-dialog title="培训课程" :visible.sync="canXunPopUp"  width="90%" style="height:700px" center >
        <div class="top">  
           <el-form ref="form" :model="canxun" label-width="80px">
                <div class="top" >
                    <div style="margin-top: 2px;">
                        <el-input placeholder="请输入内容" v-model="inputs" class="input-with-select">
                            <el-select v-model="selectValue" slot="prepend" placeholder="请选择" >
                                <el-option label="按姓名" value="realName"></el-option>
                                <el-option label="按联系电话" value="linkNum"></el-option>
                                <el-option label="按身份证号" value="cardId"></el-option>
                                <el-option label="按车牌号码" value="busNum"></el-option>
                                <!-- <el-option label="按群组名称" value="5"></el-option> -->
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" @click="LikeSelects()"></el-button>
                        </el-input>
                    </div>
                    <el-radio-group v-model="radio" class="radioS" @change="LikeSelects">
                        <el-radio :label="0">所有</el-radio>
                        <el-radio :label="2">已完成</el-radio>
                        <el-radio :label="1">未完成</el-radio>
                    </el-radio-group>
                </div>
            </el-form>
        </div>
        <el-table :data="cxInfo" height="250" border style="width: 100%">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column label="头像" width="120">
                <template slot-scope="scope">
                 　<img :src="scope.row.headImg" width="100" height="100" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column prop="realName" label="真实姓名"  width="100"></el-table-column>
            <el-table-column prop="cardId" label="身份证号" width="150"></el-table-column>
            <el-table-column prop="jobName" label="岗位名称" width="140"></el-table-column>
            <el-table-column prop="busNum" label="车牌号码"  width="120"></el-table-column>
            <el-table-column prop="linkNum" label="联系电话" width="100"></el-table-column>
            <el-table-column prop=" " label="群组名称" width="130"></el-table-column>
            <el-table-column prop="completion" label="培训状态"  width="100">
                <template slot-scope="scope">
                　　<div>{{ scope.row.completion==1?'未完成':'已完成' }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="开始时间"  width="160"></el-table-column>
            <el-table-column prop=" " label="考试分数" width="90"></el-table-column>
            <el-table-column label="考试详情"  width="90">
                <el-link type="success" >考试详情</el-link>
            </el-table-column>
            <el-table-column label="学习详情" width="90">
               <el-link type="success" >学习详情</el-link>
            </el-table-column>
        </el-table>
    </el-dialog>


    <!-- 考试详情弹框 -->
     <!-- <el-dialog title="培训课程" :visible.sync="KSDetails" width="50%" center>
        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="date" type="index" width="180"></el-table-column>
            <el-table-column prop="date" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="身份证号"></el-table-column>
            <el-table-column prop="date" label="分数" width="180"></el-table-column>
            <el-table-column prop="name" label="题型"  width="180"></el-table-column>
            <el-table-column prop="address" label="相关图片"></el-table-column>
            <el-table-column prop="date" label="选项" width="180"></el-table-column>
            <el-table-column prop="name" label="已选答案"  width="180"></el-table-column>
            <el-table-column prop="address" label="正确答案"></el-table-column>
            <el-table-column prop="date" label="判卷" width="180"></el-table-column>
        </el-table>
    </el-dialog> -->

</div>

</template>




<script>
export default {

    data(){
        return{
          jindu:{},










            activeIndex2: '1',
            selectValue: 'realName',
            radio:0,
            inputs: '',
            keChengPopUp: false,
            canXunPopUp: false,
            KSDetails: false,
            
            years:[],
            mothons:"",
            dateYears:"0",
            dateMonths:0,
            okStu:0,
            allStu:0,
            zongJinDu:0,
            canxun:"",
            cxInfo:[],
            safeid:"",
            tableData:[],

        }

    },
    
    mounted() {
        this.selectYear();
        this.getYearAndMonth();
        this.selectTableInfo();
    },

    methods:{
      
       handleSelect(key, keyPath) {
         console.log(key, keyPath);
        },
      
      //获取当前年中的当前月
        getYearAndMonth(){
            const that = this;
            let times = new Date()
            let years = that.$moment(times).format('YYYY')//获取当前年
            let months = that.$moment(times).format('M')//获取当前月并截取0之后的字符串
            that.jindu.years=years
            that.dateYears=years
            that.dateMonths=that.$moment(times).format('MM')
            that.mothons=months
        },
        // 查询所有年份
        selectYear(){
            const that = this
            this.$axios.get('http://localhost:8081/trainProgress/selectYear.do')
            .then(res => {
                    that.years = res.data
                })
            .catch(err => {
                    console.log(err)
                })
         },

        // 查询信息填充table表
        async selectTableInfo(){
            const that = this
            this.$axios.get('http://localhost:8081/trainProgress/queryThemTable',{
                params:{
                    Year:that.jindu.years.slice(0,4),
                    Month:that.mothons
                }
            })
            .then(res => {
                that.tableData = res.data
                // that.zongJinDus();
            })
            .catch(err => {
                console.log(err)
            })
        },
        //设置总进度百分百
        zongJinDus(){
            const that = this
            that.allStu=0
            that.okStu=0
            that.$axios.get('http://localhost:8081/trainProgress/allNum.do',{
                    params:{
                        Year:that.jindu.years.slice(0,4),
                        Month:that.mothons
                    }
                })
                .then(res => {
                    that.allStu = res.data
                    that.successNums()
                    console.log(1)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //查询已完成某年月的人数
        successNums(){
            let that = this
            that.$axios.get('http://localhost:8081/trainProgress/successNum.do',{
                 params:{
                    Year:that.jindu.years.slice(0,4),
                    Month:that.mothons
                }
            })
            .then(res => {
                that.okStu = res.data
                that.zongJinDuv()
                console.log(2)
            })
            .catch(err => {
                console.log(err)
            })
        },
        //计算进度条的值
        zongJinDuv(){
            let that = this
            console.log(3)
            if(that.okStu === 0 && that.allStu === 0 ){
                that.zongJinDu=0
            }else{
                that.zongJinDu=parseFloat((that.okStu/that.allStu)*100).toFixed(2);
            }
        },

        //点击年时清空月的信息
        clealMonth(){
            this.mothons=!this.mothons
         },

// 将table数据导出到Excel中
    importExcel(){
        const that = this
        this.$axios.get('http://localhost:8081/trainProgress/exportExcel.do',{
          params:{
             Year:that.jindu.years.slice(0,4),
             Month:that.mothons
            },
            responseType: 'blob'
            })
        .then(res => {
             console.log("导出成功")
             const link = document.createElement('a')
             let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
             link.style.display = 'none'
             link.href = URL.createObjectURL(blob)
             // link.download = res.headers['content-disposition'] //下载后文件名
             link.download = '培训进度表'//下载的文件名
             document.body.appendChild(link)
             link.click()
             document.body.removeChild(link)
           })
        .catch(err => {
                console.log("导出失败")
            })
     },

//    培训课程弹框查询
    selectPXClass(){
        const that = this
        this.keChengPopUp = !this.keChengPopUp
     },
// 参训学员弹框查询
    selectCanXun(id){
        this.safeid=id.id //将传过来的Id放入data中，LikeSelects方法要用
        const that = this
        this.canXunPopUp = !this.canXunPopUp
         that.$axios.get('http://localhost:8081/trainProgress/SelectCXInfo.do',{
             params:{
                 saftyid:id.id
             }
         })
            .then(res => {
                that.cxInfo = res.data
            })
            .catch(err => {
                console.log(err)
            })
     },
// 参训学员内的模糊查询
    LikeSelects(){
        console.log(this.radio)
        const that = this
         that.$axios.get('http://localhost:8081/trainProgress/LikeCXInfo.do',{
             params:{
                 saftyid:that.safeid,
                 selects:that.selectValue,
                 inputs:that.inputs,
                 oneStatus:that.radio
             }
         })
            .then(res => {
                that.cxInfo = res.data
            })
            .catch(err => {
                console.log(err)
            })
     },


// 考试详情弹框查询
    selectKSDetails(){
        const that = this
        this.KSDetails = !this.KSDetails
     }

 }
    
}
</script>


<style>
.top{
    display: flex;
    margin-top: 5px;
}
.right{
    margin-left: 130px;
}
.selectClass{
    width: 160px;
}
.button{
    margin-left: 170px;
    margin-top:-35px ;
}
.pro{
    margin-top: 20px;
}
.allpro{
    margin-left: 200px;
}
.el-select .el-input {
    width: 120px;
  }
.input-with-select{
    width: 370px;

  }

.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
.radioS{
    margin-left: 20px;
    margin-top: 10px;
}  
/* .sizes{
    font-size: 20mm;
    color:darkgrey;
} */
</style>