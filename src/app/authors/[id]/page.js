import Link from 'next/link';
import { author } from '@/mock/mock';
import styles from './page.module.css'

export default async function PostsPage() {
  // const res = await fetch('http://localhost:3000/api/posts');
  // const { posts } = await res.json();

  const { name, email, aboutInfo, posts } = author[0];

  return (
    <main className={styles.main}>
      <div className={styles.info}>
        <h1>{name}</h1>
        <div>{email}</div>
        <p>
          {aboutInfo}
        </p>
      </div>
      <h2 className={styles.title}>Author posts</h2>
      <div className={styles.posts}>
        {posts?.map(post => (
          <article key={post?.id}>
            <Link href={`posts/${post?.id}`}>
              <h3>{post?.title}</h3>
            </Link>
            <p>{post?.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}