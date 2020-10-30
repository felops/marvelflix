import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    const { id, name, thumbnail } = item
    const imgPath = `${thumbnail.path}.${thumbnail.extension}`
    return (
      <figure key={id} className={styles.carouselItem}>
        <Link href={`/item/${id}`}>
          <Image
            height={200}
            width={200}
            src={imgPath}
            quality={20}
            loading='eager'
          />
        </Link>
        <figcaption className={styles.carouselItemFigcaption}>{name}</figcaption>
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
        className={[styles.carouselArrowContainer, styles.carouselArrowContainerLeft].join(' ')}
      >
        <span className={styles.carouselArrow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#F0131E">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      </span>
      {data.map(renderItems)}
      <span
        onClick={onScrollNext}
        className={[styles.carouselArrowContainer, styles.carouselArrowContainerRight].join(' ')}
      >
        <span className={styles.carouselArrow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#F0131E">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </span>
    </section>
  )
}