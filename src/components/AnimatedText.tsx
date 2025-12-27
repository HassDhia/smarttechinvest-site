'use client';

import { useState, useEffect, ReactNode } from 'react';

interface AnimatedTextProps {
  phrases?: string[];
  interval?: number;
  className?: string;
}

export function AnimatedText({
  phrases = [
    'Fractional Chief of Strategy',
    'AI-Augmented Growth Systems',
    'Pricing, Positioning, and GTM',
    'Ops Automation for SMBs',
    'Founder Advisory & Deals'
  ],
  interval = 3000,
  className = ''
}: AnimatedTextProps): ReactNode {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span className={`animated-text ${className}`}>
      {phrases[currentPhraseIndex]}
    </span>
  );
}
