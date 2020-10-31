import Carousel from '../components/carousel/carousel'
import styles from '../styles/index.module.css'

function Home({ featured, xMen, guardiansOfTheGalaxy }) {
  return [
    <div className={styles.divCarousel}>
      <h2 className={styles.h2Home}>Featured</h2>
      <Carousel data={featured} />
    </div>,
    <div className={styles.divCarousel}>
      <h2 className={styles.h2Home}>X-Men</h2>
      <Carousel data={xMen} />
    </div>,
    <div className={styles.divCarousel}>
      <h2 className={styles.h2Home}>Guardians of the Galaxy</h2>
      <Carousel data={guardiansOfTheGalaxy} />
    </div>,
  ]
}

export async function getStaticProps() {
  const res = await fetch(process.env.MARVEL_API.concat('/heroes'))
  const heroes = await res.json()

  return {
    props: {
      featured: heroes.featured,
      xMen: heroes.xMen,
      guardiansOfTheGalaxy: heroes.guardiansOfTheGalaxy,
    },
  }
}

export default Home