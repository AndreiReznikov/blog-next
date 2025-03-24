'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/Constants';

import styles from './comment.module.css';

export default function Comment({ comment }) {
  const session = useSession();
  const router  = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const { postId, authorId, id: commentId } = comment ?? {};

      console.log(postId, authorId, commentId);

      const response = await fetch(`${BACKEND_URL}/comment/delete`, {
        cache: 'no-cache',
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
        },
        body: JSON.stringify({
          postId,
          authorId,
          commentId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error when sending a comment');
      }
    } catch (err) {
      console.error('Fetch error:', error);
    } finally {
      setTimeout(() => router.refresh());
    }
  };

  return (
    <div key={comment?.id} className={styles.comment}>
      {comment.authorId === session?.data?.user?.id && <span onClick={handleDelete} className={styles['comment-close-icon']} />}
      <p className={styles['comment-text']}>{comment?.text}</p>
      <div className={styles['comment-info']}>
        <span className={styles['comment-author']}>
          {comment?.author?.name}
        </span>
        <span className={styles['comment-date']}>
          {comment?.creationDate}
        </span>
      </div>
    </div>
  )
}