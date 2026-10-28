import React, { useEffect, useState } from 'react';

export function NumberDisplay({ currentNumber, isStarted }) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (currentNumber !== null && isStarted) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [currentNumber, isStarted]);

  // Display value: if game not started or no number, show '--'
  const displayValue = currentNumber !== null ? currentNumber : '--';

  return (
    <main className="main-display-container" aria-live="polite">
      <div
        className={`main-circle ${animating ? 'number-pulse' : ''}`}
        role="region"
        aria-label={`Current Number: ${displayValue}`}
      >
        <span className="main-number">{displayValue}</span>
      </div>
    </main>
  );
}
