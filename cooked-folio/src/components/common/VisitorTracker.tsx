'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      // Prevent spamming if the user just refreshes the page
      if (sessionStorage.getItem('has_visited')) return;
      
      try {
        // 1. Get the visitor's connection info
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        
        // 2. Send it to your secure Next.js API route
        await fetch('/api/notify', {
          method: 'POST',
          body: JSON.stringify(data)
        });
        
        // 3. Mark them as visited for this session
        sessionStorage.setItem('has_visited', 'true');
      } catch (error) {
        console.error('Tracking failed:', error);
      }
    };
    
    trackVisit();
  }, []);
  
  return null; // This component doesn't render anything visually
}