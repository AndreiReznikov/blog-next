'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_TIMEOUT } from "@/lib/Constants";
import { socketService } from '@/utils/socket';

import { getNotificationText } from './commentNotification.utils';
import styles from './commentNotification.module.css';

const { socket } = socketService;

const CommentNotification = ({ articleIds }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
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
    };
  }, [articleIds]);

  return (
    <div className={styles['notifications-container']}>
      {notifications.map((notification, index) => (
        <div className={styles['notification']} key={index}>
          {getNotificationText(notification)}
        </div>
      ))}
    </div>
  );
};

export default CommentNotification;