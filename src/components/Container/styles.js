import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

export const container = ({ debug }) =>
  cx('container', {
    'container--debug': debug
  });

export const containerInner = ({ cellAlign, debug, snapPoints }) =>
  cx('container-inner', {
    'container-inner--left': cellAlign === 'left',
    'container-inner--right': cellAlign === 'right',
    'container-inner--indicator': debug && snapPoints.length > 0
  });
