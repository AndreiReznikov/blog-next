'use client';

import { useEffect, useState } from 'react';
import { BACKEND_URL, DEFAULT_TIMEOUT } from "@/lib/Constants";
import { truncate } from '@/lib/Utils';
import io from 'socket.io-client';

import styles from './commentNotification.module.css';

const CommentNotification = ({ articleIds }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io(BACKEND_URL);

    articleIds?.forEach((articleId) => {
      socket.on(`article-${articleId}`, (data) => {
        setNotifications((prev) => [...prev, { ...data, articleId }]);
        setTimeout(() => setNotifications([]), DEFAULT_TIMEOUT);
      });
    });

    return () => {
      articleIds?.forEach((articleId) => {
        socket.off(`article-${articleId}`);
      });
      socket.disconnect();
    };
  }, [articleIds]);

  return (
    <div className={styles['notifications-container']}>
      {notifications.map((notification, index) => (
        <div className={styles['notification']} key={index}>
          Новый комментарий к статье {notification?.articleId}: {truncate(notification?.comment, 280)} от автора {notification?.authorName}
        </div>
      ))}
    </div>
  );
};

export default CommentNotification;