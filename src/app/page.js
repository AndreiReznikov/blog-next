import Link from 'next/link'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'

export default function Home() {
  const session = getServerSession();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Hello! Welcome to the Next Blog! Here you can write your own posts, as well as read the posts of other authors.
        </h1>
        <h2 className={styles.subtitle}>
          To become our author, <Link className={styles.link} href='/login'>log in</Link> or <Link className={styles.link} href='/register'>register</Link>
        </h2>
      </div>
    </main>
  )
}
