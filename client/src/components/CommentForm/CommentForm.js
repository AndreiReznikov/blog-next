'use client';

import { useState } from 'react';
import { BACKEND_URL } from "@/lib/Constants";
import io from 'socket.io-client';

import styles from './CommentForm.module.css';

const CommentForm = ({ articleId, authorId, authorName }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = io(BACKEND_URL);
    socket.emit('comment', { articleId, comment, authorId, authorName });
    setComment('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea className={styles.textarea} value={comment} onChange={(e) => setComment(e.target.value)} />
      <div className={styles['button-container']}>
        <button className={styles.button} type="submit">Add a comment</button>
      </div>
    </form>
  );
};

export default CommentForm;