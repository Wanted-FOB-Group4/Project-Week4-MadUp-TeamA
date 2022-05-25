import { IData } from 'types/types'

export const newChartData = (data: IData[], category: string) => {
  let list
  if (category === '클릭 수') {
    list = data.map((item) => ({ x: item.date, y: item.click }))
  } else if (category === '광고비') {
    list = data.map((item) => ({ x: item.date, y: item.cost }))
  } else if (category === '전환 수') {
    list = data.map((item) => ({ x: item.date, y: item.convValue }))
  } else if (category === '매출') {
    list = data.map((item) => ({ x: item.date, y: Math.floor((item.roas * item.cost) / 100) }))
  } else if (category === 'roas') {
    list = data.map((item) => ({ x: item.date, y: item.roas }))
  } else if (category === '노출 수') {
    list = data.map((item) => ({ x: item.date, y: Math.floor((item.click / item.ctr) * 100) }))
  }

  return list
}
