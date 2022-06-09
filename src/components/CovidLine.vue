<template>
  <div id="c2">
    <div id="c3" ref="lineRef"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getFyList } from '../utils/getFy.js'
export default {
  name: 'CovidLine',
  data() {
    return {
      chartInstance: null,
      fyData: []
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenData)
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.lineRef)
    },
    async getData() {
      const res = await getFyList()
      const a = res.data
      const b = a.substring(13, a.length - 2)
      const c = JSON.parse(b)
      this.fyData = c.data
      const newArr = this.fyData.historylist.slice(0, 31)
      const xAxisData = newArr.map((item) => {
        return item.date
      })
      xAxisData.reverse()
      const seriesData = newArr.map((item) => {
        return item.cn_conadd
      })
      seriesData.reverse()

      const seriesData2 = newArr.map((item) => {
        return item.wjw_susNum
      })
      seriesData2.reverse()
      const initOption = {
        title: {
          text: '▍ 全国新增确诊、新增疑似趋势图',
          left: '10',
          top: '10',
          textStyle: {
            fontSize: '1rem',
            color: '#4d79f3'
          },
          subtext: '单位:例'
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          // 坐标轴刻度
          axisTick: {
            show: false,
            // 刻度与元素对齐
            alignWithLabel: true,
            // 坐标轴长度
            length: 0
          },
          axisLabel: {
            inside: false,
            fontSize: 12,
            // x轴数据间距
            interval: 4
          }
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          icon: 'roundRect',
          top: '15%'
        },
        grid: {
          left: '5%',
          top: '30%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          borderColor: 'black',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff'
          }
          // formatter: (e) => {
          //   return `${e[1].name} <div>${e[0].seriesName}: ${e[0].value} <div>${e[1].seriesName}: ${e[1].value}</div></div>`
          // }
        },
        series: [
          {
            name: '确诊',
            type: 'line',
            data: seriesData,
            // 折线平滑
            smooth: true,
            // 拐点大小
            symbolSize: 7,
            // 跟随x轴元素展示多少拐点
            showAllSymbol: false,
            // 折线宽度
            lineStyle: {
              width: 2
            },
            // 线条颜色
            itemStyle: {
              color: 'rgb(163, 29, 19)'
            },
            // 拐点位置放大
            emphasis: {
              scale: 2
            },
            zlevel: 0
          },
          {
            name: '疑似',
            type: 'line',
            data: seriesData2,
            // 线条颜色
            itemStyle: {
              color: ' #b08cf0'
            },
            zlevel: 0
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    screenData() {
      const size = this.$refs.lineRef.offsetWidth

      const screenOption = {
        series: [
          {
            legend: {
              itemWidth: size / 1.2,
              itemHeight: size / 1.2,
              textStyle: {
                fontSize: size / 2
              }
            },
            itemStyle: {
              itemWidth: size,
              itemHeight: size
            }
          }
        ]
      }
      this.chartInstance.setOption(screenOption)
      this.chartInstance.resize()
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.screenData)
  }
}
</script>

<style lang="less" scoped></style>
