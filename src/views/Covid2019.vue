<template>
  <div class="screen-container" ref="covid2019Ref">
    <meta http-equiv="refresh" content="300" />
    <header class="screen-header">
      <div>
        <img src="../../public/state/image/header_border_dark.png" alt="" />
      </div>
      <span class="title">疫情实时大数据报告</span>
      <div class="datafrom">
        <span class="datafrom_title">数据来源于国家和省市卫健委</span>
      </div>
      <div class="datetime">{{ nowDate | timeNow }}</div>
    </header>
    <!-- 数据来源说明 -->
    <div class="DataTip" style="display: none" @click="closeTip">
      <div class="DataTip_item">
        <img src="../../public/state/image/del.png" @click="delTip" alt="" />
        <div class="Data_shuoming">数据说明</div>
        <div class="DataTip_list">
          <p class="asas">
            1、数据来源：<br />
            来自国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道公开数据；<br /><br />
            2、数据统计原则：
            <br />
            a)每日上午全国数据会优先使用国家卫健委公布的数据（此时各省市数据尚未及时更新，会出现全国数据大于各省份合计数的情况）；<br />
            b)当各省公布数据总和大于国家卫健委公布的数据时，则全国数据切换为各省合计数；<br />
            c) 全国数据含港澳台地区数据；
            <br /><br />
            3、数据更新时间：<br />
            实时更新全国、各省市区数据，因需要核实计算，与官方发布的时间相比，将有一定的时间延迟；
            <br /><br />
            4、“较昨日”的新增确诊、新增无症状等数据来源于卫健委发布的新增病例数，其含义是由（各省）卫健委公布的最新数据减去前一日对应的数据所得；由于各省卫健委公布时间及方式各不相同且存在核减情况，故而部分数据可能会有一定的时间延迟；<br /><br />
            6、本网站全力以赴提供权威、准确、及时的疫情数据，如有任何疑问，欢迎通过本网站留言反馈。
          </p>
        </div>
      </div>
    </div>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top">
          <!-- 销量趋势图表 -->
          <covidline></covidline>
        </div>
        <div id="left-bottom">
          <!-- 商家销售金额图表 -->
          <covidAdd></covidAdd>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top">
          <div class="t-title">
            <b>▍全国(含港澳台)</b>
            <span>{{ deadline }}数据统计</span>
            <div class="tip" @click="showTip">
              <img src="../../public/state/image/tip.png" alt="" />
              <span>数据说明</span>
            </div>
          </div>
          <div class="t_list">
            <div class="t_item">
              <h5>新增本土确诊</h5>
              <span>
                <b style="color: #a48256"> {{ localconNum1 }}</b></span
              >
            </div>
            <div class="t_item">
              <h5>新增确诊</h5>
              <span>
                <b style="color: #c96161">{{ addCon }}</b></span
              >
            </div>
            <div class="t_item">
              <h5>新增境外</h5>
              <span>
                <b style="color: #ffa200"> {{ addjwsr_new }}</b></span
              >
            </div>
            <div class="t_item">
              <h5>新增无症状</h5>
              <span
                ><b style="color: #8a38a1">{{ addAsymNum }}</b></span
              >
            </div>
            <div class="t_item">
              <h5>现存本土确诊</h5>
              <span
                ><b style="color: #b8540e"> {{ locIncrNum }}</b></span
              >
            </div>
            <div class="t_item">
              <h5>现存确诊</h5>
              <span
                ><b style="color: #ff3535">{{ econNum }}</b></span
              >
            </div>
            <div class="t_item">
              <h5>现有无症状</h5>
              <span
                ><b style="color: #fe9885">{{ asymptomNum }}</b></span
              >
            </div>
            <div class="t_item">
              <h5>现存疑似</h5>
              <span
                ><b style="color: #a36fff">{{ sustotal }}</b></span
              >
            </div>

            <div class="t_item">
              <h5>累计确诊</h5>
              <span
                ><b style="color: #b10000">{{ gntotal }}</b></span
              >
              <h6>
                较昨日<code>{{ addcon_new }}</code>
              </h6>
            </div>
            <div class="t_item">
              <h5>累计境外输入</h5>
              <span
                ><b style="color: #fe6b22">{{ jwsrNum }}</b></span
              >
              <h6>
                较昨日<code>{{ addjwsr }}</code>
              </h6>
            </div>
            <div class="t_item">
              <h5>累计治愈</h5>
              <span
                ><b style="color: #13b593">{{ curetotal }}</b></span
              >
              <h6>
                较昨日<code>{{ addcure_new }}</code>
              </h6>
            </div>
            <div class="t_item">
              <h5>累计死亡</h5>
              <span
                ><b style="color: #666666">{{ deathtotal }}</b></span
              >
              <h6>
                较昨日<code>{{ adddeath_new }}</code>
              </h6>
            </div>
            <!-- 分割线 -->
            <div class="tiku"></div>
          </div>
        </div>
        <div id="middle-bottom">
          <!-- 商家分布图表 -->
          <covidMap></covidMap>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top">
          <covidOut></covidOut>
        </div>
        <div id="right-bottom">
          <div class="riskNum">
            <h5>▍ 全国风险地区汇总</h5>
            <div class="riskHigh">
              <div class="riskHigh_title">
                <img src="../../public/state/image/high.png" alt="" />
                <div class="title">高风险地区{{ highNum }}个</div>
                <div class="risk_time">统计{{ riskUpdateTime }}</div>
              </div>
              <div
                class="city_item"
                :class="{ anim: isRoll === true }"
                v-for="item in highArea"
                :key="item.key"
              >
                {{ item }}
              </div>
            </div>
            <div class="riskLow">
              <div class="riskLow_title">
                <img src="../../public/state/image/middle.png" alt="" />
                <div class="title">中风险地区{{ middleNum }}个</div>
                <div class="risk_time">统计{{ riskUpdateTime }}</div>
              </div>
              <div
                class="city_item"
                :class="{ anim: isRoll === true }"
                v-for="item in middleArea"
                :key="item.key"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import covidMap from '../components/Covid.vue'
