import axios from 'axios'

export const getFyList = () => {
  return axios.get('/api/project/fymap/ncp2020_full_data.json?_=1650802759924&callback')
}

export const getRiskArea = () => {
  return axios.get('/riskArea/news/ncp/data.d.json?mod=risk_level')
}
