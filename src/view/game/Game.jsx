import { getUser, postTap } from '../../api/userApi';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import energy from '../../assets/game/energy.svg';
import game from '../../assets/game/game.svg';
import health from '../../assets/game/h.png';
import sSnake from '../../assets/snake.svg';
import snake from '../../assets/profile/snake.svg';
import styles from './Game.module.scss';

const Game = () => {
  const [tapped, setTapped] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);
  const [energyProgress, setEnergyProgress] = useState(0);
  const [healthProgress, setHealthProgress] = useState(0);
  const [user, setUser] = useState({});
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (tapped) {
        setTapped(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  })

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      setCurrentProgress(data.stageProgress);
      setCurrentCoins(data.balances.SCOIN);
      setEnergyProgress(data.energy);
      setHealthProgress(data.health);
    })
  }, []);

  useEffect(() => {
    if (currentProgress === 0) {
      setStrokeDashoffset(0);
    }
    else {
      const progressWidth = currentProgress / +user.stage.needProgress * 100 / 2;
      setStrokeDashoffset(circleData.circumference - (circleData.circumference * progressWidth) / 100);
    }
  }, [currentProgress])

  // useEffect(() => {
  //   if (tapped) {
  //     postTap().then((data) => {
  //       setCurrentCoins(currentCoins + data.amount);
  //       setCurrentProgress(currentProgress + data.amount);
  //     })
  //   }
  // }, [tapped])

  const handleTap = () => {
    setTapped(!tapped);
    postTap().then((data) => {
      setCurrentCoins(currentCoins + data.amount);
      setCurrentProgress(currentProgress + data.amount);
      setEnergyProgress(data.energy);
      setHealthProgress(data.health);
    })
  };

  return (
    <div className={styles.gamePage}>
      <div className={styles.topMenu}>
        <p className={styles.balance}>
          <img src={snake} alt="snake" />
          {currentCoins}
        </p>
        <div className={styles.stats}>
          <div className={styles.outer}>
            <div className={styles.energy}>
              <img src={energy} alt="energy" />
              <p>{energyProgress}</p>
            </div>
          </div>

          <div className={clsx(styles.outer, styles.healthOuter)}>
            <div className={styles.health}>
              <img src={health} alt="health" />
              <p>{healthProgress}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gameField}>
        <img className={clsx(styles.game, tapped ? styles.tap : '')} onClick={handleTap} src={game} alt="game"></img>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressMessage}>
          <p className={styles.progressMessageText}>До следующей лиги:</p>
          <p className={styles.progressMessageReward}>
            <img src={sSnake} alt="snake"></img>
            {currentProgress}<span>/{user?.stage?.needProgress}</span>
          </p>
        </div>
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
