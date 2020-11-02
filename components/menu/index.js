import Link from 'next/link'
import styles from './menu.module.css'

export default function Menu() {
  return (
    <nav className={styles.nav}>
      <Link href='/' id='logo'>Marvelflix</Link>
      <Link href='/about'>About</Link>
      <Link href='https://github.com/felops/marvelflix'>Github</Link>
    </nav>
  )
}
