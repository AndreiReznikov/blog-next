import Link from 'next/link';
import { authors } from '@/mock/mock';
import styles from './page.module.css'

export default async function Authors() {
  // const res = await fetch('http://localhost:3000/api/posts');
  // const { posts } = await res.json();

  // console.log(posts);

  return (
    <main className={styles.main}>
      <h1>Authors</h1>
      <div className={styles.container}>
        {authors?.map(author => (
          <Link className={styles.link} href={`authors/${author?.id}`}>
            <article className={styles.article} key={author?.id}>
              <h2>{author?.name}</h2>
              <p>{author?.posts?.length} posts</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}