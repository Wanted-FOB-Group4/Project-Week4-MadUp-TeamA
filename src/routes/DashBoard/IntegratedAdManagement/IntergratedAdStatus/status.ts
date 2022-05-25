import { getAdStatus } from 'routes/DashBoard/utils/adClac'
import { IData } from 'types/types'
import { compactNumber } from 'utils/compactNumber'

export const chartOptions = [
  {
    value: 'roas',
    content: 'ROAS',
    unit: '%',
  },
  {
    value: 'cost',
    content: '광고비',
    unit: '원',
  },
  {
    value: 'cpc',
    content: '노출 수',
    unit: '회',
  },
  {
    value: 'click',
    content: '클릭 수',
    unit: '회',
  },
  {
    value: 'conv',
    content: '전환 수',
    unit: '회',
  },
  {
    value: 'convValue',
    content: '매출',
    unit: '원',
  },
]

export const setAdStatus = (data: IData[]) => {
  const { totalCost, totalImp, totalSales, roas, totalClick, totalConv } = getAdStatus(data)
  const items = chartOptions.map((item) => {
    let value = '0'
    switch (item.content) {
      case '광고비':
        value = compactNumber(totalCost)
        break
      case '노출 수':
        value = compactNumber(totalImp)
        break
      case '매출':
        value = compactNumber(totalSales)
        break
      case 'ROAS':
        value = String(Math.round(roas))
        break
      case '클릭 수':
        value = compactNumber(totalClick)
        break
      case '전환 수':
        value = compactNumber(totalConv)
        break
    }

    return {
      ...item,
      value,
    }
  })
  return items
}
