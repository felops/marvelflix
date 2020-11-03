import Link from 'next/link'
import styles from './tape.module.css'

export default function Carousel() {
  return (
    <div className={[styles.tape, styles.bounce].join(' ')}>
      <div className={[styles.tapeFace, styles.tapeFaceFront].join(' ')}>
        <Link href='https://www.youtube.com/watch?v=iGJKYwyhYJo'>
          <a>
            <img src="tape.jpg" />
          </a>
        </Link>
      </div>
      <div className={[styles.tapeFace, styles.tapeFaceBack].join(' ')} />
      <div className={[styles.tapeFaceSideView, styles.tapeFaceRight].join(' ')} />
      <div className={[styles.tapeFaceSideView, styles.tapeFaceLeft].join(' ')} />
      <div className={[styles.tapeFaceTopView, styles.tapeFaceTop].join(' ')} />
      <div className={[styles.tapeFaceTopView, styles.tapeFaceBottom].join(' ')} />
    </div>
  )
}
