import { IStatusData } from 'types/types'

export const getAdStatusTotals = (data: IStatusData[]) => {
  // 광고비
  const totalCost = data.reduce((acc, cur) => acc + cur.cost, 0)
  // 노출수
  const totalImp = data.reduce((acc, cur) => acc + cur.imp, 0)
  // 매출
  const totalSales = data.reduce((acc, cur) => acc + (cur.roas * cur.cost) / 100, 0)
  // ROAS
  const roas = (totalSales / totalCost) * 100
  // 클릭수
  const totalClick = data.reduce((acc, cur) => acc + cur.click, 0)
  // 전환수
  const totalConv = data.reduce((acc, cur) => acc + cur.conv, 0)

  return { totalCost, totalImp, totalSales, roas, totalClick, totalConv }
}
