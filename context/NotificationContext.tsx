import Notification from '@/components/notification';
import { NotificationType } from '@/types/types';
import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
  showNotification: (message: string,type:NotificationType) => void;  
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface Props {
    children: React.ReactNode;
}

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');

  const showNotification = (message: string,type:NotificationType) => {
    setMessage(message);
    setType(type);
    setIsVisible(true);
  };

  const value: NotificationContextType = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
        {isVisible && (
            <Notification            
            type={type}
            message={message}
            onClose={()=>setIsVisible(false)}
            />
        )}        
        {children}
      
    </NotificationContext.Provider>
  );
};
