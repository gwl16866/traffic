<template>
<div>
    学员信息
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</div>
   
</template>




<script>
export default {
    data(){
        return{

        }

    },mounted() {


    },methods:{


    }
    
}
</script>


<style>
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

</style>