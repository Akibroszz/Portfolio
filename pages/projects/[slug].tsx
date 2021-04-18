import Layout from '../../components/layout'
import { getAllMarkdownIds, getMarkdownData } from '../../lib/markdown-parser'

export default function Project({ projectData }) {
  return (
    <Layout>
      { projectData.title }

      <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const projectData = await getMarkdownData(params.slug, '_projects')

  return {
    props: {
      projectData,
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllMarkdownIds('_projects')

  return {
    paths,
    fallback: false,
  }
}
