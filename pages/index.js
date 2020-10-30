import Carousel from '../components/carousel/carousel'

function Home({ featured, xMen, guardiansOfTheGalaxy }) {
  return [
    <div style={{ marginBottom: '1rem' }}>
      <h2>Featured</h2>
      <Carousel data={featured} />
    </div>,
    <div style={{ marginBottom: '1rem' }}>
      <h2>X-Men</h2>
      <Carousel data={xMen} />
    </div>,
    <div style={{ marginBottom: '1rem' }}>
      <h2>Guardians of the Galaxy</h2>
      <Carousel data={guardiansOfTheGalaxy} />
    </div>,
  ]
}

export async function getStaticProps() {
  const res = await fetch(process.env.MARVEL_API)
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