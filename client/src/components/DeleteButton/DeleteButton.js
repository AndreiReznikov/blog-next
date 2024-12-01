'use client';

import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from '@/lib/Constants';
import styles from './deleteButton.module.css';

export default function DeleteButton ({ id }) {
  const session = useSession();
  const router = useRouter();

  const deletePost = useCallback(async () => {
    await fetch(`${BACKEND_URL}/post/${id}`, {
      cache: 'no-cache',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session?.data?.backendTokens?.accessToken}`
      },
    }).then(() => router.push('/posts'));
  }, [id, session]);

  return (
    <button onClick={deletePost} className={styles['post-delete-button']}>Delete</button>
  )
};