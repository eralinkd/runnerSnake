import SCoin from '../../assets/temp/SCoin.png';
import avatar from '../../assets/temp/avatar.svg';
import clsx from 'clsx';
import copy from '../../assets/profile/copy.svg';
import heart from '../../assets/profile/heart.svg';
import lightning from '../../assets/profile/lightning.svg';
import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.userInfo}>
        <img alt='avatar' src={avatar}></img>
        <p>pussykiller</p>
      </div>

      <div className={styles.userStats}>
        <div className={styles.balance}>
          <p>Ваш баланс</p>
          <p className={styles.value}>
            <img src={SCoin} alt='SCoin logo'></img>
            137.009.277
          </p>
        </div>

        <div className={styles.cards}>
          <div className={styles.cardOuter}>
            <div className={styles.card}>
              <p className={styles.heading}>
                <img src={heart} alt='heart icon'></img>
                Жизни
              </p>
              <p className={clsx(styles.value, styles.heart)}>12</p>
            </div>
          </div>

          <div className={clsx(styles.cardOuter, styles.energy)}>
            <div className={styles.card}>
              <p className={styles.heading}>
                <img src={lightning} alt='lightning icon'></img>
                Энергия
              </p>
              <p className={styles.value}>1000</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ref}>
        <h3>Получи бонусы</h3>
        <p>Приглашай пользователей Telegram и получи <span className={styles.pink}>10%</span> с их прибыли</p>

        <div className={styles.buttons}>
          <div className={styles.invite}>Пригласить друга
          </div>
          <div className={styles.copy}><img src={copy} alt='copy'></img></div>
        </div>
      </div>
    </div>
  )
};

export default Profile;
