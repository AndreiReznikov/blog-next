import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BACKEND_URL } from '@/lib/Constants';
import Post from '@/components/Post/Post';
import styles from './page.module.css'

export default async function AuthorPage({ params }) {
  const session = await getServerSession(authOptions);

  let author;

  try {
    const res = await fetch(`${BACKEND_URL}/users/${params.id}`, {
      headers: {
        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    author = await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }

  const { name, email, posts } = author ?? {};

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href='/authors'>&#8592; To all authors</Link>
        <div className={styles.info}>
          <h1>{name}</h1>
          <div>{email}</div>
        </div>
        {posts?.length > 0 ?
          <h2 className={styles.title}>Author's posts</h2>
          : <div className={styles['no-posts-text']}>The author has no posts</div>
        }
        <div className={styles.posts}>
          <div className={styles['posts-wrapper']}>
            {posts?.map(post => (
              <Post post={post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}