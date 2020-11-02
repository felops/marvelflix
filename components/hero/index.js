import Link from 'next/link'
import Image from 'next/image'
import styles from './hero.module.css'

export default function Hero({ hero }) {
  const { id, name, thumbnail } = hero
  const imgPath = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`

  return (
    <figure key={id} className={styles.container}>
      <Link href={{
        pathname: '/heroes/[hero]',
        query: { hero: id },
      }}>
        <Image
          height={252}
          width={168}
          src={imgPath}
        />
      </Link>
      <figcaption className={styles.figcaption}>{name}</figcaption>
    </figure>
  )
}
