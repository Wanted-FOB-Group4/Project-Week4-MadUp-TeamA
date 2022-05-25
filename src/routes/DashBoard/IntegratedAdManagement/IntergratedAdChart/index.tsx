import { useEffect, useState } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryVoronoiContainer } from 'victory'
import dayjs from 'dayjs'

import { compactNumber } from 'utils/compactNumber'
import { IData } from 'types/types'
import { newChartData } from './adclac'

interface Props {
  data: IData[]
  firstData: string
  secondData: string
}
interface ChartData {
  x: string | number | undefined
  y: string | number | undefined
}

const IntergratedAdChart = (props: Props) => {
  const { data, firstData, secondData } = props
  const [firstChartData, setFirstChartData] = useState<ChartData[] | undefined>([{ x: '', y: 0 }])
  const [secondChartData, setSecondChartData] = useState<ChartData[] | undefined>([{ x: '', y: 0 }])
  useEffect(() => {
    setFirstChartData(newChartData(data, firstData))
    setSecondChartData(newChartData(data, secondData))
  }, [data, firstData, secondData])
  return (
    <VictoryChart
      domainPadding={{ x: 50, y: 50 }}
      height={400}
      width={1000}
      containerComponent={
        <VictoryVoronoiContainer
          labels={({ datum }) => {
            return datum.y
          }}
        />
      }
    >
      <VictoryAxis
        scale={{ x: 'time' }}
        tickFormat={(x) => `${dayjs(x).format('M')}월 ${dayjs(x).format('D')}일`}
        style={{
          axis: { strokeWidth: 0.5, fill: 'black' },
          tickLabels: { fontSize: 12, padding: 10, fill: '#cccccc' },
          ticks: { stroke: 'grey', size: 0 },
        }}
      />
      <VictoryAxis
        dependentAxis
        offsetX={50}
        tickFormat={(value: number) => compactNumber(value)}
        style={{
          axis: { stroke: 'transparent' },
          tickLabels: { fontSize: 12, padding: 10, fill: '#cccccc' },
          ticks: { stroke: '#eeeeee', size: 0 },
          grid: { stroke: '#eeeeee' },
        }}
      />

      <VictoryLine
        style={{
          data: { stroke: '#4FADF7' },
        }}
        data={firstChartData}
      />
      <VictoryAxis
        dependentAxis
        offsetX={1000}
        tickFormat={(value: number) => {
          return compactNumber(value)
        }}
        style={{
          axis: { stroke: 'transparent' },
          tickLabels: { fontSize: 12, padding: 10, fill: '#cccccc' },
          ticks: { stroke: '#eeeeee', size: 0 },
          grid: { stroke: '#eeeeee' },
        }}
      />
      <VictoryLine
        style={{
          data: { stroke: '#85DA47' },
        }}
        data={secondChartData}
      />
    </VictoryChart>
  )
}

export default IntergratedAdChart
