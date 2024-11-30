import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css';

export default async function SinglePost({ params }) {
  const res = await fetch(`${BACKEND_URL}/post/${params.id}`);
  const post = await res.json();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href='/posts'>&#8592; Back to all posts</Link>
        <article className={styles.article}>
          <h1>{post?.title}</h1>
          <p>{post?.description}</p>
        </article>
      </div>
    </main>
  )
}