import { useRef } from 'react'
import styles from './carousel.module.css'
import Hero from '../hero'

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

  return (
    <article
      ref={container}
      className={styles.container}
    >
      <span 
        onClick={onScrollBack}
        className={[styles.arrowContainer, styles.arrowContainerLeft].join(' ')}
      >
        <span className={styles.arrow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#F0131E">
            <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      </span>
      {data.map(hero => (
        <span key={hero.id} className={styles.hero}>
          <Hero hero={hero} />
        </span>
      ))}
      <span
        onClick={onScrollNext}
        className={[styles.arrowContainer, styles.arrowContainerRight].join(' ')}
      >
        <span className={styles.arrow}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#F0131E">
            <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </span>
    </article>
  )
}
