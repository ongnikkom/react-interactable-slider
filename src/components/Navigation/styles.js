import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

export const arrow = (type, isPullUp) =>
  cx('arrow', {
    'arrow-left': type === 'left',
    'arrow-right': type === 'right',
    'arrow--pull-up': isPullUp
  });

export const dotsContainer = cellAlign =>
  cx('dots-container', {
    'dots-container--rtl': cellAlign === 'right'
  });
export const dot = selected =>
  cx('dot', {
    selected
  });
