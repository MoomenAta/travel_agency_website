import React, { useEffect } from 'react'
import styles from '../styles/aboutus.module.css'

export default function Aboutus() {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <div className={styles.wrapper}>
      <section className={styles.aboutusHeading}>
        <img src='/imgs/mountain.jpg' alt='aboutUsImg' width={500} />
        <h1>ABOUT US</h1>
      </section>

      <section className={styles.aboutusSec2}>
        <div className={styles.aboutusSec2Container}>
          <div className={styles.ourStoryPart1}>
            <h1>OUR STORY</h1>
            <p>How we started it ?</p>
          </div>
          <div className={styles.ourStoryPart2}>
            <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
            sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
            quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
          </div>
        </div>
      </section>

      <section className={styles.aboutusSec3}>
        <h1 className={styles.aboutusSec3Heading}>Testominal</h1>
        <div className={styles.testominalsContainer}>
          <div className={styles.testo}>
            <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            Neque porro quisquam est.
            </p>
            <div className={styles.testominalWriter}>
              <img src='/imgs/icemountain.jpg' width={500} alt='testWriterImg' />
              <div className={styles.testominalWriterInfo}>
                <h1>John Doe</h1>
                <p>CEO</p>
              </div>
            </div>
          </div>
          <div className={styles.testo}>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
              Neque porro quisquam est.
              </p>
              <div className={styles.testominalWriter}>
                <img src='/imgs/icemountain.jpg' width={500} alt='testWriterImg' />
                <div className={styles.testominalWriterInfo}>
                  <h1>John Doe</h1>
                  <p>CEO</p>
                </div>
              </div>
          </div>
          <div className={styles.testo}>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
              Neque porro quisquam est.
              </p>
              <div className={styles.testominalWriter}>
                <img src='/imgs/icemountain.jpg' width={500} alt='testWriterImg' />
                <div className={styles.testominalWriterInfo}>
                  <h1>John Doe</h1>
                  <p>CEO</p>
                </div>
              </div>
          </div>
        </div>
      </section>

    </div>
  )
}
