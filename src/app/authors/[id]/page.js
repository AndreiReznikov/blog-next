import Link from 'next/link';
import styles from './page.module.css'
import { BACKEND_URL } from '@/lib/Constants';

export default async function PostsPage({ params }) {
  const res = await fetch(`${BACKEND_URL}/user/${params.id}`);
  const author = await res.json();

  const { name, email, aboutInfo, posts } = author;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href='/authors'>&#8592; Back to authors</Link>
        <div className={styles.info}>
          <h1>{name}</h1>
          <div>{email}</div>
          <p>
            {aboutInfo}
          </p>
        </div>
        <h2 className={styles.title}>Author's posts</h2>
        <div className={styles.posts}>
          {posts?.map(post => (
            <article key={post?.id}>
              <Link href={`posts/${post?.id}`}>
                <h3>{post?.title}</h3>
              </Link>
              <p>{post?.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}