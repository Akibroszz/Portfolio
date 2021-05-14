import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.scss';
import React from "react";

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
          content="The online portfolio of Yenti Verle"
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
              <Link href="/">
                <a>
                  <Image src="/static/images/yv-logo.png" alt="Yenti Verle Initials" width={45} height={45}/>
                </a>
              </Link>
            </li>

            <li className={styles.divider}/>

            <li className={ styles.icon }>
              <Link href="https://github.com/yentiverle">
                <a>
                  <Image src="/static/images/github-logo.png" alt="Github Logo" width={45} height={45}/>
                </a>
              </Link>
            </li>

            <li className={ styles.icon }>
              <Link href="https://www.linkedin.com/in/yenti-verle">
                <a>
                  <Image src="/static/images/linkedin-logo.png" alt="LinkedIn Logo" width={45} height={45}/>
                </a>
              </Link>
            </li>

          </ul>
          <ul className={ styles.header_right }>
            <li className={ styles.header_link }>
              <Link href="/">
                <a className={ styles.active }>Home</a>
              </Link>
            </li>

            <li className={ styles.header_link }>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </li>

            <li className={ styles.header_link }>
              <Link href="/posts">
                <a>Posts</a>
              </Link>
            </li>
          </ul>
        </ul>
      </header>

      <main>
        { children }
      </main>

      <footer className={ styles.footer }>

      </footer>
    </div>
  )
}