'use client';
import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      // Prevent spamming Discord on refreshes during the same session
      if (sessionStorage.getItem('has_visited')) return;
      
      try {
        // 1. Grab the TRUE referrer from the browser
        const actualReferrer = document.referrer;
        
        // 2. Send it in the request body to your Next.js API
        await fetch('/api/notify', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referrer: actualReferrer })
        });
        
        // 3. Mark the session as tracked
        sessionStorage.setItem('has_visited', 'true');
      } catch (error) {
        console.error('Tracking failed:', error);
      }
    };
    
    trackVisit();
  }, []);
  
  return null; // Silent component
}