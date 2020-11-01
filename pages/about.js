import Tape from '../components/tape/tape'
import styles from '../styles/about.module.css'

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.flexLeft}>
          <Tape />
        </div>
        <div className={styles.flexRight}>
          <h1 className={styles.h1}>ABOUT</h1>
          <p className={styles.description}>
            This website basically brings all the data from the official
            <a href="https://developer.marvel.com"> Marvel API</a> and shows it 
            in a organized way. The first idea was to get all movies from Marvel 
            and display them as Netflix does but, sadly, the API has data just 
            from the comics - and some of the heroes have missing informations.
          </p>
          <p className={styles.description}>
            But as I wanted to do something with the Marvel API and I already 
            had started the frontend before realizing this issue, I moved 
            forward to get the heroes and get the information from them instead 
            of the movies.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
