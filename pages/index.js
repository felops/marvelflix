import { useState } from 'react'
import Hero from '../components/hero'
import Carousel from '../components/carousel'
import styles from '../styles/index.module.css'

const HEROES_LIMIT = 100

function Home({ heroes, heroesByMovies, errorCode }) {
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(HEROES_LIMIT)
  const [allHeroes, setAllHeroes] = useState(heroes)

  if(errorCode) {
    return (
      <Error
        title='Sorry, J.A.R.V.I.S. was not able to load the data.'
        statusCode={errorCode}
      />
    )
  }

  const loadHeroes = async (e) => {
    if(loading) {
      return
    }

    e.target.blur()

    try {
      setLoading(true)
      const data = await fetch(
        process.env.NEXT_PUBLIC_MARVEL_API
          .concat(`/heroes?offset=${offset}&limit=${HEROES_LIMIT}`)
      )
      const { heroes } = await data.json()
      setAllHeroes([
        ...allHeroes,
        ...heroes,
      ])
      setOffset(offset + HEROES_LIMIT)
    } catch (e) {
      alert('Sorry, J.A.R.V.I.S. was not able to load the data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {
        heroesByMovies
          .sort((a, b) => a.movie.localeCompare(b.movie))
          .map(({ movie, heroes }) => (
            <section key={movie} className={styles.section}>
              <h2 className={styles.h2}>{movie}</h2>
              <Carousel data={heroes.sort((a, b) =>
                a.name.localeCompare(b.name)
              )} />
            </section>
          ))
      }
      <section className={styles.section}>
        <h2 className={styles.h2}>ALL HEROES</h2>
        <div className={styles.allHeroesContainer}>
          {allHeroes.map(hero => (
            <span key={hero.id}>
              <Hero hero={hero} />
            </span>
          ))}
        </div>
      </section>
      <div className={styles.lastBlock}>
        <p className='marvel'>
          Data provided by Marvel. © 2014 Marvel
        </p>
        <button
          className={styles.button}
          disabled={loading}
          onClick={loadHeroes}
          >
          {loading
            ? 'LOADING..'
            : 'LOAD MORE'
          }
        </button>
      </div>
    </>
  )
}

export async function getStaticProps() {
  try {
    const api = process.env.MARVEL_API
    
    const resHeroesByMovies = await fetch(api.concat('/heroes/movies'))
    const resHeroes = await fetch(
      api.concat(`/heroes?offset=0&limit=${HEROES_LIMIT}`)
    )
    
    const heroesByMovies = await resHeroesByMovies.json()
    const { heroes } = await resHeroes.json()
  
    return {
      props: {
        heroes,
        heroesByMovies,
      },
    }
  } catch (e) {
    return {
      props: {
        errorCode: 500,
      },
    }
  }
}

export default Home
