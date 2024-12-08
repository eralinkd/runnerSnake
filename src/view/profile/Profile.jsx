import SCoin from '../../assets/profile/snake.svg';
import abu from '../../assets/temp/abu.png';
import avatar from '../../assets/temp/avatar.svg';
import clsx from 'clsx';
import copy from '../../assets/profile/copy.svg';
import heart from '../../assets/profile/heart.svg';
import lightning from '../../assets/profile/lightning.svg';
import person from '../../assets/person.svg';
import snake from '../../assets/snake.svg';
import styles from './Profile.module.scss';

const Profile = () => {
  const miniAppUrl = window.location.href;
  const message = `Проверьте этот MiniApp: ${miniAppUrl}`;
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
          <div className={styles.invite} onClick={handleShare}>Пригласить друга
          </div>
          <div className={styles.copy}><img src={copy} alt='copy'></img></div>
        </div>
      </div>

      <div className={styles.friendsBlock}>
        <h3>Прибыль от друзей</h3>
        <div className={styles.friends}>
          <div className={styles.friendCard}>
            <img className={styles.avatar} src={abu} alt='avatar'></img>
            <p className={styles.username}>abu_chuligan</p>
            <p className={styles.value}>
              <img src={snake} alt='snake'></img>
              137.009.277
            </p>
            <p className={styles.profit}>Ваша прибыль</p>
            <p className={styles.profitValue}>567</p>
          </div>

          <div className={styles.emptyCard}>
            <p><img src={person} alt='person icon'></img>+</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile;


const handleShare = async () => {
  // Получаем текущий URL MiniApp
  const miniAppUrl = window.location.href;
  const message = `Проверьте этот MiniApp: ${miniAppUrl}`;

  // Проверяем, доступен ли Web Share API
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Мой MiniApp',
        text: message,
        url: miniAppUrl,
      });
      // console.log('Ссылка успешно поделилась');
    } catch (error) {
      // console.error('Ошибка при использовании Web Share API:', error);
    }
  } else {
    // Если Web Share API недоступен, копируем ссылку в буфер обмена
    try {
      await navigator.clipboard.writeText(message);
      alert('Ссылка скопирована в буфер обмена. Вы можете вставить её в сообщение.');
    } catch (error) {
      // console.error('Не удалось скопировать ссылку:', error);
      // alert('Не удалось скопировать ссылку. Пожалуйста, попробуйте вручную.');
    }
  }
};