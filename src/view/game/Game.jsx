import { useEffect, useRef, useState } from 'react';

import energy from '../../assets/game/energy.svg';
import health from '../../assets/game/health.svg';
import snake from '../../assets/profile/snake.svg';
import styles from './Game.module.scss';

const Game = () => {
  return (
    <div className={styles.game}>
      <div className={styles.topMenu}>
        <p className={styles.balance}>
          <img src={snake} alt='snake'></img>
          137.009.277
        </p>
        <div className={styles.stats}>
          <div className={styles.energy}>
            <img src={energy} alt='energy'></img>
            <p>1000</p>
          </div>
          <div className={styles.health}>
            <img src={health} alt='health'></img>
            <p>12</p>
          </div>
        </div>
      </div>

      <div className={styles.gameField}>g</div>

      <div className={styles.progress}>s</div>
    </div>
  );
};

export default Game;
