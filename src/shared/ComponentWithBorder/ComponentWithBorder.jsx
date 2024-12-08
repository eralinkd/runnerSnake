import clsx from 'clsx';
import styles from './ComponentWithBorder.module.scss';

const GradientBorderWrapper = ({ children, className }) => {
  return <div className={clsx(styles.gradientBorderWrapper, className)}>{children}</div>;
};

export default GradientBorderWrapper;
