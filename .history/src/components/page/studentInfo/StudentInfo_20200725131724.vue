<template>
	<div>
		<el-card class="box-card">
			<el-form ref="form" :model="studentList" label-width="80px">

				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
				
			</el-form>	
		</el-card>
	</div>
</template>




<script>
	export default {
		data() {
			return {
				studentList:[]
			};
		},
		mounted() {},
		methods: {}
	};
</script>


<style>
	.box-card {
		height: 120px;
	}
</style>