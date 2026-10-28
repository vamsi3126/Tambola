import React from 'react';

export function GameControls({
  isStarted,
  isFinished,
  onStart,
  onNextNumber,
  onRequestReset,
  totalDrawn
}) {
  return (
    <div className="game-controls-container">
      {!isStarted ? (
        <button
          type="button"
          className="action-button start-button"
          onClick={onStart}
          aria-label="Start Tambola Game"
          id="btn-start"
        >
          START
        </button>
      ) : (
        <button
          type="button"
          className="action-button next-button"
          onClick={onNextNumber}
          disabled={isFinished}
          aria-label={isFinished ? 'All numbers have been drawn' : 'Pick next Tambola number'}
          id="btn-next-number"
        >
          {isFinished ? 'ALL NUMBERS DRAWN' : 'NEXT NUMBER'}
        </button>
      )}

      {/* Small text-only RESET control */}
      {isStarted && (
        <button
          type="button"
          className="reset-text-button"
          onClick={onRequestReset}
          aria-label="Reset current game"
          id="btn-reset"
        >
          RESET
        </button>
      )}
    </div>
  );
}
