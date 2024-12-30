import { useEffect, useState } from 'react';
import {
  minesAmountOptions,
  usdtBetAmountOptions,
  scoinBetAmountOptions,
} from '../../../constants/games';
import { postCreateMinerGame, postGameStatus } from '../../../api/gameApi';
import styles from './Minesweeper.module.scss';
import clsx from 'clsx';
import scoin from '../../../assets/profile/snake.svg';
import bomb from '../../../assets/game/bomb.svg';
import usdt from '../../../assets/game/usdt.svg';

const Minesweeper = () => {
  const [field, setField] = useState([]);
  const [openedCells, setOpenedCells] = useState([]); // [{ row, col, symbol }]
  const [gameStarted, setGameStarted] = useState(false);
  const [coinssLeft, setCoinssLeft] = useState(0);

  const [gameID, setGameID] = useState(null);
  const [currentWin, setCurrentWin] = useState(0);
  const [minesAmount, setMinesAmount] = useState(minesAmountOptions[0]);
  const [betAmount, setBetAmount] = useState(usdtBetAmountOptions[0]);
  const [scoinAmount, setScoinAmount] = useState(scoinBetAmountOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState('USDT_TRC20');

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
      openedCells.some((cell) => cell.row === rowIndex && cell.col === colIndex)
    ) {
      return;
    }

    const content = `${rowIndex},${colIndex}`;
    postGameStatus(gameID, content).then((data) => {
      const { symbol, status } = data;
      setCurrentWin(data.canWin);

      setOpenedCells((prev) => [
        ...prev,
        { row: rowIndex, col: colIndex, symbol },
      ]);

      if (status === 'LOSE') {
        setGameStarted(false);
        // Optionally reset the game or show a modal
      }

      if (status === 'WIN') {
        setGameStarted(false);
        // Optionally show a win modal
      }
    });
  };

  const handlePlay = () => {
    const gameData = {
      content: '',
      bombs: minesAmount,
      bet: selectedCurrency === 'USDT_TRC20' ? betAmount : scoinAmount,
      crypto: selectedCurrency.toUpperCase(),
    };
    postCreateMinerGame(gameData).then((data) => {
      if (!data.success) return; // here show no balance error
      setGameID(data.id);
      setGameStarted(true);
      setOpenedCells([]);
    });

    setField(generateField(minesAmount));
  };

  return (
    <div className={styles.page}>
      <div className={styles.fieldInfo}>
        <div>
          <img src={scoin} alt="scoin"></img>
          {coinssLeft}
        </div>
        <div>
          <img src={bomb} alt="bomb"></img>
          {minesAmount}
        </div>
      </div>
      <div className={styles.gameField}>
        {field.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const openedCell = openedCells.find(
              (cell) => cell.row === rowIndex && cell.col === colIndex
            );

            return (
              <button
                type="button"
                disabled={!gameStarted}
                key={`${rowIndex}+${colIndex}`}
                className={clsx(styles.cell, openedCell && styles.opened)}
                onClick={openCell(rowIndex, colIndex)}
              >
                {openedCell ? (
                  <img
                    src={openedCell.symbol === 'bomb' ? bomb : scoin}
                    alt={openedCell.symbol}
                  />
                ) : (
                  ''
                )}
              </button>
            );
          })
        )}
      </div>

      <div className={styles.optionsField}>
        <div className={styles.currencySelector}>
          <div
            className={clsx(
              styles.option,
              selectedCurrency === 'USDT_TRC20' && styles.selected,
              gameStarted && styles.disabled
            )}
            onClick={() => setSelectedCurrency('USDT_TRC20')}
          >
            <img src={usdt} alt="USDT_TRC20"></img>
          </div>
          <div
            className={clsx(
              styles.option,
              selectedCurrency === 'scoin' && styles.selected,
              gameStarted && styles.disabled
            )}
            onClick={() => setSelectedCurrency('scoin')}
          >
            <img src={scoin} alt="scoin"></img>
          </div>
        </div>
        <div className={styles.betAmountContainer}>
          <label>Ставка</label>
          <div className={styles.betSelector}>
            {selectedCurrency === 'USDT_TRC20'
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

        {!gameStarted && (
          <button
            disabled={gameStarted}
            className={clsx(styles.playButton, gameStarted && styles.disabled)}
            onClick={handlePlay}
          >
            Начать игру
          </button>
        )}

        {gameStarted && (
          <button
            disabled={!gameStarted}
            className={clsx(styles.playButton, !gameStarted && styles.disabled)}
            onClick={handlePlay}
          >
            Забрать {currentWin}
          </button>
        )}
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
