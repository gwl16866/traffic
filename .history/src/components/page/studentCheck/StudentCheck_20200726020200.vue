<template>
<div>
    学员审核
</div>
   
</template>




<script>
export default {
    data(){
        return{

        }

    },mounted() {


    },
    methods:{
      //按条件查询所有未审核的学员
			queryAllStudent(){
				const currentThis = this
				let createTimes = ''
				let endTimes = ''
				currentThis.$axios.get('http://localhost:8081/studentinfo/queryAllStudentInFo',{
					params: {
						realName: currentThis.student.realName,
						createTimes: createTimes,
						endTimes: endTimes,
						currentPage: currentThis.currentPage,
						pageSize: currentThis.pageSize,
						status:	currentThis.student.status
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