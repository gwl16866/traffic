<template>
<div>

</div>
   
</template>




<script>
export default {
    data(){
      return{
        studentList: []
      }
    },
    mounted() {
      this.queryNotReviewed();
    },
    methods:{
      //按条件查询所有未审核的学员
			queryNotReviewed(){
				const currentThis = this
				currentThis.$axios.get('http://localhost:8081/studentinfo/queryAllStudentInFo',{
					params: {
            realName: currentThis.student.realName,
            status:4
					}
				})
				.then(res=>{
					currentThis.studentList=res.data.records
					currentThis.totalNum = res.data.total
				})
				.catch(err=>console.log(err))
			},
    }
    
}
</script>


<style scoped>

</style>