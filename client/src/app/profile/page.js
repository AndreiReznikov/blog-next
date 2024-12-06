import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BACKEND_URL } from '@/lib/Constants';
import Post from '@/components/Post/Post';
import styles from './page.module.css'

export default async function Profile() {
  const session = await getServerSession(authOptions);

  let profile;

  try {
    const res = await fetch(`${BACKEND_URL}/user/${session?.user?.id}`, {
      headers: {
        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    profile = await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }

  const { name, email, posts } = profile ?? {};

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1>{name}</h1>
          <div>{email}</div>
        </div>
        {posts?.length > 0 && <h2 className={styles.title}>Your posts</h2>}
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