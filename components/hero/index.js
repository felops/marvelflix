import Link from 'next/link'
import Image from 'next/image'
import styles from './hero.module.css'

export default function Hero({ hero }) {
  const { id, name, thumbnail } = hero
  const imgPath = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`

  return (
    <Link href={{
      pathname: '/heroes/[hero]',
      query: { hero: id },
    }}>
      <a>
        <figure className={styles.container}>
          <Image
            height={252}
            width={168}
            src={imgPath}
          />
          <figcaption className={styles.figcaption}>{name}</figcaption>
        </figure>
      </a>
    </Link>
  )
}
