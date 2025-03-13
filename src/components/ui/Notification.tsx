import React from 'react';
import { useNotification } from '../../context/NotificationContext';

const Notification: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => {
        let bgColor;
        let icon;

        switch (notification.type) {
          case 'success':
            bgColor = 'bg-green-500';
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            );
            break;
          case 'error':
            bgColor = 'bg-red-500';
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            );
            break;
          case 'warning':
            bgColor = 'bg-yellow-500';
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            );
            break;
          default: // info
            bgColor = 'bg-blue-500';
            icon = (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            );
        }

        return (
          <div
            key={notification.id}
            className={`${bgColor} text-white rounded-lg shadow-md px-4 py-3 flex items-start animate-slide-in`}
          >
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
            <div className="flex-1">
              <p>{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;