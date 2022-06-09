<template>
  <div id="c2">
    <div id="c3" ref="covidAddRef">asas</div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getFyList } from '../utils/getFy.js'
export default {
  name: '',
  data() {
    return {
      chartInstance: null,
      newAddList: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenData)
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.covidAddRef)
    },
    async getData() {
      const res = await getFyList()
      const a = res.data
      const b = a.substring(13, a.length - 2)
      const c = JSON.parse(b)
      this.newAddList = c.data

      const xData = this.newAddList.locIncrProTop.map((item) => {
        return item.name
      })

      const seriesData = this.newAddList.locIncrProTop.map((item) => {
        return item.locIncrNum
      })

      const getOption = {
        xAxis: {
          type: 'category',
          data: xData,
          // 坐标轴刻度
          axisTick: {
            show: false,
            // 刻度与元素对齐
            alignWithLabel: true
          },
          axisLabel: {
            inside: false,
            // x轴数据角度
            rotate: 50
          }
        },
        yAxis: {
          type: 'value'
        },
        title: {
          text: '▍ 新增本土确诊省市TOP10',
          left: 10,
          top: 15,
          textStyle: {
            fontSize: '1rem',
            color: '#4d79f3'
          },
          subtext: '单位:例'
        },
        label: {
          show: true,
          position: 'top'
        },
        grid: {
          top: '30%',
          left: '5%',
          bottom: '1%',
          right: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          borderColor: 'black',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff'
          }
          // formatter: (e) => {
          //   return `${e.name} <div>今日新增:${e.value}</div>`
          // }
        },
        series: [
          {
            name: '新增确诊',
            type: 'bar',
            // 跟随x轴元素展示多少拐点
            showAllSymbol: true,
            data: seriesData,
            itemStyle: {
              color: (e) => {
                const value = e.value
                if (value > 500) {
                  return '#da2824'
                } else if (value > 40) {
                  return '#e3553b'
                } else if (value > 20) {
                  return '#e86b47'
                } else if (value > 10) {
                  return '#e86e48'
                } else if (value > 0) {
                  return ' #f9d774'
                }
              },
              borderRadius: [8, 8, 0, 0]
            },
            barWidth: 20
          }
        ]
      }

      this.chartInstance.setOption(getOption)
    },
    screenData() {
      const size = this.$refs.covidAddRef.offsetWidth

      const screenOption = {
        series: [
          {
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
