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
      student:{},
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
						id:stuid
					}
				})
				.then(res=>{
					currentThis.stuid=res.data.records
				})
				.catch(err=>console.log(err))

    }

  }
}
</script>
