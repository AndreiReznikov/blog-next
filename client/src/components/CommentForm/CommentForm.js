'use client';

import { useState } from 'react';
import { BACKEND_URL } from "@/lib/Constants";
import io from 'socket.io-client';

const CommentForm = ({ articleId, authorId, authorName }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = io(BACKEND_URL);
    socket.emit('comment', { articleId, comment, authorId, authorName });
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">Отправить комментарий</button>
    </form>
  );
};

export default CommentForm;