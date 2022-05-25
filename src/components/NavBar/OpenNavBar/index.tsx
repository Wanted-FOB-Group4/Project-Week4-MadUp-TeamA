import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import Dropdown from 'components/Dropdown'
import { DashboardIcon, LightIcon, LogoIcon, ManagementIcon } from 'assets/svgs'

import styles from './openNavBar.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const OpenNavBar = (props: Props) => {
  const { setIsOpen } = props
  const dropdownOptions = [
    { value: 'madup', content: '매드업' },
    { value: 'plus', content: '서비스 추가하기' },
  ]

  return (
    <>
      <div className={cx(styles.logo)}>
        <LogoIcon />
      </div>
      <div className={styles.service}>
        <div>서비스</div>
        <Dropdown options={dropdownOptions} />
      </div>
      <nav className={styles.nav}>
        <div>광고 센터</div>
        <NavLink
          to='/'
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <DashboardIcon />
          <span>대시보드</span>
        </NavLink>
        <NavLink
          to='management'
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <ManagementIcon />
          <span>광고관리</span>
        </NavLink>
      </nav>
      <div className={styles.footer}>
        <div className={styles.guide}>
          <div className={styles.lightIcon}>
            <LightIcon />
          </div>
          <div className={styles.guideText}>
            <div>레버 이용 가이드</div>
            <div>시작하기 전에 알아보기</div>
          </div>
        </div>
        <div className={styles.terms}>
          <p>레버는함께만들어갑니다</p>
          <a href='javascript;:'>이용약관</a>
        </div>
      </div>
    </>
  )
}
export default OpenNavBar
