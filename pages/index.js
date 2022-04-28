import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Official Team Rivals Website</title>
        <meta name="description" content="An Offical website for Team Rival where one can get all the latest news,
         upcoming schedule, results, ticket information, player profiles,
         and information about Team Rivals, 
        and buy merchandise of Team Rivals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className={styles.title}>Hello From Team Rivals.</h1>

      <Image className={styles.logo}src='/logo-bg-white.png' layout="intrinsic" height={500} width={500} alt='Team Logo'/>
      <footer className={styles.footer}>
          Powered by CSE 18
          <span className={styles.logo}>
            <Image src="/favicon.ico" alt="favicon" width={22} height={22} />
          </span>
      </footer>
    </div>
  )
}
