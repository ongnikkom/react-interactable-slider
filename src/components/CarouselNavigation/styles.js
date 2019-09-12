import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

export const arrow = type =>
  cx('arrow', {
    'arrow-left': type === 'left',
    'arrow-right': type === 'right'
  });

export const dotsContainer = cx('dots-container');

export const dot = selected =>
  cx('dot', {
    selected
  });
