import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export function getSortedMarkdownData(directory: string)
{
  const fullDirectory = path.join(process.cwd(), directory)

  // Get file names in the specified directory
  const fileNames = fs.readdirSync(fullDirectory)

  const allPostsData = fileNames.map(fileName => 
  {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(fullDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => 
  {
    if (a.date < b.date)
      return 
    else 
      return -1 
  })
}

export function getAllMarkdownIds(directory: string)
{
  const fullDirectory = path.join(process.cwd(), directory)
  const fileNames = fs.readdirSync(fullDirectory)

  return fileNames.map(fileName => 
    {
    return {
      params: 
      {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getMarkdownData(slug: string, directory: string)
{
  const fullDirectory = path.join(process.cwd(), directory)
  const fullPath = path.join(fullDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  }
}