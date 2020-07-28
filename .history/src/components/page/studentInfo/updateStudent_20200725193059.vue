<template>
  <div>
    asdasdascas
  </div>
</template>
<script>
export default {
  name: 'updateStudent',
  props: ['stuid'],
  data() {
    return {
    }
  },
  mounted() {
    this.queryStudentById();
  },

  methods: {
    queryStudentById(){
      const currentThis = this
      currentThis.$axios.get('http://localhost:8081/studentinfo/queryAllStudentInFo',{
					params: {
						id
					}
				})
				.then(res=>{
					currentThis.studentList=res.data.records
					currentThis.totalNum = res.data.total
				})
				.catch(err=>console.log(err))

    }

  }
}
</script>
