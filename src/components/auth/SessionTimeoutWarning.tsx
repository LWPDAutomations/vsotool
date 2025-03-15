import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

// Show warning this many milliseconds before session expires
const WARNING_BEFORE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes (must match the timeout in AuthContext)

const SessionTimeoutWarning: React.FC = () => {
  const { isAuthenticated, resetSessionTimer, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [warningTimer, setWarningTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Set up warning timer
      const lastActivity = localStorage.getItem('lastActivityTimestamp');
      
      if (lastActivity) {
        const lastActivityTime = parseInt(lastActivity, 10);
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastActivityTime;
        
        // Calculate when to show the warning
        const timeToWarning = Math.max(0, SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT - timeElapsed);
        
        // Set up timer to show warning
        const timer = setTimeout(() => {
          setShowWarning(true);
          startCountdown();
        }, timeToWarning);
        
        setWarningTimer(timer);
      }
    } else {
      // Clear timers when not authenticated
      setShowWarning(false);
      if (warningTimer) {
        clearTimeout(warningTimer);
      }
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    }
    
    return () => {
      // Clean up timers
      if (warningTimer) {
        clearTimeout(warningTimer);
      }
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    };
  }, [isAuthenticated]);

  const startCountdown = () => {
    // Initial time left calculation
    const lastActivity = localStorage.getItem('lastActivityTimestamp');
    if (lastActivity) {
      const lastActivityTime = parseInt(lastActivity, 10);
      const currentTime = Date.now();
      const timeUntilExpiry = Math.max(0, SESSION_TIMEOUT - (currentTime - lastActivityTime));
      setTimeLeft(Math.floor(timeUntilExpiry / 1000));
    } else {
      setTimeLeft(Math.floor(WARNING_BEFORE_TIMEOUT / 1000));
    }
    
    // Set up countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setCountdownTimer(timer);
  };

  const handleStayLoggedIn = () => {
    resetSessionTimer();
    setShowWarning(false);
    
    // Clear countdown timer
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }
    
    // Set up new warning timer
    const newTimer = setTimeout(() => {
      setShowWarning(true);
      startCountdown();
    }, SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT);
    
    setWarningTimer(newTimer);
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!showWarning || !isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sessie verloopt bijna</h3>
        <p className="mb-6 text-gray-700">
          Wegens inactiviteit wordt u automatisch uitgelogd over <span className="font-bold">{formatTimeLeft()}</span>. 
          Wilt u ingelogd blijven?
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={logout}>
            Uitloggen
          </Button>
          <Button variant="primary" onClick={handleStayLoggedIn}>
            Blijf ingelogd
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning;