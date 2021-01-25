import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';

import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout';
import styles from '../styles/Home.module.scss';

export default function Home({ allPostsData }: 
{ allPostsData:
  {
    date: string;
    title: string;
    description: string;
    image: string;
    tag1: string;
    tag2: string;
    id: string;
  }[] 
})
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
            <Image src="/picture.jpg" alt="Picture of me" width={ 400 } height = { 500 }></Image>
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
              <Link href="https://github.com/Akibroszz/16bit-VirtualMachine">
                <a>
                  <li className={ styles.card }>
                    <div className={ styles.card }>
                      <div className={ styles.image_container_wrapper }>
                        <div className={ styles.image_container }>
                          <Image src="/test.jpg" alt="16bit Virtual Machine Screenshot" width={ 50 } height={ 50 }></Image>
                        </div>
                        <ul className={ styles.image_tag_list }>
                          <li className={ styles.image_tag }>C#</li>
                          <li className={ styles.image_tag }>LLC</li>
                        </ul>       
                      </div>

                    <div className={ styles.card_info }>
                      <p className={ styles.card_title }>16bit Virtual Machine</p>
                      <p className={ styles.card_description }>A dotnet core application I wrote to learn about low level computing, right now it can take basic, custom written, assembly code and process it.</p>
                        <a>
                        </a>
                    </div>
                  </div>
                </li>
              </a>
              </Link>
            </ul>
          </div>

          <div className={ styles.articles }>
            <h1 className={ styles.big }>Articles</h1>
            <ul className={ styles.collection_wrapper }>
              { allPostsData.slice(0, 3).map(({ id, date, title, description, image, tag1, tag2 }) => 
              (
                <Link href={`/posts/${id}`}>
                  <a>
                    <li className={ styles.card }>
                      <div className={ styles.card }>
                        <div className={ styles.image_container_wrapper }>
                          <div className={ styles.image_container }>
                            <Image src={ `${image}` } alt={ title } width={ 50 } height={ 50 } className={ styles.highlight_image }></Image>
                          </div>
                          <ul className={ styles.image_tag_list }>
                            <li className={ styles.image_tag }>{ tag1 }</li> 
                            <li className={ styles.image_tag }>{ tag2 }</li> 
                          </ul>
                          <div className={ styles.image_date }>
                            { date }
                          </div>
                        </div>

                      <div className={ styles.card_info }>
                        <p className={ styles.card_title }>{ title }</p>
                        <p className={ styles.card_description }>{ description }</p>
                      </div>
                    </div>
                  </li>
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

export const getStaticProps: GetStaticProps = async () =>
{
  const allPostsData = getSortedPostsData();
  return {
    props: 
    {
      allPostsData
    }
  };
}