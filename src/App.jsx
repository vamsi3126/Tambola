import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { NumberDisplay } from './components/NumberDisplay';
import { RecentNumbers } from './components/RecentNumbers';
import { GameControls } from './components/GameControls';
import { HistoryModal } from './components/HistoryModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { createShuffledPool, drawNext, TOTAL_NUMBERS } from './utils/tambola';
import { saveGameState, loadGameState, clearGameState } from './utils/gameStorage';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [pool, setPool] = useState(() => createShuffledPool());
  const [drawHistory, setDrawHistory] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);

  // Modals
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Initialize or restore session from localStorage on mount
  useEffect(() => {
    const saved = loadGameState();
    if (saved) {
      setIsStarted(saved.isStarted);
      setPool(saved.pool);
      setDrawHistory(saved.drawHistory);
      setCurrentNumber(saved.currentNumber);
    }
  }, []);

  // Save state on updates
  useEffect(() => {
    if (isStarted) {
      saveGameState({
        isStarted,
        pool,
        drawHistory,
        currentNumber
      });
    }
  }, [isStarted, pool, drawHistory, currentNumber]);

  // Handle first draw (START)
  const handleStart = useCallback(() => {
    if (isStarted) return;
    const result = drawNext(pool, []);
    if (!result) return;

    setIsStarted(true);
    setCurrentNumber(result.nextNumber);
    setPool(result.newPool);
    setDrawHistory(result.newHistory);
  }, [isStarted, pool]);

  // Handle subsequent draws (NEXT NUMBER)
  const handleNextNumber = useCallback(() => {
    if (!isStarted || pool.length === 0) return;
    const result = drawNext(pool, drawHistory);
    if (!result) return;

    setCurrentNumber(result.nextNumber);
    setPool(result.newPool);
    setDrawHistory(result.newHistory);
  }, [isStarted, pool, drawHistory]);

  // Handle reset game
  const handleConfirmReset = useCallback(() => {
    const freshPool = createShuffledPool();
    setIsStarted(false);
    setCurrentNumber(null);
    setPool(freshPool);
    setDrawHistory([]);
    setIsResetConfirmOpen(false);
    setIsHistoryOpen(false);
    clearGameState();
  }, []);

  const isFinished = isStarted && pool.length === 0;

  return (
    <div className="tambola-viewport">
      <div className="tambola-app-card">
        {/* Header */}
        <Header />

        {/* Dominant Main Number Circle */}
        <NumberDisplay
          currentNumber={currentNumber}
          isStarted={isStarted}
        />

        {/* 4 Recent Numbers & History Link */}
        <RecentNumbers
          drawHistory={drawHistory}
          onOpenHistory={() => setIsHistoryOpen(true)}
        />

        {/* Compact Next / Start Button & Reset Button */}
        <GameControls
          isStarted={isStarted}
          isFinished={isFinished}
          onStart={handleStart}
          onNextNumber={handleNextNumber}
          onRequestReset={() => setIsResetConfirmOpen(true)}
          totalDrawn={drawHistory.length}
        />
      </div>

      {/* Complete Draw History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        drawHistory={drawHistory}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
        drawnCount={drawHistory.length}
      />
    </div>
  );
}
