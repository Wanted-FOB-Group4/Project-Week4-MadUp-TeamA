import styles from './statusItem.module.scss'

interface IStatusItem {
  value: string
  content: string
  unit: string
}

const StatusItem = ({ item }: { item: IStatusItem }) => {
  return (
    <li key={`item_${item.value}`} className={styles.item}>
      <dl>
        <dt>{item.content}</dt>
        <dd>
          {item.value} {item.unit}
        </dd>
      </dl>

      <div className={styles.rate}>
        <span className={styles.rateText}>1{item.unit}</span>
      </div>
    </li>
  )
}

export default StatusItem