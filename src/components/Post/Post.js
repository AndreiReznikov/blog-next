'use client';

import Link from 'next/link';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './post.module.css';
import { useSession } from 'next-auth/react';

export default function Post({ post }) {
  const session = useSession();
  console.log(session)
  const deletePost = async (id) => {
    const res = await fetch(`${BACKEND_URL}/post/${id}`, {
      cache: 'no-cache',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
      },
    });
  };

  return (
    <article className={styles.article} key={post?.id}>
      <Link className={styles['post-link']} href={`posts/${post?.id}`}>
        <h2>{post?.title}</h2>
        <p>{post?.description}</p>
      </Link>
      {
        session?.data?.user?.id === post?.authorId
        &&
        <div className={styles['actions-container']}>
          <Link className={styles['post-edit-link']} href={`posts/edit/${post?.id}`}>Edit</Link>
          <button onClick={() => deletePost(post?.id)} className={styles['post-delete-button']}>Delete</button>
        </div>
      }
    </article>
  )
}