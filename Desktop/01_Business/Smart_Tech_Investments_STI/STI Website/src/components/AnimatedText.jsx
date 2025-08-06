// AnimatedText.jsx - React component for rotating text phrases
import { useState, useEffect } from 'react';

export default function AnimatedText({ 
  phrases = [
    "AI-driven ventures",
    "Automated Growth", 
    "Strategic Partnerships"
  ],
  interval = 3000,
  className = ''
}) {
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