import covidAdd from '../components/CovidAdd.vue'
import covidline from '../components/CovidLine.vue'
import covidOut from '../components/CovidOut.vue'
import { getFyList, getRiskArea } from '../utils/getFy.js'

export default {
  data() {
    return {
      fyList: null,
      riskList: null,
      highArea: [],
      middleArea: [],
      isRoll: false,
      timeId: 0,
      chartInstance: null,
      nowDate: Date.now()
    }
  },
  created() {
    this.getData()
    this.getRisk()
    setInterval(this.scroll, 2000)
    if (this.highArea >= 10) {
      // setInterval(this.scrollHigh, 2500)
    }
  },
  computed: {
    deadline() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.times
      }
    },
    localconNum1() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.localconNum
      }
    },
    addCon() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.add_daily.addcon
      }
    },
    addAsymNum() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.addAsymNum
      }
    },
    addjwsr_new() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.add_daily.addjwsr_new
      }
    },
    locIncrNum() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.locIncrNum
      }
    },
    econNum() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.econNum
      }
    },
    asymptomNum() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.asymptomNum
      }
    },
    sustotal() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.sustotal
      }
    },
    gntotal() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.gntotal
      }
    },
    addcon_new() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.add_daily.addcon_new
      }
    },
    jwsrNum() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.jwsrNum
      }
    },
    addjwsr() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.add_daily.addjwsr
      }
    },
    curetotal() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.curetotal
      }
    },
    addcure_new() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.add_daily.addcure_new
      }
    },
    deathtotal() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.deathtotal
      }
    },
    adddeath_new() {
      if (!this.fyList) {
        return ''
      } else {
        return this.fyList.add_daily.adddeath_new
      }
    },
    highNum() {
      if (!this.riskList) {
        return ''
      } else {
        return this.riskList.highNum
      }
    },
    riskUpdateTime() {
      if (!this.riskList) {
        return ''
      } else {
        return this.riskList.riskUpdateTime
      }
    },
    middleNum() {
      if (!this.riskList) {
        return ''
      } else {
        return this.riskList.middleNum
      }
    }
  },
  components: {
    covidMap,
    covidAdd,
    covidline,
    covidOut
  },
  methods: {
    async getData() {
      const res = await getFyList()

      const a = res.data
      const b = a.substring(13, a.length - 2)
      const c = JSON.parse(b)
      this.fyList = c.data
    },
    async getRisk() {
      const { data: res } = await getRiskArea()
      this.riskList = res.data

      this.highArea = []
      for (var h = 0; h < this.riskList.high.length; h++) {
        for (var s = 0; s < this.riskList.high[h].communitys.length; s++) {
          this.highArea.push(
            this.riskList.high[h].area_name +
              this.riskList.high[h].communitys[s]
          )
        }
      }

      this.middleArea = []
      for (var i = 0; i < this.riskList.middle.length; i++) {
        for (var m = 0; m < this.riskList.middle[i].communitys.length; m++) {
          this.middleArea.push(
            this.riskList.middle[i].area_name +
              this.riskList.middle[i].communitys[m]
          )
        }
      }
    },
    // 消息轮播
    scroll() {
      this.isRoll = true
      setTimeout(() => {
        this.middleArea.push(this.middleArea[0])
        this.middleArea.shift()
        this.isRoll = false
      }, 1000)
    },
    scrollHigh() {
      this.isRoll = true
      setTimeout(() => {
        this.highArea.push(this.highArea[0])
        this.highArea.shift()
        this.isRoll = false
      }, 1000)
    },
    // 打开数据来源对话框
    showTip() {
      document.querySelector('.DataTip').style.display = 'block'
    },
    // 关闭数据来源对话框
    delTip() {
      document.querySelector('.DataTip').style.display = 'none'
    },
    closeTip() {
      document.querySelector('.DataTip').style.display = 'none'
    }
  }
}
</script>
<style lang="less" scoped>
.screen-container {
  width: 100%;
  height: 100%;
  background-color: rgb(211, 222, 222);
  color: #fff;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 30%;
    font-size: 25px;
    color: #4d79f3;
    font-weight: 700;
    transform: translate(-50%, -50%);
  }

  .datafrom .datafrom_title {
    position: absolute;
    left: 50%;
    top: 73%;
    font-size: 12px;
    color: black;
    background-color: rgba(238, 238, 238, 0.7);
    border-radius: 10px;
    padding: 0 8px;
    transform: translate(-50%, -50%);
  }
  .datetime {
    margin-left: 10px;
    position: absolute;
    right: -5%;
    top: 50%;
    font-size: 18px;
    color: black;
    transform: translate(-50%, -50%);
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 5px;
  .screen-left {
    height: 100%;
    width: 30%;
    #left-top {
      height: 43%;
      margin-left: 10px;
      position: relative;
      background-color: #fff;
      border-radius: 20px;
    }
    #left-bottom {
      margin-left: 10px;
      height: 45%;
      margin-top: 19px;
      position: relative;
      background-color: #fff;
      border-radius: 20px;
    }
  }
  .screen-middle {
    height: 100%;
    width: 50%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 38%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 1em;
    }
    #middle-bottom {
      width: 100%;
      height: 58%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 26%;
    #right-top {
      height: 44%;
      position: relative;
      margin-right: 10px;
      background-color: #fff;
      border-radius: 20px;
    }
    #right-bottom {
      height: 44%;
      margin-top: 19px;
      margin-right: 10px;
      position: absolute;
      overflow: hidden;
      background-color: #fff;
      border-radius: 20px;
    }
  }
}

