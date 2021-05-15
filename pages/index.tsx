import Link from 'next/link'
import Image from 'next/image'

import { getSortedMarkdownData } from '../lib/markdown-parser'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'

export default function Home({ allProjectsData, allPostsData })
{
  return (
    <Layout>
      <main className={ styles.main }>
        <div className={ styles.home }>
          <div className={ styles.info }>
            <h1 className={ styles.name }>Yenti Verle</h1>
            <p className={ styles.description }>
              I'm a final year computer security professional student at Howest Brugge in Belgium. lorem ipsum...
            </p>
          </div>
          
          <div className={ styles.hero }>
            <Image src='/static/images/picture.jpg' alt='Picture of me' width={400} height = {500}/>
          </div>
        </div>
        <div className={ styles.sheet }>
          <div className={ styles.about }>
            <h1 className={ styles.big }>About</h1>
            <p className={ styles.description }>
              I'm currently studying at Howest Brugge. In my free time I enjoy doing Hack The Box challenges, working on side projects and learning about low level computing. My most proficient programming languages are C# and Python.
            </p>
          </div>

          <div className={ styles.projects }>
            <h1 className={ styles.big }>Projects</h1>
            <ul className={ styles.collection_wrapper }>
              { allProjectsData.slice(0, 3).map(({ slug, title  }) =>
              (
                <Link href={`/projects/${slug}`}>
                    <a>
                      <img src={`/static/images/projects/${slug}/cover.jpg`} alt={title} className={styles.highlight_image} />
                    </a>
                </Link>
              ))}
            </ul>
          </div>

          <div className={ styles.articles }>
            <h1 className={ styles.big }>Articles</h1>
            <ul className={ styles.collection_wrapper }>
              { allPostsData.slice(0, 3).map(({ slug, title }) =>
              (
                <Link href={`/posts/${slug}`}>
                  <a>
                    <img src={`/static/images/posts/${slug}/cover.jpg`} alt={title} className={styles.highlight_image} />
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}

//<Image src={`/static/images/posts/${slug}/cover.jpg`} alt={title} width={50} height={50} className={styles.card}/>
//<Image src={`/static/images/projects/${slug}/cover.jpg`} alt={title} width={50} height={50} className={styles.card}/>

export async function getStaticProps() {
  const allPostsData = getSortedMarkdownData('_posts')
  const allProjectsData = getSortedMarkdownData('_projects')

  return {
    props: {
      allPostsData,
      allProjectsData,
    }
  }
}