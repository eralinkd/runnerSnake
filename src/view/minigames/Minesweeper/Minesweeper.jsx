import { useEffect, useState } from 'react';
import {
  minesAmountOptions,
  usdtBetAmountOptions,
  scoinBetAmountOptions,
} from '../../../constants/games';
import styles from './Minesweeper.module.scss';
import clsx from 'clsx';
import scoin from '../../../assets/profile/snake.svg';
import bomb from '../../../assets/game/bomb.svg';
import usdt from '../../../assets/game/usdt.svg';

const Minesweeper = () => {
  const [field, setField] = useState([]);
  const [openedCells, setOpenedCells] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [coinssLeft, setCoinssLeft] = useState(0);


  const [minesAmount, setMinesAmount] = useState(minesAmountOptions[0]);
  const [betAmount, setBetAmount] = useState(usdtBetAmountOptions[0]);
  const [scoinAmount, setScoinAmount] = useState(scoinBetAmountOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState('usdt');

  useEffect(() => {
    setField(generateField(minesAmount));
    setOpenedCells([]);
  }, [minesAmount]);

  useEffect(() => {
    setCoinssLeft(25 - minesAmount);
  }, [minesAmount]);

  const openCell = (rowIndex, colIndex) => () => {
    if (!gameStarted) return;
    if (
      openedCells.some(([row, col]) => row === rowIndex && col === colIndex)
    ) {
      return;
    }
    setOpenedCells((prev) => [...prev, [rowIndex, colIndex]]);
  };

  const handlePlay = () => {
    setGameStarted(true);
    setField(generateField(minesAmount));
    setOpenedCells([]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.fieldInfo}>
        <div>
          <img src={scoin} alt="scoin"></img>
          {coinssLeft}
        </div>
        <div>
          <img src={bomb} alt="scoin"></img>
          {minesAmount}
        </div>
      </div>
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
        <div className={styles.currencySelector}>
          <div
            className={clsx(
              styles.option,
              selectedCurrency === 'usdt' && styles.selected,
              gameStarted && styles.disabled
            )}
            onClick={() => setSelectedCurrency('usdt')}
          >
            <img src={usdt} alt="usdt"></img>
          </div>
          <div
            className={clsx(
              styles.option,
              selectedCurrency === 'scoin' && styles.selected,
              gameStarted && styles.disabled
            )}
            onClick={() => setSelectedCurrency('scoin')}
          >
            <img src={scoin} alt="usdt"></img>
          </div>
        </div>
        <div className={styles.betAmountContainer}>
          <label>Ставка</label>
          <div className={styles.betSelector}>
            {selectedCurrency === 'usdt'
              ? usdtBetAmountOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => setBetAmount(option)}
                    className={clsx(
                      styles.option,
                      option === betAmount && styles.selected,
                      gameStarted && styles.disabled
                    )}
                  >
                    {option}
                  </div>
                ))
              : scoinBetAmountOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => setScoinAmount(option)}
                    className={clsx(
                      styles.option,
                      option === scoinAmount && styles.selected,
                      gameStarted && styles.disabled
                    )}
                  >
                    {option}
                  </div>
                ))}
          </div>
        </div>
        <div className={styles.minesAmountContainer}>
          <label>Количество мин</label>
          <div className={styles.minesSelector}>
            {minesAmountOptions.map((option) => (
              <div
                key={option}
                onClick={() => setMinesAmount(option)}
                className={clsx(
                  styles.option,
                  option === minesAmount && styles.selected,
                  gameStarted && styles.disabled
                )}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <button
          disabled={gameStarted}
          className={clsx(styles.playButton, gameStarted && styles.disabled)}
          onClick={handlePlay}
        >
          Начать игру
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