// 标题配置
#middle-top .t-title {
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 0.2rem 0 0rem;
  line-height: 0.35rem;
  text-align: left;
  color: #777;
  font-size: 0.2rem;
  align-items: center;
}

#middle-top .tip {
  margin-top: 10px;
  transform: translateX(400%);
}
#middle-top .t-title .tip img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  text-align: center;
}

#middle-top .t-title .tip span {
  margin-left: 7px;
}
#middle-top .t-title b {
  height: 0.35rem;
  color: #4d79f3;
  font-size: 1rem;
  margin-right: 0.1rem;
  font-weight: 700;
  margin: 10px 0 0 15px;
}
#middle-top .t-title span {
  margin-left: 15px;
  font-size: 13px;
  line-height: 10px;
  text-align: center;
  margin: 10px 0 0 15px;
}

#middle-top .t_list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 1em;
  overflow: hidden;
}

#middle-top .t_item {
  width: 25%;
  text-align: center;
  margin-bottom: 0.3rem;
  margin-top: -0.25em;
}

#middle-top .t_item h5 {
  color: #393939;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 0.000001rem;
}

#middle-top .t_item h6 {
  color: #999;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 0.000001rem;
  margin-top: 14px;
}

#middle-top .t_item h6 code {
  color: #666;
  font-weight: bolder;
  font-family: Microsoft YaHei, Helvetica Neue, Helvetica, STHeiTi, Arial,
    sans-serif;
  font-size: 1.1em;
  margin-left: 3px;
}
#middle-top .t_item span b {
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.5rem;
}

