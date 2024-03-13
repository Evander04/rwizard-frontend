import React, { useState } from 'react';
import styles from '../../styles/notification.module.css';

interface NotificationProps {
  message: string;
  onClose:()=>void;
  type: 'success' | 'error' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message,onClose,type}) => {
  
  return (
    <div className={`${styles.notification} ${styles[`notification-${type}`]}`} role="start">
        <button type="button" className={styles.close} onClick={onClose}>
        <span>&times;</span>
        </button>
        {message}
    </div>
  );
};

export default Notification;
