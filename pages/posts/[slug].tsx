import Layout from '../../components/layout'
import homeStyles from '../../styles/Home.module.scss'
import postStyles from '../../styles/Post.module.scss'

import { getAllMarkdownIds, getMarkdownData } from '../../lib/markdown-parser'
//{ postData.title }

export default function Post({ postData }) {
  return (
    <Layout>
      <div id={ postStyles.post } className={ homeStyles.sheet }>
        <h1 className={ postStyles.title }>{ postData.title }</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div className={ postStyles.padder }/>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const postData = await getMarkdownData(params.slug, '_posts')

  return {
    props: {
      postData,
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllMarkdownIds('_posts')

  return {
    paths,
    fallback: false,
  }
}