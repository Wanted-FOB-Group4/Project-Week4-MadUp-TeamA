import { useEffect, useMemo, useRef, useState } from 'react'
import cx from 'classnames'

import CloseNavBar from './CloseNavBar'
import OpenNavBar from './OpenNavBar'

import styles from './navBar.module.scss'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const nav = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handelOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!nav.current || nav.current.contains(event.target as Node)) return
      setIsOpen(!(window.innerWidth < 1050))
    }
    const handleResize = () => setIsOpen(!(window.innerWidth < 1050))
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handelOutsideClick)
    document.addEventListener('touchstart', handelOutsideClick)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handelOutsideClick)
      document.removeEventListener('touchstart', handelOutsideClick)
    }
  }, [nav])

  const FullNavBar = useMemo(
    () => (isOpen ? <OpenNavBar isOpen={isOpen} setIsOpen={setIsOpen} /> : <CloseNavBar setIsOpen={setIsOpen} />),
    [isOpen]
  )

  return (
    <aside className={cx(styles.navBar, { [styles.closeBar]: !isOpen })} ref={nav}>
      {FullNavBar}
    </aside>
  )
}

export default NavBar
