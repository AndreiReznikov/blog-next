'use client';

import { BACKEND_URL } from '@/lib/Constants';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export default function AddPostPage({ params }) {
  const session = useSession();
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

  const addPost = async () => {
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
    <div>
      <h1>Edit post</h1>
      <div>
        <input
          name="title"
          value={currentPost.title}
          onChange={handleChange}
          placeholder='Title'
        />
        <textarea
          name="description"
          value={currentPost.description}
          onChange={handleChange}
          placeholder='Description'
        />
        <button onClick={addPost}>Edit post</button>
      </div>
    </div>
  );
}
