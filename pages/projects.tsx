import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'
import Link from "next/link";
import { getSortedMarkdownData } from '../lib/markdown-parser'

export default function Projects({ allProjectsData }) {
  return (
    <Layout>
      <div className={ styles.sheet }>
        { allProjectsData.map(({ slug, title }) =>
        (
          <Link href={`/projects/${slug}`}>
            <a>
              <img src={`/static/images/projects/${slug}/cover.jpg`} alt={title} className={styles.summed_image} />
            </a>
          </Link>
        ))
        }
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const allProjectsData = getSortedMarkdownData('_projects')

  return {
    props: {
      allProjectsData,
    }
  }
}
