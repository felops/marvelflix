import { useRef } from 'react'
import Link from 'next/link'
import styles from './carousel.module.css'

const SCROLL_OFFSET = 0.92

export default function Carousel({ data }) {
  const container = useRef(null)

  function onScrollNext() {
    const { scrollLeft, offsetWidth } = container.current

    container.current.scrollTo({
      top: 0,
      left: scrollLeft + offsetWidth * SCROLL_OFFSET,
      behavior: 'smooth'
    })
  }

  function onScrollBack() {
    const { scrollLeft, offsetWidth } = container.current

    container.current.scrollTo({
      top: 0,
      left: scrollLeft - offsetWidth * SCROLL_OFFSET,
      behavior: 'smooth'
    })
  }

  function renderItems(item) {
    const {id, name, thumbnail } = item
    const imgPath = `${thumbnail.path}.${thumbnail.extension}`
    return (
      <figure className={styles.itemTile}>
        <Link href={`/item/${id}`}>
          <img
            height={200}
            width={200}
            src={imgPath}
          />
        </Link>
        <figcaption className={styles.figCaption}>{name}</figcaption>
      </figure>
    )
  }

  return (
    <section
      ref={container}
      className={styles.carouselContainer}
    >
      <span 
        onClick={onScrollBack}
        className={[styles.carouselArrow, styles.carouselArrowLeft].join(' ')}
      >
        <span className={styles.arrow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#F0131E">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      </span>
      {data.map(renderItems)}
      <span
        onClick={onScrollNext}
        className={[styles.carouselArrow, styles.carouselArrowRight].join(' ')}
      >
        <span className={styles.arrow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#F0131E">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </span>
    </section>
  )
}