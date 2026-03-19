/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Trophy, User, Hash } from 'lucide-react';

type Player = 'X' | 'O' | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'Draw'>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const checkWinner = (currentBoard: Player[]) => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combo };
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'Draw' as const, line: null };
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (result.winner !== 'Draw') {
        setScores(prev => ({ ...prev, [result.winner as 'X' | 'O']: prev[result.winner as 'X' | 'O'] + 1 }));
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black tracking-tighter italic text-emerald-500 uppercase">
            Tic-Tac-Toe
          </h1>
          <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
            The Classic Reimagined
          </p>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border transition-all duration-300 ${isXNext && !winner ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-zinc-900 border-zinc-800'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Player X</span>
              <User size={14} className={isXNext && !winner ? 'text-emerald-500' : 'text-zinc-600'} />
            </div>
            <div className="text-3xl font-black">{scores.X}</div>
          </div>
          <div className={`p-4 rounded-2xl border transition-all duration-300 ${!isXNext && !winner ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-zinc-900 border-zinc-800'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Player O</span>
              <User size={14} className={!isXNext && !winner ? 'text-emerald-500' : 'text-zinc-600'} />
            </div>
            <div className="text-3xl font-black">{scores.O}</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative aspect-square bg-zinc-900 rounded-3xl p-4 border border-zinc-800 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-3 gap-3 h-full">
            {board.map((cell, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: cell || winner ? 1 : 0.98 }}
                whileTap={{ scale: cell || winner ? 1 : 0.95 }}
                onClick={() => handleClick(i)}
                className={`
                  relative flex items-center justify-center text-5xl font-black rounded-xl transition-colors
                  ${winningLine?.includes(i) ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100'}
                  ${!cell && !winner ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                <AnimatePresence mode="wait">
                  {cell && (
                    <motion.span
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="inline-block"
                    >
                      {cell}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {/* Winner Overlay */}
          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md p-8 text-center"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="p-4 bg-emerald-500 rounded-full text-zinc-950">
                      {winner === 'Draw' ? <Hash size={48} /> : <Trophy size={48} />}
                    </div>
                  </div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                    {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
                  </h2>
                  <button
                    onClick={resetGame}
                    className="w-full py-4 px-8 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    Play Again
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <div className="flex justify-center">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <RefreshCw size={16} />
            Reset Match
          </button>
        </div>
      </motion.div>
    </div>
  );
}
