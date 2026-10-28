import React, { useEffect } from 'react';

export function ResetConfirmModal({ isOpen, onClose, onConfirm, drawnCount }) {
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

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div
        className="modal-content reset-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="reset-modal-title" className="modal-title">RESET GAME?</h2>
        <p className="reset-modal-description">
          Are you sure you want to reset the current session?
          {drawnCount > 0 && ` All ${drawnCount} drawn numbers will be cleared.`}
        </p>

        <div className="reset-actions">
          <button
            type="button"
            className="reset-cancel-btn"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="reset-confirm-btn"
            onClick={onConfirm}
          >
            CONFIRM RESET
          </button>
        </div>
      </div>
    </div>
  );
}
