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

    <div class="pro">
        <div>{{jindu.years}}/{{mothons}}月培训计划进度 </div>
        <div class="allpro"> 总进度：（{{Teachinfo.okProper}}/{{Teachinfo.allProper}}）学员</div>            
        <el-progress :text-inside="true" :stroke-width="12" :percentage="Teachinfo.allProper==0?0:Number(Teachinfo.okProper/Teachinfo.allProper*100).toFixed(2)"></el-progress>
    </div>

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
              <el-progress :text-inside="true" :stroke-width="12" :percentage="scope.row.allProper==0?0:Number(scope.row.okProper/scope.row.allProper*100).toFixed(2)"></el-progress>
            </template>
        </el-table-column>
        
        <el-table-column  width="300">
          <template slot-scope="scope">
            <el-link type="success" @click="queryAllPeiXunClass(scope.row)">培训课程</el-link>&emsp;&emsp;
            <el-link type="success" @click="selectCanXun(scope.row)">参训学员</el-link>&emsp;&emsp;
          </template>
        </el-table-column>
    </el-table>
      <el-dialog title="培训课程" :visible.sync="selectPXClassVisible" width="50%" center>
       
          <template slot-scope="scope">
          
          </template>

          <el-table :data="queryZhuTiClass" style="width: 100%">
            {{project}}
            <el-table-column prop="oneTitle,vedio,vedioTime" label="日期" width="180">
              <template slot-scope="scope">
              <!--  <video src=""></video> -->
              <button @click="checkVideoFun('scope.row.vedio')">
              </button>
                {{scope.row.oneTitle}}
                {{scope.row.vedioTime}}
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
export default {
    data(){
        return{
          selectPXClassVisible:false,
          queryZhuTiClass:[],
          jindu:{},
          years:[],
          mothons:"",
          tableData:[],
          dateYears:"0",
          dateMonths:0,
          Teachinfo:{},
          videoSrc:'',
          videoState:false,
        }
    },
    
    mounted() {
        this.selectYear();
        this.getYearAndMonth();
        this.selectTableInfo();
    },

    methods:{
      		masksCloseFun(){
   		    	this.videoState = false;
         },
         checkVideoFun(videos){
   		    	this.videoState = true;
            this.videoSrc = videos;
   			},
      //查询某一条培训的课程
      queryAllPeiXunClass(zhuti){
        this.selectPXClassVisible = !this.selectPXClassVisible
        const that = this
        this.$axios.get('http://localhost:8081/trainProgress/queryAllPeiXunClass',{
          params:{
            Id: zhuti.id
          }
        })
        .then(res => {
          that.queryZhuTiClass = res.data
        })
        .catch(err => {
          console.log(err)
        })

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
        //点击年时清空月的信息
        clealMonth(){
            this.mothons=!this.mothons
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
                that.queryAllProperAndOkProper();
            })
            .catch(err => {
                console.log(err)
            })
        },
        //查询当前年当前月的总人数/已完成人数
        queryAllProperAndOkProper(){
          const that = this
            this.$axios.get('http://localhost:8081/trainProgress/queryAllProperAndOkProper',{
                params:{
                    Year:that.jindu.years.slice(0,4),
                    Month:that.mothons
                }
            })
            .then(res => {
                that.Teachinfo = res.data
            })
            .catch(err => {
                console.log(err)
            })
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