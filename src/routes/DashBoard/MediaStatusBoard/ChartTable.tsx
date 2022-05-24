import { sumMediaCategory } from '../../../utils/sumMediaCategory'

import styles from './mediaStatusBoard.module.scss'

const ChartTable = () => {
  const { google, facebook, naver, kakao, all } = sumMediaCategory('2022-04-01', '2022-04-20')

  const filterCategry = (media: { value: number; category: string }[]) => {
    return [
      media.find((data) => data.category === '광고비'),
      media.find((data) => data.category === '매출'),
      media.find((data) => data.category === 'ROAS'),
      media.find((data) => data.category === '노출 수'),
      media.find((data) => data.category === '클릭 수'),
      media.find((data) => data.category === '클릭률(CTR)'),
      media.find((data) => data.category === '클릭당비용(CPC)'),
    ]
  }

  const mediaDataForChart = {
    googleData: [...filterCategry(google)],
    facebookData: [...filterCategry(facebook)],
    naverData: [...filterCategry(naver)],
    kakaoData: [...filterCategry(kakao)],
    allData: [...filterCategry(all)],
  }

  const { googleData, facebookData, naverData, kakaoData, allData } = mediaDataForChart

  const tableHeadList = ['광고비', '매출', 'ROAS', '노출 수', '클릭 수', '클릭률(CTR)', '클릭당 비용(CPC)']

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableRow}>
          <td />
          {tableHeadList.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className={styles.tableRow}>
          <th className={styles.tableColumn}>카카오</th>
          {kakaoData.map((data, i) => (
            <td className={styles.tableColumn} key={data?.category}>
              {data?.value.toFixed(2)}
            </td>
          ))}
        </tr>
        <tr className={styles.tableRow}>
          <th className={styles.tableColumn}>페이스북</th>
          {facebookData.map((data, i) => (
            <td className={styles.tableColumn} key={data?.category}>
              {data?.value.toFixed(2)}
            </td>
          ))}
        </tr>
        <tr className={styles.tableRow}>
          <th className={styles.tableColumn}>네이버</th>
          {naverData.map((data, i) => (
            <td className={styles.tableColumn} key={data?.category}>
              {data?.value.toFixed(2)}
            </td>
          ))}
        </tr>
        <tr className={styles.tableRow}>
          <th className={styles.tableColumn}>구글</th>
          {googleData.map((data, i) => (
            <td className={styles.tableColumn} key={data?.category}>
              {data?.value.toFixed(2)}
            </td>
          ))}
        </tr>
        <tr className={styles.tableRow}>
          <th className={styles.tableColumn}>총계</th>
          {allData.map((data) => (
            <td className={styles.tableColumn} key={data?.category}>
              {data?.value.toFixed(2)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default ChartTable