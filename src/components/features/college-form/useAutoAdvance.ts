import { useState, useEffect, useRef } from 'react';

interface TabCompletion {
  basic: boolean;
  contact: boolean;
  academic: boolean;
  social: boolean;
}

interface UseAutoAdvanceProps {
  activeTab: string | null;
  tabCompletion: TabCompletion;
}

const useAutoAdvance = ({ activeTab, tabCompletion }: UseAutoAdvanceProps) => {
  const [showAutoAdvanceNotification, setShowAutoAdvanceNotification] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState(0);
  
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  // Track user interaction
  const handleUserInteraction = () => {
    lastInteractionRef.current = Date.now();
    clearAutoAdvanceTimer();
  };

  // Clear auto-advance timers
  const clearAutoAdvanceTimer = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setShowAutoAdvanceNotification(false);
    setAutoAdvanceCountdown(0);
  };

  // Auto-advance logic
  const startAutoAdvance = (nextTab: string, setActiveTab: (tab: string | null) => void) => {
    // Clear any existing timers
    clearAutoAdvanceTimer();
    
    // Wait for user to stop interacting (3 seconds of inactivity)
    autoAdvanceTimerRef.current = setTimeout(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
      
      // Only proceed if user hasn't interacted for at least 3 seconds
      if (timeSinceLastInteraction >= 3000) {
        setShowAutoAdvanceNotification(true);
        setAutoAdvanceCountdown(5);
        
        // Start countdown
        let countdown = 5;
        countdownTimerRef.current = setInterval(() => {
          countdown--;
          setAutoAdvanceCountdown(countdown);
          
          if (countdown <= 0) {
            clearAutoAdvanceTimer();
            setActiveTab(nextTab);
          }
        }, 1000);
      }
    }, 3000);
  };

  // Auto-advance effect
  const setupAutoAdvance = (setActiveTab: (tab: string | null) => void) => {
    if (activeTab === 'basic' && tabCompletion.basic) {
      startAutoAdvance('contact', setActiveTab);
    } else if (activeTab === 'contact' && tabCompletion.contact) {
      startAutoAdvance('academic', setActiveTab);
    } else {
      clearAutoAdvanceTimer();
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => clearAutoAdvanceTimer();
  }, []);

  return {
    showAutoAdvanceNotification,
    autoAdvanceCountdown,
    handleUserInteraction,
    clearAutoAdvanceTimer,
    setupAutoAdvance,
  };
};

export default useAutoAdvance; 