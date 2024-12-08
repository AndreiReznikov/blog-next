'use client';

import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/Constants';
import styles from './page.module.css'

export default function AddPostPage() {
  const session = useSession();
  const router = useRouter();

  const postData = useRef({
    title: '',
    description: '',
  });

  const addPost = async () => {
    try {
      await fetch(`${BACKEND_URL}/posts/add`, {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
        },
        body: JSON.stringify({
          ...postData.current,
          authorId: session?.data?.user?.id,
        })
      }).then(async (res) => {
        const data = await res.json();
        const postId = data?.id;

        if (!postId) return;

        router.push(`/posts/${postId}`);
        setTimeout(() => router.refresh());
      });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Add post</h1>
        <div className={styles['form-container']}>
          <form className={styles.form}>
            <input
              className={styles.input}
              onChange={(e) => postData.current.title = e.target.value}
              placeholder='Title'
            />
            <textarea
              className={styles.textarea}
              onChange={(e) => postData.current.description = e.target.value}
              placeholder='Description'
            />
            <div className={styles['button-container']}>
              <button type='button' className={styles.button} onClick={addPost}>Add post</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}