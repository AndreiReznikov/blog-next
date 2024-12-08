'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/Constants';
import { truncate } from '@/lib/Utils';
import styles from './post.module.css';

export default function Post({ post }) {
  const session = useSession();
  const router = useRouter();
  console.log(post);
  const deletePost = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/posts/${id}`, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
        },
      }).then(() => router.refresh());
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <article className={styles.article} key={post?.id}>
      <Link className={styles['post-link']} href={`/posts/${post?.id}`}>
        <h2>{post?.title}</h2>
        <div className={styles['post-info']}>
          <span className={styles.info}>{post?.author?.name}</span>
          {' '}
          <span className={styles.info}>{post?.creationDate}</span>
        </div>
        <p className={styles.description}>{truncate(post?.description, 280)}</p>
      </Link>
      {
        session?.data?.user?.id === post?.authorId
        &&
        <div className={styles['actions-container']}>
          <Link className={styles['post-edit-link']} href={`/posts/edit/${post?.id}`}>Edit</Link>
          <button
            onClick={() => deletePost(post?.id)}
            className={styles['post-delete-button']}
          >
            Delete
          </button>
        </div>
      }
    </article>
  )
}