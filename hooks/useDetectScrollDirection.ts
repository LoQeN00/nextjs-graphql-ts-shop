import React, { useEffect, useState, useCallback, useRef } from 'react';

export const useDetectScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  let lastScroll = useRef(0);

  const handleScroll = useCallback(() => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value

    if (currentScroll > 0 && lastScroll.current <= currentScroll) {
      lastScroll.current = currentScroll;
      setScrollDirection('down');
    } else {
      lastScroll.current = currentScroll;
      setScrollDirection('up');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrollDirection };
};
