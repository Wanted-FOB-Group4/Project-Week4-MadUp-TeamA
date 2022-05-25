import { useMemo } from 'react'

import { IData } from 'types/types'
import Item from '../Item'
import { setAdStatus } from './status'

import styles from './intergratedAdStatus.module.scss'

interface Props {
  data: IData[]
}

const IntergratedAdStatus = (props: Props) => {
  const { data } = props
  const items = setAdStatus(data)

  const Status = useMemo(() => items.map((item) => <Item key={`chart-${item.content}`} item={item} />), [items])

  return <ul className={styles.group}>{Status}</ul>
}

export default IntergratedAdStatus
