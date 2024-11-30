import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${BACKEND_URL}/post`, { cache: 'no-cache' });
  const posts = await res.json();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>All Posts</h1>
        {session?.user &&
          <div className={styles['add-post-link-container']}>
            <Link className={styles['add-post-link']} href='/posts/add'>+ Add post</Link>
          </div>
        }
        <div className={styles['posts-wrapper']}>
          {posts?.map(post => (
            <article className={styles.article} key={post?.id}>
              <Link className={styles['post-link']} href={`posts/${post?.id}`}>
                <h2>{post?.title}</h2>
                <p>{post?.description}</p>
              </Link>
              {
                session?.user?.id === post?.userId
                && <Link className={styles['post-edit-link']} href={`posts/edit/${post?.id}`}>Edit post</Link>
              }
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}