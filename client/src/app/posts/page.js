import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Post from '@/components/Post/Post';

export default async function PostsPage() {
  const session = await getServerSession(authOptions);

  let posts = [];

  try {
    const res = await fetch(`${BACKEND_URL}/post`, { cache: 'no-cache' });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    posts = await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    posts = [];
  }

  if (!posts?.length) return (
    <div className={styles['not-found-container']}>
      <span>The posts have not been found</span>
      {session?.user &&
        <div className={styles['add-post-link-container']}>
          {session?.user && <Link className={styles['add-post-link']} href='/posts/add'>+ Add post</Link>}
        </div>
      }
    </div>
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>All Posts</h1>
        {session?.user &&
          <div className={styles['add-post-link-container']}>
            {session?.user && <Link className={styles['add-post-link']} href='/posts/add'>+ Add post</Link>}
          </div>
        }
        <div className={styles['posts-wrapper']}>
          {posts?.map(post => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}