<template>
  <div>
    {{stuid}}
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
      currentThis.$axios.get('http://localhost:8081/studentinfo/queryStudentById',{
					params: {
						id:stuid
					}
				})
				.then(res=>{
					currentThis.stuid=res.data
				})
				.catch(err=>console.log(err))

    }

  }
}
</script>
