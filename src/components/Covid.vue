<template>
  <div id="c2">
    <div id="c3" ref="covidRef"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import chinaMap from '../../public/state/map/china.json'
import { getFyList } from '../utils/getFy.js'

export default {
  name: 'Covid',
  data() {
    return {
      chartInstance: null,
      chinaDataList: null,
      initOption: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenData)
  },
  methods: {
    async initChart() {
      this.chartInstance = echarts.init(this.$refs.covidRef)
      echarts.registerMap('china', chinaMap)

      this.initOption = {
        title: {
          text: '现有确诊地图',
          left: '42%',
          top: '8%',
          textStyle: {
            fontSize: '1rem',
            color: '#4d79f3'
          },
          subtext: '已排除治愈、死亡'
        },
        series: [
          {
            type: 'map',
            map: 'china',
            top: '6%',
            label: {
              show: true
            },
            // 地图缩放
            zoom: 1.1,
            itemStyle: {
              // 地图区域颜色
              areaColor: '#fff'
            },
            data: [{}]
          }
        ],
        visualMap: [
          {
            type: 'piecewise',
            show: true,
            splitNumber: 6,
            left: '5%',
            bottom: '13%',
            itemWidth: '13px',
            itemHeight: '13px',
            pieces: [
              { min: 10000, color: 'rgb(184, 9, 9)' }, // (1500, Infinity]
              { min: 1000, max: 9999, color: 'rgb(230, 69, 70)' }, // (310, 1000]
              { min: 100, max: 999, color: 'rgb(245, 117, 103)' }, // (200, 300]
              { min: 10, max: 99, color: 'rgb(255, 153, 133' }, // (10, 200]
              { min: 1, max: 9, color: ' rgb(255, 229, 219)' }, // [123, 123]
              { value: 0, color: '#fff' } // (-Infinity, 5)
            ],
            textStyle: {
              fontSize: 10
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          borderColor: 'black',
          backgroundColor: 'black',
          extraCssText: ' opacity:0.7;',
          textStyle: {
            color: '#fff'
          },
          formatter: (e) => {
            return `地区：<b>${e.name}</b>  <div>现有确诊：<b>${e.value}</b></div> <div>累计确诊：<b>${e.data.totalNum}</b></div> <div>累计治愈：<b>${e.data.cure}</b></div> <div>累计死亡：<b>${e.data.deathNum}</b></div>`
          }
        }
      }
      this.chartInstance.setOption(this.initOption)
    },
    async getData() {
      const res = await getFyList()

      const a = res.data
      const b = a.substring(13, a.length - 2)
      const c = JSON.parse(b)
      this.chinaDataList = c.data

      const list = this.chinaDataList.list.map((item) => {
        return {
          name: item.name,
          value: item.econNum,
          cure: item.cureNum,
          totalNum: item.value,
          deathNum: item.deathNum
        }
      })
      this.initOption.series[0].data = list
      this.chartInstance.setOption(this.initOption)
    },
    screenData() {
      const size = this.$refs.covidRef.offsetWidth

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
