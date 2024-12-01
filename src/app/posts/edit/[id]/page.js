'use client';

import { BACKEND_URL } from '@/lib/Constants';
import { useCallback, useState, useEffect } from 'react';
import styles from './page.module.css'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function EditPostPage({ params }) {
  const session = useSession();
  const router = useRouter();

  const [currentPost, setCurrentPost] = useState({
    title: '',
    description: '',
  });

  const fetchPost = useCallback(async () => {
    const res = await fetch(`${BACKEND_URL}/post/${params.id}`);
    const data = await res.json();

    setCurrentPost({
      title: data?.title,
      description: data?.description,
    });
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const editPost = useCallback(async () => {
    await fetch(`${BACKEND_URL}/post/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
      },
      body: JSON.stringify({
        ...currentPost,
      })
    }).then(() => router.push('/posts'));
  }, [session, currentPost]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, [setCurrentPost]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit</h1>
        <div className={styles['form-container']}>
          <form className={styles.form}>
            <input
              name="title"
              value={currentPost.title}
              className={styles.input}
              onChange={handleChange}
              placeholder='Title'
            />
            <textarea
              name="description"
              value={currentPost.description}
              className={styles.textarea}
              onChange={handleChange}
              placeholder='Description'
            />
            <div className={styles['button-container']}>
              <button type='button' className={styles.button} onClick={editPost}>Edit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
