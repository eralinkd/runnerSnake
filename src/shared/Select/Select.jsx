import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import clsx from 'clsx';
import arrow from '../../assets/arrow-bottom.svg';
import styles from './Select.module.scss';

const gradient =
  'linear-gradient(106.24deg, rgb(92, 106, 196) -3.53%, rgb(156, 39, 176) 117.96%)';

export const Select = ({ className, options, onSelect, value, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected =
    options.find((option) => option?.value === value) ?? options[0];
  const selectRef = useRef(null);

  const handleClose = () => setIsOpen(false);

  useOnClickOutside(selectRef, handleClose);

  const handleSelect = (option) => () => {
    onSelect(option);
    handleClose();
  };

  return (
    <div
      className={clsx(styles.select, isOpen && styles.opened, className)}
      ref={selectRef}
    >
      <button
        style={{ '--border-gradient': gradient }}
        className={styles.selectedValue}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={clsx(styles.btnContent, isOpen && styles.rotate)}>
          <span className={styles.value}>
            {selected.value ? selected.label : label}
          </span>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
      </button>
      <ul className={styles.options}>
        {options?.map((option) => {
          const isSelected = selected.value === option?.value;

          return (
            <li
              className={clsx(styles.option, isSelected && styles.isSelected)}
              key={option.label}
              onClick={handleSelect(option)}
            >
              {option?.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
