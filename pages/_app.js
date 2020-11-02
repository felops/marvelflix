import '../styles/globals.css'
import Head from 'next/head'
import Menu from '../components/menu'
import styles from '../styles/app.module.css'

function App({ Component, pageProps }) {
  return [
    <Head>
      <title>Marvelflix</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
    </Head>,
    <Menu />,
    <main className={styles.main}>
      <Component {...pageProps} />
    </main>,
    <footer className={styles.footer}>
      Marvelflix by <a href="https://github.com/felops">felops</a>
    </footer>
  ]
}

export default App
