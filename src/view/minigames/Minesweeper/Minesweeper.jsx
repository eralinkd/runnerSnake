import { useEffect, useState } from 'react';
import { minesAmountOptions } from '../../../constants/games';
import styles from './Minesweeper.module.scss';
import clsx from 'clsx';

const Minesweeper = () => {
  const [bet, setBet] = useState('');
  const [field, setField] = useState([]);
  const [openedCells, setOpenedCells] = useState([]);
  const [minesAmount, setMinesAmount] = useState(minesAmountOptions[0]);
  const [gameStarted, setGameStarted] = useState(false);

  const openCell = (rowIndex, colIndex) => () => {
    if (!gameStarted) return;
    if (
      openedCells.some(([row, col]) => row === rowIndex && col === colIndex)
    ) {
      return;
    }

    setOpenedCells((prev) => [...prev, [rowIndex, colIndex]]);
  };

  useEffect(() => {
    setField(generateField(minesAmount));
    setOpenedCells([]);
  }, [minesAmount]);

  const handlePlay = () => {
    setGameStarted(true);
    setField(generateField(minesAmount));
    setOpenedCells([]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.gameField}>
        {field.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              type="button"
              disabled={!gameStarted}
              key={`${rowIndex}+${colIndex}`}
              className={clsx(
                styles.cell,
                openedCells.some(
                  ([row, col]) => row === rowIndex && col === colIndex
                ) && styles.opened
              )}
              onClick={openCell(rowIndex, colIndex)}
            >
              {openedCells.some(
                ([row, col]) => row === rowIndex && col === colIndex
              )
                ? cell
                : ''}
            </button>
          ))
        )}
      </div>

      <div className={styles.optionsField}>
        <div className={styles.betAmountContainer}>
          <label>Bet amount</label>
          <input
            type="number"
            onChange={(e) => setBet(e.target.value)}
            value={bet}
          ></input>
        </div>
        <div className={styles.minesAmountContainer}>
          <label>Mines amount</label>
          <div className={styles.minesSelector}></div>
          {minesAmountOptions.map((option) => (
            <div
              key={option}
              onClick={() => setMinesAmount(option)}
              className={clsx(
                styles.option,
                option === minesAmount && styles.selected
              )}
            >
              {option}
            </div>
          ))}
        </div>

        <button className={styles.playButton} onClick={handlePlay}>
          Play
        </button>
      </div>
    </div>
  );
};

export default Minesweeper;

const generateField = (mines) => {
  const size = 5;
  const field = Array.from({ length: size }, () => Array(size).fill('e'));

  let placedMines = 0;

  while (placedMines < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (field[row][col] !== 'm') {
      field[row][col] = 'm';
      placedMines++;
    }
  }

  return field;
};
