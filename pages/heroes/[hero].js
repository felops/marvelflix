import Error from 'next/error'
import Image from 'next/image'
import styles from '../../styles/[hero].module.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const ItemList = ({ object, name }) => {
  if(!object) {
    return (
      <div key={name} className={styles.heroItemContainer}>
        <h2 className={styles.h2Item}>{name}</h2>
        <ul>
          <li><Skeleton width={150} /></li>
          <li><Skeleton width={150} /></li>
          <li><Skeleton width={150} /></li>
        </ul>
      </div>
    )
  }

  const isEmpty = object.items.length === 0
  const remaining = object.available - object.items.length
  const tail = remaining > 0
    ? <li key={remaining} className={styles.textGreyLight}>
        and <span className={styles.textRed}>{remaining} MORE..</span>
      </li>
    : null
  const itemDescription = isEmpty
    ? <li className={styles.textGrey}>
        No {name}
      </li>
    : object.items.map(item =>
      <li key={item} className={styles.textGreyLight}>
        {item}
      </li>
    )

  return (
    <div key={name} className={styles.heroItemContainer}>
      <h2 className={styles.h2Item}>{name}</h2>
      <ul>
        {itemDescription}
        {tail}
      </ul>
    </div>
  )
}

function Hero({ hero, errorCode }) {
  const {
    name,
    description,
    thumbnail,
    comics,
    series,
    stories,
    events
  } = hero || {}

  if(errorCode) {
    let title = 'Sorry, J.A.R.V.I.S. was not able to load the data'

    if(errorCode === 404) {
      title = 'Sorry, J.A.R.V.I.S. could not find this hero'
    }

    return (
      <Error
        title={title}
        statusCode={errorCode}
      />
    )
  }

  return (
    <SkeletonTheme color="#202020" highlightColor="#333">
      <div className={styles.heroContainer}>
        <div className={styles.heroPhoto}>
        {hero ? (
          <Image
            height={300}
            width={300}
            src={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`}
            loading='lazy'
          />
        ) : (
          <Skeleton
            height={300}
            width={300}
          />
        )}
        </div>
        <div className={styles.heroInfo}>
          <h1 className={styles.h1Name}>{name || <Skeleton width={150} />}</h1>
          {description ? (
            <p className={styles.description}>
              {description}
            </p>
          ) : (
            <p className={[styles.textGrey, styles.description].join(' ')}>
              {name 
                ? 'No description provided.'
                : <Skeleton count={3} />
              }
            </p>
          )}
          <p className='marvel'>Data provided by Marvel. © 2014 Marvel</p>
        </div>
      </div>
      <div className={styles.heroItemsContainer}>
        <ItemList object={comics} name='comics' />
        <ItemList object={series} name='series' />
        <ItemList object={stories} name='stories' />
        <ItemList object={events} name='events' />
      </div>
    </SkeletonTheme>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params: { hero } }) {
  try {
    const res = await fetch(process.env.MARVEL_API.concat(`/heroes/${hero}`))

    if (res.status === 404) {
      return {
        props: {
          errorCode: 404,
        },
      }
    }

    const heroData = await res.json()

    return {
      props: {
        hero: heroData,
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

export default Hero
