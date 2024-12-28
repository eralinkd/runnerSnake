import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import testImg from '../../../assets/inventory/egg.png';
import clock from '../../../assets/inventory/clock.svg';
import 'swiper/css';
import styles from './Eggs.module.scss';

const TEST_EGGS = [
  { id: 1, title: 'Яйцо 1', image: testImg },
  { id: 2, title: 'Яйцо 2', image: testImg },
  { id: 3, title: 'Яйцо 3', image: testImg },
  { id: 4, title: 'Яйцо 4', image: testImg },
  { id: 5, title: 'Яйцо 5', image: testImg },
  { id: 6, title: 'Яйцо 6', image: testImg },
  { id: 7, title: 'Яйцо 7', image: testImg },
  { id: 8, title: 'Яйцо 8', image: testImg },
  { id: 9, title: 'Яйцо 9', image: testImg },
  { id: 10, title: 'Яйцо 10', image: testImg },
];

const Eggs = () => {
  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        className={styles.slider}
      >
        {TEST_EGGS?.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div className={styles.slideContent}>
              <div className={styles.navigation}></div>
              <div className={styles.counter}>
                <div className={styles.counterContent}>
                  <span className={styles.time}>123</span>
                </div>
                <div className={styles.clockContainer}>
                  <div className={styles.clock}>
                    <img src={clock} alt="clock" />
                  </div>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.animationContainer}>
                  <img src={slide.image} alt={slide.title} />
                </div>
                <h3 className={styles.title}>{slide.title}</h3>
              </div>
              <button type="button" className={styles.button}>
                Разбить яйцо
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Eggs;
