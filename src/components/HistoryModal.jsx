import React, { useState, useEffect } from 'react';
import { TOTAL_NUMBERS } from '../utils/tambola';

export function HistoryModal({ isOpen, onClose, drawHistory }) {
  const [activeTab, setActiveTab] = useState('sequence'); // 'sequence' or 'board'

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Exact draw sequence, newest first
  const reversedHistory = [...drawHistory].reverse();
  const drawnCount = drawHistory.length;

  // Fast lookup set for board view
  const drawnMap = new Map();
  drawHistory.forEach((item) => {
    drawnMap.set(item.number, item.drawIndex);
  });

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
    >
      <div
        className="modal-content history-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 id="history-modal-title" className="modal-title">DRAW HISTORY</h2>
            <p className="modal-counter">Numbers drawn: {drawnCount} / {TOTAL_NUMBERS}</p>
          </div>
          <button
            type="button"
            className="text-close-button"
            onClick={onClose}
            aria-label="Close history modal"
          >
            CLOSE
          </button>
        </div>

        {/* Tab switch between sequence (newest first) and board 1-90 */}
        <div className="history-tab-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'sequence'}
            className={`history-tab-btn ${activeTab === 'sequence' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('sequence')}
          >
            DRAW SEQUENCE
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'board'}
            className={`history-tab-btn ${activeTab === 'board' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('board')}
          >
            BOARD (1-90)
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'sequence' ? (
            <div className="history-sequence-view">
              {reversedHistory.length === 0 ? (
                <div className="empty-history-message">
                  No numbers drawn yet
                </div>
              ) : (
                <div className="history-list">
                  {reversedHistory.map((item) => (
                    <div key={item.drawIndex} className="history-item">
                      <span className="history-number-badge">{item.number}</span>
                      <span className="history-draw-label">Draw #{item.drawIndex}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="history-board-view">
              <div className="board-grid">
                {Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1).map((num) => {
                  const isDrawn = drawnMap.has(num);
                  const drawIndex = drawnMap.get(num);
                  return (
                    <div
                      key={num}
                      className={`board-cell ${isDrawn ? 'board-cell-drawn' : ''}`}
                      title={isDrawn ? `${num} — Draw #${drawIndex}` : `${num} (Not drawn)`}
                    >
                      <span className="board-cell-num">{num}</span>
                      {isDrawn && (
                        <span className="board-cell-index">#{drawIndex}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="text-close-button footer-close-button"
            onClick={onClose}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
