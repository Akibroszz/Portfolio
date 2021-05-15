import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'
import Link from "next/link";
import { getSortedMarkdownData } from '../lib/markdown-parser'

export default function Posts({ allPostsData }) {
  return (
    <Layout>
      <div className={ styles.sheet }>
        { allPostsData.map(({ slug, title }) =>
          (
            <Link href={`/posts/${slug}`}>
              <a>
                <img src={`/static/images/posts/${slug}/cover.jpg`} alt={title} className={styles.summed_image} />
              </a>
            </Link>
          ))
        }
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedMarkdownData('_posts')

  return {
    props: {
      allPostsData,
    }
  }
}
