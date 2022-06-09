<template>
  <div id="c2">
    <div id="c3" ref="covidOutboundRef">sasas</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getFyList } from '../utils/getFy.js'

export default {
  name: 'CovidOut',
  data() {
    return {
      chartInstance: null,
      covidOutAddList: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenData)
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.covidOutboundRef)
    },
    async getData() {
      const res = await getFyList()
      const a = res.data
      const b = a.substring(13, a.length - 2)
      const c = JSON.parse(b)
      this.covidOutAddList = c.data

      const sliceData = this.covidOutAddList.historylist.slice(0, 99)
      const xData = sliceData.map((item) => {
        return item.date
      })
      xData.reverse()

      const seriesData = sliceData.map((item) => {
        return item.cn_jwsrNum
      })
      seriesData.reverse()

      const seriesData2 = sliceData.map((item) => {
        return item.cn_addjwsrNum
      })
      seriesData2.reverse()

      const getOption = {
        title: {
          text: '▍ 境外输入病例变化趋势',
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
          data: xData,
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
            fontSize: 9,
            // x轴数据间距
            interval: 13
          }
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          borderColor: 'black',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '5%',
          top: '25%',
          bottom: '5%',
          right: '5%',
          containLabel: true
        },
        legend: {
          top: '7%',
          right: '5%',
          icon: 'circle',
          orient: 'vertical',
          textStyle: {
            fontSize: 11
          }
        },
        series: [
          {
            name: '累计输入',
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
              color: '#fe6b22'
            },
            // 拐点位置放大
            emphasis: {
              scale: 2
            },
            zlevel: 0
          },
          {
            name: '新增输入',
            type: 'line',
            data: seriesData2,
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
            itemStyle: {
              color: '#ffa200'
            },
            // 拐点位置放大
            emphasis: {
              scale: 2
            },
            zlevel: 0
          }
        ]
      }

      this.chartInstance.setOption(getOption)
    },
    screenData() {
      const size = this.$refs.covidOutboundRef.offsetWidth

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