#middle-top .tiku {
  width: 770px;
  border-top: 1px solid #eee;
  margin-top: -110px;
}

.riskNum h5 {
  height: 0.35rem;
  color: #4d79f3;
  font-size: 1rem;
  margin-right: 0.1rem;
  font-weight: 700;
}
.riskHigh .riskHigh_title {
  margin-top: 5px;
}
.riskHigh .riskHigh_title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.5em;
  color: #333;
}

.riskHigh .riskHigh_title img {
  width: 2.5em;
  height: 2.5em;
  margin-right: 1em;
}
.riskHigh .riskHigh_title .title {
  font-size: 14px;
}

.riskHigh .riskHigh_title .risk_time {
  margin-left: 50px;
  font-size: 12px;
  color: #999999;
}

.riskHigh .city_item {
  color: #ff3535;
  line-height: 12px;
  font-weight: bold;
  margin-top: 10px;
  font-size: 13px;
  margin-left: 12px;
}

.riskLow .riskLow_title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.5em;
  color: #333;
  margin-top: 1em;
}
.riskLow .riskLow_title img {
  width: 2.5em;
  height: 2.5em;
  margin-right: 1em;
}
.riskLow .riskLow_title .title {
  font-size: 14px;
}

.riskLow .riskLow_title .risk_time {
  margin-left: 35px;
  font-size: 12px;
  color: #999999;
}

.riskLow .city_item {
  color: #fbb046;
  line-height: 14px;
  margin-top: 10px;
  font-size: 13px;
  font-weight: bold;
  margin-left: 12px;
}

.riskNum h5 {
  margin-left: 15px;
  margin-top: 15px;
}

// 遮罩层
.DataTip {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 98;
}

// 数据详情提示框
.DataTip_item {
  position: fixed;
  z-index: 9999;
  top: 200px;
  width: 80%;
  max-height: 100%;
  transform: translateX(15%);
  // background: rgba(0, 0, 0, 0.65);
  background-image: linear-gradient(90deg, #16c6cb, #0da7bb);
  border-radius: 0.8rem;
  overflow: hidden;
}

.Data_shuoming {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
  font-size: 1.5em;
}
.DataTip_item img {
  position: absolute;
  top: 5px;
  right: 10px;
  width: 25px;
  height: 25px;
}
.DataTip_list {
  overflow: auto;
  max-height: 25rem;
  padding: 0.9375rem;
  font-size: 0.875rem;
  color: #555;
  background: #fff;
  border-radius: 0.1875rem;
  user-select: none;
}
</style>
