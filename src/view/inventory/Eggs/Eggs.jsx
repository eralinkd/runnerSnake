import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';
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
import { postTakeEgg } from '../../../api/userApi.js';

const formatTime = (seconds) => {
  if (seconds <= 0) return '00:00:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Timer = ({ seconds: initialSeconds, id }) => {
  const { timers, setTimer, getTimer } = useTimerStore();

  useEffect(() => {
    if (typeof timers[id] === 'undefined') {
      setTimer(id, initialSeconds);
    }
  }, [id, initialSeconds, setTimer]);

  const timeLeft = getTimer(id);

  return <span className={styles.time}>{formatTime(timeLeft)}</span>;
};

const Eggs = ({ eggs }) => {
  const openModal = eggModalState((state) => state.openModal);

  const { mutate: takeEgg } = useMutation({
    mutationFn: (data) => postTakeEgg(data),
    onSuccess: (response) => {
      openModal(response.result);
    },
    onError: () => {
      openModal(false);
    },
  });

  const handleTakeReward = (egg) => {
    const telegramInitData = window.Telegram.WebApp.initDataUnsafe;
    if (telegramInitData?.user?.id) {
      // takeEgg({
      //   userId: telegramInitData.user.id,
      //   level: egg.level,
      // });
      takeEgg(egg.level);
    }
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
          const showCollectButton =
            egg.status === 'FINISHED' || isTimerFinished;

          return (
            <SwiperSlide key={egg.name} className={styles.slide}>
              <div
                className={clsx(
                  styles.slideContent,
                  egg.available && styles.unavailable
                )}
              >
                <span>Заблокировано!</span>
                <div className={styles.navigation}></div>
                <div className={styles.counter}>
                  <div className={styles.counterContent}>
                    <Timer seconds={5} id={egg.name} />
                  </div>
                  <div className={styles.clockContainer}>
                    <div className={styles.clock}>
                      <img src={clock} alt="clock" />
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.animationContainer}>
                    <img src={testImg} alt={egg.name} />
                  </div>
                  <h3 className={styles.title}>{egg.name}</h3>
                </div>
                {egg.status === 'NONE' && !isTimerFinished && (
                  <ComponentWithBorder>
                    <button type="button" className={styles.button}>
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
                {showCollectButton && (
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
