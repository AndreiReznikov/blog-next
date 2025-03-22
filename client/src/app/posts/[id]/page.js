import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import DeleteButton from '@/components/DeleteButton/DeleteButton';
import CommentForm from '@/components/CommentForm/CommentForm';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css';

export default async function SinglePost({ params }) {
  const session = await getServerSession(authOptions);

  let post;

  try {
    const res = await fetch(`${BACKEND_URL}/posts/${params.id}`, {
      headers: {
        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      }
    });
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
        <Link href='/posts'>&#8592; To all posts</Link>
        <article className={styles.article}>
          {
            session?.user?.id === post?.authorId
            &&
            <div className={styles['actions-container']}>
              <Link className={styles['post-edit-link']} href={`edit/${post?.id}`}>Edit</Link>
              <DeleteButton id={post?.id} />
            </div>
          }
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles['post-info']}>
            <span className={styles.info}>{post?.author?.name}</span>
            {' '}
            <span className={styles.info}>{post?.creationDate}</span>
          </div>
          <p className={styles.description}>{post?.description}</p>
        </article>
        <CommentForm articleId={post?.id} authorId={post?.authorId} authorName={session?.user?.name} />
      </div>
    </main>
  )
}