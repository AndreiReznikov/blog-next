'use client';

import { BACKEND_URL } from '@/lib/Constants';
import { useSession } from 'next-auth/react';
import { useCallback, useRef } from 'react';
import styles from './page.module.css'

export default function AddPostPage() {
  const session = useSession();

  const postData = useRef({
    title: '',
    description: '',
  });

  const addPost = useCallback(async () => {
    const res = await fetch(`${BACKEND_URL}/post/create`, {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
      },
      body: JSON.stringify({
        ...postData.current,
        authorId: 1,
      })
    });

    const data = await res.json();

    console.log(data);
  }, []);

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
              <button className={styles.button} onClick={addPost}>Add post</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}