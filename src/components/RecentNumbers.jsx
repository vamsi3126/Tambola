import React from 'react';

export function RecentNumbers({ drawHistory, onOpenHistory }) {
  // If no numbers have been drawn at all yet
  if (!drawHistory || drawHistory.length === 0) {
    return (
      <section className="recent-container" aria-label="Recent Numbers">
        <div className="recent-capsule recent-capsule-empty">
          <span className="recent-empty-text">No numbers drawn yet</span>
        </div>
      </section>
    );
  }

  // The recent numbers shown below the main number are the previous drawn numbers (up to 4, newest first)
  // In Tambola, the current call is in the main circle; previous calls appear in the recent strip.
  const previousDraws = drawHistory.slice(0, -1).slice(-4).reverse();

  return (
    <section className="recent-container" aria-label="Recent Numbers">
      <div className="recent-capsule">
        {previousDraws.length === 0 ? (
          <span className="recent-empty-text">First number drawn</span>
        ) : (
          <div className="recent-numbers-list">
            {previousDraws.map((item) => (
              <div
                key={item.drawIndex}
                className="recent-number-circle"
                title={`Draw #${item.drawIndex}: ${item.number}`}
              >
                <span>{item.number}</span>
              </div>
            ))}
          </div>
        )}

        <div className="recent-divider" aria-hidden="true" />

        <button
          type="button"
          className="history-trigger-btn"
          onClick={onOpenHistory}
          aria-label="Open complete draw history"
          title="Open complete history"
        >
          <span className="arrow-text" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
