<template>
  <el-card>
    <div slot="header">
      <my-bread>粉丝管理</my-bread>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="粉丝列表" name="fansList">
        <div class="itemList">
          <div class="item" v-for="item in fans" :key="item.id.toString()">
            <el-avatar style="width:80px;height:80px;" :src="item.photo"></el-avatar>
            <p style="font-size:12px">{{item.name}}</p>
            <el-button type="primary" plain size="mini">+关注</el-button>
          </div>
        </div>
        <el-pagination
          style="text-align:center"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="fansForm.per_page"
          :current-page="fansForm.page"
          @current-change="changePage"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="粉丝画像" name="fans">
        <div ref="box" style="width:600px;height:400px"></div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      fansForm: {
        page: 1,
        per_page: 24
      },
      activeName: 'fans',
      fans: [],
      total: 0
    }
  },
  methods: {
    changePage (newPage) {
      this.fansForm.page = newPage
      this.getFans()
    },
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.fansForm })
      this.fans = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    const box = this.$refs.box
    const myChart = echarts.init(box)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped lang="less">
.item {
  display: inline-block;
  width: 120px;
  height: 170px;
  text-align: center;
  border: 1px dashed #ddd;
  padding-top: 15px;
  margin-left: 35px;
  margin-bottom: 35px;
}
</style>
