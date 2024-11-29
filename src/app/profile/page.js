import Link from 'next/link';
import styles from './page.module.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const { name, email, aboutInfo, posts } = session?.user ?? {};

  return (
    <main className={styles.main}>
      <div className={styles.container}>
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
      </div>
    </main>
  );
}