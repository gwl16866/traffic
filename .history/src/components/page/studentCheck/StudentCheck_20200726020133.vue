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
      //按条件查询所有的学员
			queryAllStudent(){
				const currentThis = this
				let createTimes = ''
				let endTimes = ''
				if (currentThis.student.createTime != null && currentThis.student.endTime != null) {
					createTimes = currentThis.$moment(currentThis.student.createTime).format('YYYY-MM-DDTHH:mm:ss')
					endTimes = currentThis.$moment(currentThis.student.endTime).format('YYYY-MM-DDTHH:mm:ss')
				}
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