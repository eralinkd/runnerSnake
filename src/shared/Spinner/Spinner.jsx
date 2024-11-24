import clsx from 'clsx';
import styles from './Spinner.module.scss';

const Spinner = ({ className }) => {
  return <span className={clsx(styles.loader, className)}></span>;
};

export default Spinner;
