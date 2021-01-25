import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.scss';

export default function Layout(
{
  children
}: 
{
  children: React.ReactNode
}) 
{
  return (
    <div className={ styles.container }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="The online portfolio of Yenti Verle (Akibroszz)"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            "Yenti Verle"
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content="Yenti Verle" />
        <meta name="twitter:card" content="summary_large_image" />

        <title>Yenti Verle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={ styles.header }>
        <ul className={ styles.header_container }>
          <ul className={ styles.header_left }>
            <li className={ styles.logo }>
              <Link href="/test">
                <a>
                  <Image src="/yv-logo.png" alt="Yenti Verle Initials" width={ 45 } height={ 45 }></Image>
                </a>
              </Link>
            </li>

            <li className={ styles.divider }></li>

            <li className={ styles.icon }>
              <Link href="https://github.com/Akibroszz">
                <a>
                  <Image src="/github-logo.png" alt="Github Logo" width={ 45 } height={ 45 }></Image>
                </a>
              </Link>
            </li>

            <li className={ styles.icon }>
              <Link href="https://www.linkedin.com/in/yenti-verle-a135581b7/">
                <a>
                  <Image src="/linkedin-logo.png" alt="LinkedIn Logo" width={ 45 } height={ 45 }></Image>
                </a>
              </Link>
            </li>

          </ul>
          <ul className={ styles.header_right }>
            <li className={ styles.header_link }>
              <Link href="index.js">
                <a className={ styles.active }>Home</a>
              </Link>
            </li>

            <li className={ styles.header_link }>
              <Link href="about">
                <a>About</a>
              </Link>
            </li>

            <li className={ styles.header_link }>
              <Link href="projects">
                <a>Projects</a>
              </Link>
            </li>

            <li className={ styles.header_link }>
              <Link href="articles">
                <a>Articles</a>
              </Link>
            </li>

            <li className={ styles.header_link }>
              <Link href="contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </ul>
      </header>

      <main>{ children }</main>

      <footer className={ styles.footer }>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={ styles.logo } />
        </a>
      </footer>
    </div>
  )
}