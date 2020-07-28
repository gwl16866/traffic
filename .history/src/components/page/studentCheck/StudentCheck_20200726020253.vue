<template>
<div>
    学员审核
</div>
   
</template>




<script>
export default {
    data(){
      return{
        query
      }
    },
    mounted() {
    },
    methods:{
      //按条件查询所有未审核的学员
			queryAllStudent(){
				const currentThis = this
				currentThis.$axios.get('http://localhost:8081/studentinfo/queryAllStudentInFo',{
					params: {
						realName: currentThis.student.realName,
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