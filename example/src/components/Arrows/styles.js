import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

export const arrow = (position, isBoth, isDisabled) =>
  cx('arrow', {
    'arrow--left': position === 'left',
    'arrow--right': position === 'right',
    'arrow--pull': isBoth,
    'arrow--disabled': isDisabled
  });
