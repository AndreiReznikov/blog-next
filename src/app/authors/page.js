import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css'

export default async function Authors() {
  const res = await fetch(`${BACKEND_URL}/user`);
  const authors = await res.json();

  return (
    <main className={styles.main}>
      <h1>Authors</h1>
      <div className={styles.container}>
        {authors?.map(author => (
          <Link className={styles.link} href={`authors/${author?.id}`}>
            <article className={styles.article} key={author?.id}>
              <h2>{author?.name}</h2>
              <p>{author?.posts?.length ?? 0} posts</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}