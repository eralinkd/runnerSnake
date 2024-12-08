import styles from './ComponentWithBorder.module.scss';

const GradientBorderWrapper = ({ children }) => {
  return <div className={styles.gradientBorderWrapper}>{children}</div>;
};

export default GradientBorderWrapper;
