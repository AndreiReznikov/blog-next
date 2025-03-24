'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BACKEND_URL } from '@/lib/Constants';

import styles from './commentForm.module.css';

const CommentForm = ({ postId, authorId }) => {
  const session = useSession();
  const router = useRouter();

  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/comment/add`, {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
        },
        body: JSON.stringify({
          postId,
          authorId,
          text: comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Error when sending a comment');
      }
      setComment('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => router.refresh());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment... (maximum of 500 characters)"
        maxLength={500}
        required
      />
      <div className={styles['button-container']}>
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default CommentForm;