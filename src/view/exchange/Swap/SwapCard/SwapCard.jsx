import { useEffect, useRef, useState } from 'react';

import CurrencyCardInfo from '../../../../shared/CurrencyCardInfo/CurrencyCardInfo';
import arrow from '../../../../assets/arrow-bottom.svg';
import clsx from 'clsx';
import { currencyImages } from '../../../../constants/currency';
import styles from './SwapCard.module.scss';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';

const SwapCard = ({balances, props, options, onSelect }) => {
  const gradient = 'linear-gradient(106.24deg, rgb(92, 106, 196) -3.53%, rgb(156, 39, 176) 117.96%)'
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setOptionSelected] = useState({});

  const selectRef = useRef(null);

  const handleClose = () => setIsOpen(false);

  useOnClickOutside(selectRef, handleClose);

  const handleSelect = (option) => () => {
    setOptionSelected(option);
    onSelect(option);
    handleClose();
  };

  useEffect(() => {
    if (!props || !options) return;
    setOptionSelected(options.find((option) => option?.fullName === props?.fullName));
  }, [options, props]);

  return (
    <article
      className={styles.article}
      style={{ '--border-gradient': gradient }}
    >
      <div className={styles.balance}>
        <p className="f-30">
          {balances && balances[selected?.apiName]}
        </p>
        <p className={clsx('f-10', styles.balanceText)}>
        {balances && balances[selected?.apiName]} {selected.simpleName}
        </p>
      </div>
      <div
        className={clsx(styles.currencyContainer, isOpen && styles.opened)}
        ref={selectRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CurrencyCardInfo
          className={styles.currencyInfo}
          title={selected.fullName}
          imgSrc={
            currencyImages[selected?.apiName] || currencyImages.default
          }
          text={props?.type}
        ></CurrencyCardInfo>

        <button type="button" className={styles.moreActions}>
          <img src={arrow} alt="icon arrow" />
        </button>

        <ul className={styles.options} style={{zIndex: 1000}}>
          {options?.map((option) => {
            const isSelected = selected.fullName === option?.fullName;

            return (
              <li
                className={clsx(styles.option, isSelected && styles.isSelected)}
                key={option.fullName}
                onClick={handleSelect(option)}
              >
                <CurrencyCardInfo
                  className={styles.currencyInfo}
                  title={option.fullName}
                  imgSrc={
                    currencyImages[option.apiName] || currencyImages.default
                  }
                  text={option.type}
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
