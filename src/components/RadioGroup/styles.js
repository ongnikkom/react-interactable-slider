import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

export const container = (stacked, isLast) =>
  cx('container', {
    'container--stacked': stacked,
    'container--last': isLast
  });
