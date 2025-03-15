import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  resetSessionTimer: () => void; // New function to reset the session timer
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Key for storing the last activity timestamp in localStorage
const LAST_ACTIVITY_KEY = 'lastActivityTimestamp';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);

  // Initialize authentication state from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      // Check if the session has expired
      const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (lastActivity) {
        const lastActivityTime = parseInt(lastActivity, 10);
        const currentTime = Date.now();
        
        if (currentTime - lastActivityTime > SESSION_TIMEOUT) {
          // Session has expired, log the user out
          logout();
        } else {
          // Session is still valid
          setIsAuthenticated(true);
          startSessionTimer();
        }
      } else {
        // No last activity timestamp found, but auth status is true
        // Set as authenticated and update timestamp
        setIsAuthenticated(true);
        updateActivityTimestamp();
        startSessionTimer();
      }
    }
  }, []);

  // Start the session timer
  const startSessionTimer = () => {
    // Clear existing timer if it exists
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }
    
    // Set new timer
    const timer = setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT);
    
    setSessionTimer(timer);
  };

  // Update the last activity timestamp
  const updateActivityTimestamp = () => {
    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
  };

  // Reset the session timer (called on user activity)
  const resetSessionTimer = () => {
    if (isAuthenticated) {
      updateActivityTimestamp();
      startSessionTimer();
    }
  };

  // Set up event listeners for user activity
  useEffect(() => {
    if (isAuthenticated) {
      // List of events to track for user activity
      const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
      
      // Event handler for user activity
      const handleUserActivity = () => {
        resetSessionTimer();
      };
      
      // Add event listeners
      activityEvents.forEach(event => {
        window.addEventListener(event, handleUserActivity);
      });
      
      // Initial timer
      startSessionTimer();
      
      // Clean up event listeners on unmount
      return () => {
        activityEvents.forEach(event => {
          window.removeEventListener(event, handleUserActivity);
        });
        
        if (sessionTimer) {
          clearTimeout(sessionTimer);
        }
      };
    }
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    // Harde verificatie zoals besproken
    if (username === 'Jurist*NAB' && password === 'Jurist*NABvsoTool746#') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      updateActivityTimestamp();
      startSessionTimer();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    
    if (sessionTimer) {
      clearTimeout(sessionTimer);
      setSessionTimer(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, resetSessionTimer }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};