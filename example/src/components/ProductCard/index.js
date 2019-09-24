import React from 'react';
import { productCard } from './styles';

function ProductCard({ children }) {
  return <div className={productCard}>{children}</div>;
}

export default ProductCard;
