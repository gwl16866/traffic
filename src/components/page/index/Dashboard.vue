<template>

    <div>
       <!-- <div id="zxcolumn" style="width:100%; height: 350px;"></div> -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px">
        <div id="zxcolumn" style="width:100%; height: 350px;"></div>
    </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                  <div id="zxcolumn" style="width:100%; height: 350px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row> -->

  <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px">
       <div id="bbcolumn" style="width:100%; height: 350px;"></div>
        <el-table
    :data="tableData"
    border
   >
    <el-table-column
      align="center"
      prop="learning"
      label="学习方式"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="num"
      label="报名总人数"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="percentage"
      label="完成率(%)"
       >
    </el-table-column>
  </el-table>
    </el-row>
    
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:15px">

   <el-col :span="24" style="background:#DCDFE6;"><div class="grid-content bg-purple-dark" style="height:70px;text-align:center; line-height:70px;border:#18a077 solid 1px; ">
    <h3 style="display: inline;">下属企业培训统计-{{FullYear}}年</h3>
    </div></el-col>

  <el-col :span="24"><div class="grid-content bg-purple-dark">
 
      <el-table
    :data="tableData2"
    border
  >
    <el-table-column
    align="center"
      prop="name"
      label="企业名称"
     >
    </el-table-column>
    <el-table-column
    align="center"
      prop="wcl"
      label="完成率(%)"
     >
    </el-table-column>
    <el-table-column
    align="center"
      prop="jhs"
      label="培训计划数"
      >
    </el-table-column>
      <el-table-column
      align="center"
      prop="count"
      label="报名总人次"
       >
    </el-table-column>
      <el-table-column
      align="center"
      prop="okcount"
      label="完成总人次"
       >
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope" >
        <el-button
        align="center"
          size="mini"
          
          type="danger"
          @click="handleDelete(scope.row.id)">查看详情</el-button>
      </template>
    </el-table-column>
     
  </el-table>

    </div></el-col>
</el-row>

    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../../common/bus';
 import echarts from 'echarts'
 
export default {
    name: 'dashboard',
    data() {
        return {
            tableData:[],
            tableData2:[],
            thenumbers:[],
            thenumbers2:[],
            Bchar1:{},
            Bchar2:{},
            Bchar3:{},
            FullYear:""
          
        };
    },
    mounted(){
            //1-12月培训人数
            this.thenumber();
            this.Bchar1info();
            this.Bchar1info2();
            this.Bchar1info3();
            this.inittableData();
            this.inittableData2();

            this.nnn();

            //this.mqbbcolumns();
    },
    
componentWillReceiveProps() {
   this.mqbbcolumns();
}
 ,
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
  
    methods: {
         nnn(){
              var date=new Date;
              var y = date.getFullYear()
              this.FullYear=y;
             

        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        handleDelete(){
           this.$router.push({path:'/particulars'});
        },
        inittableData2(){

              var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/inittableData2')
			  .then(function (response) {
                a.tableData2=response.data
                
			  })
			  .catch(function (error) {
			    console.log(error);
			  });



        },
        inittableData(){


             var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/inittableData')
			  .then(function (response) {
                a.tableData=response.data
                
			  })
			  .catch(function (error) {
			    console.log(error);
			  });


        },
        Bchar1info(){
            
                var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/Bchar1')
			  .then(function (response) {
                a.Bchar1=response.data
                
                a.mqbbcolumns();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });

        },
           Bchar1info2(){
            
                var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/Bchar2')
			  .then(function (response) {
                a.Bchar2=response.data
                
                a.mqbbcolumns();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });

        },
           Bchar1info3(){
            
                var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/Bchar3')
			  .then(function (response) {
                a.Bchar3=response.data
                //alert(response)
                a.mqbbcolumns();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });

        },
        thenumber(){

            var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/year')
			  .then(function (response) {
                a.thenumbers2=response.data
                a.thenumber2();
                a.mqZxcolumns();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
        },
        thenumber2(){

            var a=this;   
      		this.$axios.get('http://localhost:8081/statistics/statisticsinfo/thenumber')
			  .then(function (response) {
                a.thenumbers=response.data
                a.mqZxcolumns();
			  })
			  .catch(function (error) {
			    console.log(error);
			  });


        },
           mqZxcolumns(){
    
         var a=this;
         this.zxcolumns = echarts.init(document.getElementById('zxcolumn'));
         this.zxcolumns.setOption({

                    title: {
        text:a.FullYear+'年培训人次统计',
        subtext: '(不含子公司)'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['完成人次', '报名人次']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '完成人次',
            type: 'bar',
            data: a.thenumbers2,
         
        },
        {
            name: '报名人次',
            type: 'bar',
            data:  a.thenumbers,
          
        }
    ]
         })

          
    },
         mqbbcolumns(){
         //window.console.log(this.Bchar1[0].value)
         var a=this;
        
         this.bbcolumns = echarts.init(document.getElementById('bbcolumn'));
         this.bbcolumns.setOption({
             

    title: {
        text: a.FullYear+'培训（线上/现场/现场+线上）分类统计',
        subtext: '真实有效',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: ['完成人数', '未完成人数']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '线上培训',
            type: 'pie',
            radius: [20, 110],
            center: ['20%', '50%'],
            roseType: 'radius',
            data:a.Bchar1
           
        },
        {
            name: '现场培训',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data:a.Bchar2
            
        },
             {
            name: '现场+线上',
            type: 'pie',
            radius: [30, 110],
            center: ['80%', '50%'],
            roseType: 'area',
            data:a.Bchar3
        }
    ]


         })



    }
      
    }
};

</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
