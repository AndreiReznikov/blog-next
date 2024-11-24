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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...postData.current,
        userId: 1,
      })
    });

    const data = await res.json();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Add post</h1>
      <div className={styles.container}>
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
          <button className={styles.button} onClick={addPost}>Add post</button>
        </form>
      </div>
    </main>
  );
}