import { getUser } from '../../api/userApi';
import { postCreateGame, postGameStatus } from '../../api/gameApi';
import { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import BgAnimation from '../../assets/animations/snake_bg.json';
import snakeAnimation from '../../assets/animations/snake.json';
import coin from '../../assets/animations/coin.json';
import rock from '../../assets/animations/rock.json';

import clsx from 'clsx';
import energy from '../../assets/game/energy.svg';
import health from '../../assets/game/h.png';
import sSnake from '../../assets/snake.svg';
import snake from '../../assets/profile/snake.svg';
import styles from './Game.module.scss';

const Game = () => {
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

  const gameDuration = 3000;
  const [gameStarted, setGameStarted] = useState(false);
  const [coinAnimationStatus, setCoinAnimationStatus] = useState(false);
  const bgAnimationRef = useRef(null);
  const snakeAnimationRef = useRef(null);
  const coinAnimationRef = useRef(null);
  const rockAnimationRef = useRef(null);

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
    getUser().then((data) => {
      setUser(data);
      setCurrentProgress(data.stageProgress);
      setCurrentCoins(data.balances.SCOIN);
      setEnergyProgress(data.energy);
      setHealthProgress(data.health);
    });
  }, []);

  useEffect(() => {
    if (currentProgress === 0) {
      setStrokeDashoffset(0);
    } else {
      const progressWidth =
        ((currentProgress / +user.stage.needProgress) * 100) / 2;
      setStrokeDashoffset(
        circleData.circumference -
          (circleData.circumference * progressWidth) / 100
      );
    }
    console.log(currentProgress, circleData.circumference);
  }, [currentProgress]);

  const startAnimation = () => {
    resetAnimation();
    bgAnimationRef.current.play();
    snakeAnimationRef.current.play();
  };

  const resetAnimation = () => {
    bgAnimationRef.current.stop();
    snakeAnimationRef.current.stop();
  };

  const stopAnimation = () => {
    bgAnimationRef.current.pause();
    snakeAnimationRef.current.pause();
  };

  const startGame = () => {
    if (gameStarted) return;
    setGameStarted(true);
    startAnimation();

    postCreateGame().then((data) => {
      const gameID = data.id;
      const gameInterval = setInterval(() => {
        postGameStatus(gameID).then((data) => {
          gameHandler(data, gameInterval);
        });
      }, gameDuration);
    });
  };

  const gameHandler = (data, gameInterval) => {
    console.log(data);
    setEnergyProgress(data.energy);
    setHealthProgress(data.health);
    setCurrentProgress(data.progressBarProgress);
    if (data.content === 'coin') {
      spawnCoin();
      setCurrentCoins(data.coins);
    }
    if (data.content === 'game_end') {
      clearInterval(gameInterval);
      setGameStarted(false);
      stopAnimation();
    }
    if (data.content.includes('|')) {
      const parts = data.content.split('|');
      const [type, status] = parts;
      if (type === 'obstacle') {
        console.log('obstacle');
      }
      if (status === 'game_end') {
        clearInterval(gameInterval);
        setGameStarted(false);
        spawnObstacle();
        setTimeout(() => {
          stopAnimation();
        }, gameDuration);
      }
    }
  };

  const spawnCoin = () => {
    coinAnimationRef.current.play();
    setCoinAnimationStatus(true);

    setTimeout(() => {
      setCoinAnimationStatus(false);
      coinAnimationRef.current.pause();
    }, 3000);
  };

  const spawnRock = () => {
    rockAnimationRef.current.play();

    setTimeout(() => {
      rockAnimationRef.current.pause();
    }, 3000);
  };

  const spawnObstacle = () => {
    const obstacles = [spawnRock];

    obstacles[Math.floor(Math.random() * obstacles.length)]();
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

      <div className={styles.gameField} onClick={startGame}>
        <Player
          ref={bgAnimationRef}
          src={BgAnimation}
          autoplay={false}
          loop={true}
          className={styles.animationBG}
        ></Player>

        <Player
          ref={snakeAnimationRef}
          src={snakeAnimation}
          autoplay={false}
          loop={true}
          className={styles.snakeAnimation}
        ></Player>

        <Player
          ref={coinAnimationRef}
          src={coin}
          autoplay={false}
          loop={false}
          className={clsx(
            styles.coinAnimation,
            coinAnimationStatus && styles.show,
            !coinAnimationStatus && styles.hide
          )}
        ></Player>

        <Player
          ref={rockAnimationRef}
          src={rock}
          autoplay={false}
          loop={false}
          className={clsx(styles.rockAnimation)}
        ></Player>
      </div>

      {/* <button
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '0',
          zIndex: '70',
        }}
        onClick={spawnRock}
      >
        Spawn rock
      </button> */}

      <div className={styles.progress}>
        <div className={styles.progressMessage}>
          <p className={styles.progressMessageText}>До следующей лиги:</p>
          <p className={styles.progressMessageReward}>
            <img src={sSnake} alt="snake"></img>
            {currentProgress}
            <span>/{user?.stage?.needProgress}</span>
          </p>
        </div>
        <svg ref={svgRef} width="100%" height="202px">
          <defs>
            <defs>
              <linearGradient
                id="gradient"
                x1="328"
                y1="47"
                x2="8.98067"
                y2="213.051"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3400CE" />
                <stop offset="0.246272" stopColor="#7000AE" />
                <stop offset="0.658651" stopColor="#F931B1" />
                <stop offset="1" stopColor="white" />
              </linearGradient>

              <filter
                id="blurFilter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="4"
                  result="blur"
                />
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
              filter: 'url(#blurFilter)',
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Game;
