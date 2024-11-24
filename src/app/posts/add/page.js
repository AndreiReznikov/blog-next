'use client';

import { BACKEND_URL } from '@/lib/Constants';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

export default function AddPostPage() {
  const session = useSession();

  const postData = useRef({
    title: '',
    description: '',
  });

  const addPost = async () => {
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

    console.log(data);
  };

  return (
    <div>
      <h1>Add post</h1>
      <div>
        <input onChange={(e) => postData.current.title = e.target.value} placeholder='Title' />
        <textarea onChange={(e) => postData.current.description = e.target.value} placeholder='Description' />
        <button onClick={addPost}>Add post</button>
      </div>
    </div>
  );
}