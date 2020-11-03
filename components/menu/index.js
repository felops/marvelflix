import Link from 'next/link'
import styles from './menu.module.css'

export default function Menu() {
  return (
    <nav className={styles.nav}>
      <Link href='/' id='logo'>
        <a>Marvelflix</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='https://github.com/felops/marvelflix'>
        <a>Github</a>
      </Link>
    </nav>
  )
}
