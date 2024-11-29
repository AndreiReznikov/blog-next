import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css';

export default async function PostsPage() {
  const res = await fetch(`${BACKEND_URL}/post`, { cache: 'no-cache' });
  const posts = await res.json();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>All Posts</h1>
        <div className={styles['posts-wrapper']}>
          {posts?.map(post => (
            <Link href={`posts/${post.id}`}>
              <article key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}