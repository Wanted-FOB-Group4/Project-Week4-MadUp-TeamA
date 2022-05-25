import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import cx from 'classnames'
import dayjs from 'dayjs'

import { getTrendData } from 'services/getData'
import { IData } from 'types/types'
import IntergratedAdChart from './IntergratedAdChart'
import IntergratedAdStatus from './IntergratedAdStatus'
import { chartOptions } from './IntergratedAdStatus/status'
import Dropdown from 'components/Dropdown'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './integratedAdManagement.module.scss'

interface Props {
  pickStartDate: Date
  pickEndDate: Date
}

const IntegratedAdManagement = (props: Props) => {
  const { pickStartDate, pickEndDate } = props
  const [firstChartName, setFirstChartName] = useState('광고비')
  const [secondChartName, setSecondChartName] = useState('노출 수')
  const [data, setData] = useState<IData[]>([])
  const [isThirdSelectOpen, setIsThirdSelectOpen] = useState(false)

  const { isLoading } = useQuery<IData[], Error>('trendData', getTrendData, {
    retry: 1,
    // staleTime: 60 * 60 * 1000,
    // cacheTime: 60 * 60 * 1000,
    onSuccess: (res) => {
      setData(
        res.filter(
          (item: IData) =>
            dayjs(pickStartDate).subtract(1, 'day').unix() <= dayjs(item.date).unix() &&
            dayjs(pickEndDate).unix() >= dayjs(item.date).unix() &&
            item
        )
      )
    },
  })

  useEffect(() => {
    setData((prev) =>
      prev.filter(
        (item: IData) =>
          dayjs(pickStartDate).subtract(1, 'day').unix() <= dayjs(item.date).unix() &&
          dayjs(pickEndDate).unix() >= dayjs(item.date).unix() &&
          item
      )
    )
  }, [pickEndDate, pickStartDate])

  if (isLoading) {
    return <div className={styles.container}>...loading</div>
  }

  const handleFirstChartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFirstChartName(e.target.value)
  }

  const handleSecondChartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSecondChartName(e.target.value)
  }

  const handleThirdBtnClick = () => {
    setIsThirdSelectOpen((prev) => !prev)
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>통합 광고 현황</h2>

      <div className={styles.wrapper}>
        <IntergratedAdStatus data={data} />

        <div className={styles.selectBtnGroup}>
          <Dropdown options={chartOptions} onChange={handleFirstChartChange} />
          <Dropdown
            options={chartOptions.filter((option) => option.value !== firstChartName)}
            onChange={handleSecondChartChange}
          />
          <button type='button' className={styles.filterBtn} onClick={handleThirdBtnClick}>
            <span>주간</span>
          </button>
          <div className={cx(styles.filterBox, { [styles.hidden]: !isThirdSelectOpen })}>
            <button type='button' className={cx(styles.filterBtn, { [styles.daily]: true })}>
              <span>일간</span>
            </button>
          </div>
        </div>

        <IntergratedAdChart data={data} firstData={firstChartName} secondData={secondChartName} />
      </div>
    </section>
  )
}

export default IntegratedAdManagement
