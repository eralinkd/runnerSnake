import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import energy from '../../assets/game/energy.svg';
import health from '../../assets/game/h.png';
import snake from '../../assets/profile/snake.svg';
import styles from './Game.module.scss';

const Game = () => {
  const [circleData, setCircleData] = useState({
    radius: 0,
    circumference: 0,
    centerX: 0,
    centerY: 0,
  });
  const svgRef = useRef(null);

  useEffect(() => {
    const updateCircleData = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        const radius = width / 2 - 15;
        const circumference = 2 * Math.PI * radius;
        const centerX = width / 2;
        const centerY = height / 2;

        setCircleData({ radius, circumference, centerX, centerY });
      }
    };

    updateCircleData();
    window.addEventListener('resize', updateCircleData);

    return () => window.removeEventListener('resize', updateCircleData);
  }, []);

  const progress = 35;
  const strokeDashoffset =
    circleData.circumference - (circleData.circumference * progress) / 100;

  return (
    <div className={styles.game}>
      <div className={styles.topMenu}>
        <p className={styles.balance}>
          <img src={snake} alt="snake" />
          137.009.277
        </p>
        <div className={styles.stats}>
          <div className={styles.outer}>
            <div className={styles.energy}>
              <img src={energy} alt="energy" />
              <p>1000</p>
            </div>
          </div>

          <div className={clsx(styles.outer, styles.healthOuter)}>
            <div className={styles.health}>
              <img src={health} alt="health" />
              <p>12</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gameField}>g</div>

      <div className={styles.progress}>
        <svg ref={svgRef} width="100%" height="202px">
          <defs>
            <defs>
              <linearGradient id="gradient" x1="328" y1="47" x2="8.98067" y2="213.051" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3400CE" />
                <stop offset="0.246272" stopColor="#7000AE" />
                <stop offset="0.658651" stopColor="#F931B1" />
                <stop offset="1" stopColor="white" />
              </linearGradient>

              <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </defs>

          <circle
            className={styles.backgroundBar}
            cx={circleData.centerX}
            cy={circleData.centerY}
            r={circleData.radius}
            style={{
              strokeWidth: 19,
              
            }}
          />

          <circle
            className={styles.progressBar}
            cx={circleData.centerX}
            cy={circleData.centerY}
            r={circleData.radius}
            style={{
              stroke: 'url(#gradient)',
              strokeWidth: 11,
              strokeDasharray: circleData.circumference,
              strokeDashoffset: strokeDashoffset,
              filter: "url(#blurFilter)"
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Game;
