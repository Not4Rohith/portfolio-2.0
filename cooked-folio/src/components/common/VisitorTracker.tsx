'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      if (sessionStorage.getItem('has_visited')) return;
      
      try {
        // Just ping the API route. No data attached!
        await fetch('/api/notify', { method: 'POST' });
        
        sessionStorage.setItem('has_visited', 'true');
      } catch (error) {
        console.error('Tracking failed:', error);
      }
    };
    
    trackVisit();
  }, []);
  
  return null;
}