import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import BgAnimation from '../../../assets/animations/snake_bg.json';
import snakeAnimation from '../../../assets/animations/snake.json';
import coin from '../../../assets/animations/coin.json';
import ComponentWithBorder from '../../../shared/ComponentWithBorder/ComponentWithBorder.jsx';
import testImg from '../../../assets/inventory/egg.png';
import clock from '../../../assets/inventory/clock.svg';
import useTimerStore from '../../../state/timerState';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Eggs.module.scss';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import eggModalState from '../../../state/eggModalState';
import EggModal from './EggModal/EggModal';
import { postTakeEgg, postBreakEgg } from '../../../api/userApi.js';

const formatTime = (seconds) => {
  if (seconds <= 0) return '00:00:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Timer = ({ seconds: initialSeconds, id, isProcessing, onTimerEnd }) => {
  const { timers, setTimer, getTimer } = useTimerStore();

  useEffect(() => {
    if (isProcessing) {
      setTimer(id, initialSeconds);
    } else {
      setTimer(id, 0);
    }
  }, [id, initialSeconds, setTimer, isProcessing]);

  useEffect(() => {
    const timeLeft = getTimer(id);
    if (timeLeft === 0 && !isProcessing) {
      onTimerEnd();
    }
  }, [getTimer(id), id, isProcessing, onTimerEnd]);

  const timeLeft = getTimer(id);

  return <span className={styles.time}>{formatTime(timeLeft)}</span>;
};

const Eggs = ({ eggs, refetchInventory }) => {
  const openModal = eggModalState((state) => state.openModal);
  const { setTimer } = useTimerStore();

  const gameDuration = 3000;
  const animationElementsDuration = 2500;
  const [coinAnimationStatus, setCoinAnimationStatus] = useState(false);
  const bgAnimationRef = useRef(null);
  const snakeAnimationRef = useRef(null);
  const coinAnimationRef = useRef(null);

  const { mutate: breakEgg } = useMutation({
    mutationFn: (data) => postBreakEgg(data),
    onSuccess: (response) => {
      if (!response?.result) openModal(response.result);
      refetchInventory();
    },
    onError: () => {
      openModal(false);
    },
  });

  const { mutate: takeEgg } = useMutation({
    mutationFn: (data) => postTakeEgg(data),
    onSuccess: (response) => {
      openModal(response.result);
      refetchInventory();
    },
    onError: () => {
      openModal(false);
    },
  });

  const handleBreakEgg = (egg) => {
    breakEgg(egg.level);
  };

  const handleTakeReward = (egg) => {
    takeEgg(egg.level);
  };

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        className={styles.slider}
      >
        {Object.values(eggs)?.map((egg) => {
          const { timers } = useTimerStore();
          const isTimerFinished = timers[egg.name] <= 0;

          return (
            <SwiperSlide key={egg.name} className={styles.slide}>
              <div
                className={clsx(
                  styles.slideContent,
                  !egg.available && styles.unavailable
                )}
              >
                <span>Заблокировано!</span>
                <div className={styles.navigation}></div>
                <div className={styles.counter}>
                  <div className={styles.counterContent}>
                    <Timer
                      seconds={egg.endsAt}
                      id={egg.name}
                      isProcessing={egg.status === 'PROCESSING'}
                      onTimerEnd={refetchInventory}
                    />
                  </div>
                  <div className={styles.clockContainer}>
                    <div className={styles.clock}>
                      <img src={clock} alt="clock" />
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.animationContainer}>
                    {timers[egg.name] <= 0 && (
                      <img src={testImg} alt={egg.name} />
                    )}
                    {timers[egg.name] > 0 && (
                      <div className={styles.gameField}>
                        <Player
                          ref={bgAnimationRef}
                          src={BgAnimation}
                          autoplay={true}
                          loop={true}
                          className={styles.animationBG}
                        ></Player>

                        <Player
                          ref={snakeAnimationRef}
                          src={snakeAnimation}
                          autoplay={true}
                          loop={true}
                          className={styles.snakeAnimation}
                        ></Player>
                      </div>
                    )}
                  </div>
                  <h3 className={styles.title}>{egg.name}</h3>
                </div>
                {egg.status === 'NONE' && (
                  <ComponentWithBorder>
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() => handleBreakEgg(egg)}
                    >
                      Разбить яйцо
                    </button>
                  </ComponentWithBorder>
                )}
                {egg.status === 'PROCESSING' && !isTimerFinished && (
                  <ComponentWithBorder>
                    <button type="button" className={styles.button} disabled>
                      Яйцо разбивается...
                    </button>
                  </ComponentWithBorder>
                )}
                {(egg.status === 'FINISHED' ||
                  (isTimerFinished && egg.status !== 'NONE')) && (
                  <ComponentWithBorder>
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() => handleTakeReward(egg)}
                    >
                      Забрать награду
                    </button>
                  </ComponentWithBorder>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <EggModal />
    </div>
  );
};

export default Eggs;
