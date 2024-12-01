import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function SinglePost({ params }) {
  const session = await getServerSession(authOptions);

  let post;

  try {
    const res = await fetch(`${BACKEND_URL}/post/${params.id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    post = await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }

  if (!post) return (
    <div className={styles['not-found-container']}>The post have not been found</div>
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href='/profile'>&#8592; Back to your profile</Link>
        <article className={styles.article}>
          {
            session?.user?.id === post?.authorId
            && <Link className={styles['post-edit-link']} href={`edit/${params.id}`}>Edit</Link>
          }
          <h1>{post?.title}</h1>
          <p>{post?.description}</p>
        </article>
      </div>
    </main>
  )
}