import { useEffect, useRef, useState } from 'react';

import ComponentWithBorder from '../../shared/ComponentWithBorder/ComponentWithBorder';
import SCoin from '../../assets/profile/snake.svg';
import arrRight from '../../assets/taskArrowToRight.svg';
import avatar from '../../assets/temp/avatar.svg';
import clsx from 'clsx';
import copy from '../../assets/profile/copy.svg';
import { getUser } from '../../api/userApi';
import heart from '../../assets/profile/heart.svg';
import lightning from '../../assets/profile/lightning.svg';
import person from '../../assets/person.svg';
import snake from '../../assets/snake.svg';
import styles from './Profile.module.scss';
import taskImg from '../../assets/temp/task.svg';
import useStore from '../../state/store';

const Profile = () => {
  const userData = useStore((state) => state.userData);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTaskGroup, setActiveTaskGroup] = useState('main');
  const [user, setUser] = useState({});
  const timeoutRef = useRef(null);
  const message = `dsfndshfns !!!`
  const shareLink = `https://t.me/share/url?url=t.me/snake_runner_dev_bot/snake_runner_dev?startapp=rp_1365932&text=${message}`;
  const copyLink = `https://t.me/snake_runner_dev_bot/snake_runner_dev?startapp=rp_1365932`;

  const handleShare = async () => {
    window.location.href = shareLink;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(copyLink);
    setIsCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, 700);
  };

  useEffect(() => {
    getUser().then((data) => { setUser(data) });
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.userInfo}>
        <img alt='avatar' src={userData?.photo_url || avatar}></img>
        <p>{userData?.first_name || 'pussykiller'}</p>
      </div>

      <div className={styles.userStats}>
        <div className={styles.balance}>
          <p>Ваш баланс</p>
          <p className={styles.value}>
            <img src={SCoin} alt='SCoin logo'></img>
            {user?.balances?.SCOIN}
          </p>
        </div>

        <div className={styles.cards}>
          <div className={styles.cardOuter}>
            <div className={styles.card}>
              <p className={styles.heading}>
                <img src={heart} alt='heart icon'></img>
                Жизни
              </p>
              <p className={clsx(styles.value, styles.heart)}>{user.health}</p>
            </div>
          </div>

          <div className={clsx(styles.cardOuter, styles.energy)}>
            <div className={styles.card}>
              <p className={styles.heading}>
                <img src={lightning} alt='lightning icon'></img>
                Энергия
              </p>
              <p className={styles.value}>{user.energy}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ref}>
        <h3>Получи бонусы</h3>
        <p>Приглашай пользователей Telegram и получи <span className={styles.pink}>10%</span> с их прибыли</p>

        <div className={styles.buttons}>
          <div className={styles.invite} onClick={handleShare}>Пригласить друга
          </div>
          <div onClick={handleCopy} className={styles.copy}><img src={copy} alt='copy'></img></div>
        </div>
      </div>

      <div className={styles.friendsBlock}>
        <h3>Прибыль от друзей</h3>

        <div className={styles.friends}>
          {user?.refs?.map((item, index) =>
            <>
              <ComponentWithBorder className={styles.friendCardWrapper} key={index}>
                <div className={styles.friendCard}>
                  <ComponentWithBorder className={styles.avatarWrapper}>
                    <img className={styles.avatar} src={ avatar} alt='avatar'></img>
                  </ComponentWithBorder>
                  <p className={styles.username}>{item.name}</p>
                  <p className={styles.value}>
                    <img src={snake} alt='snake'></img>
                    {item.balance}
                  </p>
                  <p className={styles.profit}>Ваша прибыль</p>
                  <p className={styles.profitValue}>{item.profit}</p>
                </div>
              </ComponentWithBorder>
              </>
          )}

          <div className={styles.emptyCard} onClick={handleShare}>
            <p><img src={person} alt='person icon'></img>+</p>
          </div>
        </div>
      </div>


      <div className={styles.tasks}>
        <h3>Задания</h3>
        <ul>
          <li
            onClick={() => setActiveTaskGroup('main')}
            className={activeTaskGroup === 'main' ? styles.active : ''}>
            <span>Основные</span>
          </li>
          <li
            onClick={() => setActiveTaskGroup('daily')}
            className={clsx(styles.second, activeTaskGroup === 'daily' ? styles.active : '')}>
            <span className={styles.second}>Ежедневные</span>
          </li>
        </ul>

        <div className={styles.tasksList}>

          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
          <TaskCard></TaskCard>
        </div>
      </div>



      <div className={clsx(styles.copied, isCopied && styles.active)}>
        Ключ скопирован!
      </div>

    </div>
  )
};

export default Profile;

export const TaskCard = () => {
  return (
    <ComponentWithBorder>
      <div className={styles.task}>
        <div className={styles.headingContainer}>
          <p className={styles.heading}>
            <img src={taskImg} alt='task img'></img>
            Lorem ipsum dolor sit
          </p>
          <div className={styles.taskNavigate}>
            <img src={arrRight} alt='arrow right'></img>
          </div>
        </div>
        <div className={styles.info}>
          <p className={styles.description}>Lorem ipsum dolor sit amet consectetur. Suspendisse placerat</p>
          <p className={styles.reward}>
            <img src={snake} alt='snake'></img>
            5.000
          </p>
        </div>
      </div>
    </ComponentWithBorder>
  )
}