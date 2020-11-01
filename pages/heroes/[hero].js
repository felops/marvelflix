import Image from 'next/image'
import styles from '../../styles/[hero].module.css'

const ItemList = ({ object, name }) => {
  const isEmpty = !object || (object && object.items.length === 0)
  const remaining = object && object.available - object.items.length
  const tail = remaining > 0
    ? <li className={styles.textGreyLight}>
        and <span className={styles.textRed}>{remaining} MORE..</span>
      </li>
    : null
  const itemDescription = isEmpty
    ? <li className={styles.textGrey}>
        No {name}
      </li>
    : object && object.items.map(item =>
      <li key={item.item} className={styles.textGreyLight}>
        {item}
      </li>
    )

  return (
    <div className={styles.heroItemContainer}>
      <h2 className={styles.h2Item}>{name}</h2>
      <ul>
        {itemDescription}
        {tail}
      </ul>
    </div>
  )
}

function Hero({ hero }) {
  const {
    name,
    description,
    thumbnail,
    comics,
    series,
    stories,
    events
  } = hero || {}

  return [
    <div className={styles.heroContainer}>
      <div className={styles.heroPhoto}>
      {hero && (
        <Image
          height={300}
          width={300}
          src={`${thumbnail.path}.${thumbnail.extension}`}
          loading='lazy'
        />
      )}
      </div>
      <div className={styles.heroInfo}>
        <h1 className={styles.h1Name}>{name}</h1>
        {description ? (
          <p className={styles.description}>
            {description}
          </p>
        ) : (
          <p className={[styles.textGrey, styles.description].join(' ')}>
            No description provided.
          </p>
        )}
      </div>
    </div>,
    <div className={styles.heroItemsContainer}>
      {comics && <ItemList object={comics} name='comics' />}
      {series && <ItemList object={series} name='series' />}
      {stories && <ItemList object={stories} name='stories' />}
      {events && <ItemList object={events} name='events' />}
    </div>
  ]
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params: { hero } }) {
  const res = await fetch(process.env.MARVEL_API.concat(`/heroes/${hero}`))
  const heroData = await res.json()

  return {
    props: {
      hero: heroData
    },
  }
}

export default Hero
