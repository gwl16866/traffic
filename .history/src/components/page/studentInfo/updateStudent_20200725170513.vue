<template>
  
</template>
<script>
import addSeckillCommodity from '@/views/components/operate/addSeckillCommodity'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: 'ActivityCommodity',
  components: {
    addSeckillCommodity
  },
  props: ['seckillid'],
  data() {
    return {
      addSeckillCommodityVisible: false,
      seckillcommodity: [],
      selectSeckillCommodity: {},
      seckillids: 0,
      currentPage: 1, // 分页用的
      pageSize: 1, // 分页用的
      totalNum: 0 // 分页用的
    }
  },
  mounted() {
    this.querySeckilCommodity()
  },

  methods: {
    // 查询某个活动下的所有商品
    querySeckilCommodity() {
      const currThis = this
      currThis.$axios.get('http://localhost:8080/seckillcommodity/queryAllSeckillCommodity', {
        params: {
          seckillId: currThis.seckillid,
          comName: currThis.selectSeckillCommodity.comName,
          currentPage: currThis.currentPage,
          pageSize: currThis.pageSize
        },
        // 往后台发送请求所带的 token 告诉shiro 当前用户已认证
        headers: { 'AUTHORIZATION': getToken() }
      })
        .then(res => {
          currThis.seckillcommodity = res.data.records
          currThis.totalNum = res.data.total
        })
        .catch(error => console.log(error))
    },

    // 给当前的活动添加秒杀的商品
    addSeckillCommodity() {
      this.addSeckillCommodityVisible = !this.addSeckillCommodityVisible
      this.seckillids = this.seckillid
    },

    // 删除秒杀商品
    deleteSeckillCommodity(seckillcommodity) {
      const currThis = this
      currThis.$axios.get('http://localhost:8080/seckillcommodity/deleteSeckillCommodity', {
        params: {
          secComId: seckillcommodity.secComId
        },
        // 往后台发送请求所带的 token 告诉shiro 当前用户已认证
        headers: { 'AUTHORIZATION': getToken() }
      })
        .then(res => {
          const returnJson = res.data
          if (returnJson.code === 200) {
            this.$message.success(returnJson.message)
          } else {
            currThis.$message.error(returnJson.message)
          }
          currThis.querySeckilCommodity()
        })
        .catch(error => console.log(error))
    },

    addSuccessClick(returnJson) {
      const currThis = this
      if (returnJson.code === 200) {
        currThis.addSeckillCommodityVisible = !currThis.addSeckillCommodityVisible
        currThis.querySeckilCommodity()
        currThis.$message.success(returnJson.message)
      } else {
        currThis.editUserRoleVisible = !currThis.editUserRoleVisible
        currThis.querySeckilCommodity()
        currThis.$message.error(returnJson.message)
      }
    },

    // 每页条数
    handleSizeChange(pageSize) {
      const currThis = this
      currThis.pageSize = pageSize
      currThis.querySeckilCommodity()
    },

    // 当前页
    handleCurrentChange(currentSize) {
      const currThis = this
      currThis.currentPage = currentSize
      currThis.querySeckilCommodity()
    },

    // 重置表单并刷新页面
    resetForm() {
      this.selectSeckillCommodity.comName = ''
      this.querySeckilCommodity()
    }

  }
}
</script>
