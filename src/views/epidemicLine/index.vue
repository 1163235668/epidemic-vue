<template>
  <div ref="myEchartLine" class="chart" />
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import { getConfirmData, getSuspectData } from '../../api/epidemicLine'
export default {
  name: 'ChartLine',
  data() {
    return {
      confirmData: {},
      suspectData: {},
      lx: [],
      lxFormat: [],
      ly: [],
      lz: []
    }
  },
  mounted() {
    this.getConfirmData()
  },
  methods: {
    getConfirmData() {
      getConfirmData().then(response => {
        this.confirmData = response.data
        this.getLine()
      })
    },
    getLine() {
      this.changeDataByLine()
      const that = this
      const myChart = echarts.init(this.$refs.myEchartLine)
      myChart.setOption({
        title: {
          text: ''
          //  text: that.$t("profitChart.Revenuechart")
        },
        tooltip: {
          trigger: 'axis' // axis   item   none三个值
        },
        grid: {
        },
        xAxis: {
          type: 'category', // 还有其他的type，可以去官网喵两眼哦
          data: this.lxFormat, // x轴数据
          name: '日期', // x轴名称
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '全国疫情新增趋势图', // y轴名称
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        legend: {
          data: ['新增确诊']
        },
        series: this.ly
      })
      setTimeout(function() {
        window.addEventListener('resize', () => {
          myChart.resize()
        })
      }, 500)
    },
    changeDataByLine() {
      this.lxFormat
      this.lx = []
      this.ly = []
      var set = new Set()
      var setFormat = new Set()
      var d
      var date
      for (var j = 0; j < this.confirmData.length; j++) {
        set.add(this.confirmData[j]['time'])
        d = new Date(this.confirmData[j]['time'])
        date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        setFormat.add(date)
      }
      this.lx = Array.from(set)
      this.lx.sort()
      this.lxFormat = Array.from(setFormat)
      this.lxFormat.sort()
      var arr = []
      for (var x of this.lx) {
        var index = this.confirmData.findIndex((element) => x === element['time'])
        if (index != -1) {
          arr.push(this.confirmData[index]['count'])
        } else {
          arr.push(0)
        }
      }
      var obj = {
        name: '新增确诊',
        data: arr,
        type: 'line'
      }
      this.ly.push(obj)
      if (this.lx.length == 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style scoped>
.chart{
  float:left;
  width:100%;
  height: 500px;
  margin: 1% auto;
}
</style>
