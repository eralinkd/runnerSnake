import { useRef, useState } from 'react';

import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
import arrow from '../../../../assets/arrow-bottom.svg';
import clsx from 'clsx';
import styles from './SwapCard.module.scss';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';

const SwapCard = ({ props }) => {
  const gradient = props.gradient;

  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: '1', label: 'SCoin' },
    { value: '2', label: 'TON' },
    { value: '3', label: 'BitCoin' },
    { value: '4', label: 'ScamCoin' },
    { value: '5', label: 'NotScamCoin' },
    { value: '6', label: 'KolyaHater' },
    { value: '7', label: 'UlichniyDancer' },
    { value: '8', label: '**' },
    { value: '9', label: '***' },
    { value: '10', label: '****' },
  ]

  const [selected, setOptionSelected] = useState(options.find((option) => option?.label === props.coin));

  const selectRef = useRef(null);

  const handleClose = () => setIsOpen(false);

  useOnClickOutside(selectRef, handleClose);

  const handleSelect = (option) => () => {
    setOptionSelected(option);
    handleClose();
  };


  return (
    <article
      className={styles.article}
      style={{ '--border-gradient': gradient }}
    >
      <div className={styles.balance}>
        <p className='f-30'>0.<span className='f-23'>00</span></p>
        <p className={clsx('f-10', styles.balanceText)}>0.00 {selected.label}</p>
      </div>
      <div className={clsx(styles.currencyContainer, isOpen && styles.opened)} ref={selectRef} onClick={() => setIsOpen(!isOpen)}>
        <CurrencyCardInfo
          className={styles.currencyInfo}
          title={selected.label}
          imgSrc={props.coinImg}
          text={'Token'}
        ></CurrencyCardInfo>



        <button type="button" className={styles.moreActions}>
          <img src={arrow} alt="icon arrow" />
        </button>

        <ul className={styles.options}>
          {options?.map((option) => {
            console.log(selected)
            const isSelected = selected.value === option?.value;

            return (
              <li
                className={clsx(styles.option, isSelected && styles.isSelected)}
                key={option.label}
                onClick={handleSelect(option)}
              >
                <CurrencyCardInfo
                  className={styles.currencyInfo}
                  title={option.label}
                  imgSrc={props.coinImg}
                  text={'Token'}
                ></CurrencyCardInfo>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default SwapCard;
