'use client';

import { BACKEND_URL } from '@/lib/Constants';
import { useCallback, useState, useEffect } from 'react';
import styles from './page.module.css'

export default function EditPostPage({ params }) {
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

  const editPost = async () => {
    const res = await fetch(`${BACKEND_URL}/post/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...currentPost,
      })
    });

    const data = await res.json();

    console.log(data);
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, [setCurrentPost]);

  return (
    <main className={styles.main}>
      <h1>Edit post</h1>
      <div className={styles.container}>
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
          <button className={styles.button} onClick={editPost}>Edit post</button>
        </form>
      </div>
    </main>
  );
}
