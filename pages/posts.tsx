import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'
import Image from "next/image";
import Link from "next/link";
import { getSortedMarkdownData } from '../lib/markdown-parser'

export default function Posts({ allPostsData }) {
  return (
    <Layout>
      <div className={ styles.sheet }>
        { allPostsData.map(({ slug, title, abstract, tags }) =>
          (
            <Link href={`/posts/${slug}`}>
              <a>
                <li className={ styles.card }>
                  <div className={ styles.card }>
                    <div className={ styles.image_container }>
                      <Image src={`/static/images/posts/${slug}/cover.jpg`} alt={title} width={50} height={50} className={styles.highlight_image}/>
                      <ul className={ styles.tag_list }>
                        { tags.forEach(tag =>
                          (
                            <li className={ styles.image_tag }>{ tag }</li>
                          )) }
                      </ul>
                    </div>
                    <div className={ styles.card_info }>
                      <p className={ styles.card_title }>{ title }</p>
                      <p className={ styles.card_description }>{ abstract }</p>
                    </div>
                  </div>
                </li>
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
