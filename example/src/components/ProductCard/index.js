import React, { useRef, useEffect, useState } from 'react';
import { productCard, description } from './styles';

function ProductCard({ fullWidthPerSlide }) {
  const ref = useRef();
  const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    let timer;
    setImgSrc(null);

    timer = setTimeout(() => {
      const { width, height } = ref.current.getBoundingClientRect();
      const imgW = fullWidthPerSlide ? width : width;
      const imgH = fullWidthPerSlide ? height : height / 2;
      const src = `https://placeimg.com/${imgW}/${imgH}/tech`;
      setImgSrc(src);
    });

    return () => clearTimeout(timer);
  }, [ref, fullWidthPerSlide]);

  return (
    <div ref={ref} className={productCard} data-testid='slide'>
      <a href="https://google.com">
        <img src={imgSrc} />
      </a>

      {!fullWidthPerSlide && (
        <div className={description}>Dragging should not conflict with links and images</div>
      )}
    </div>
  );
}

export default ProductCard;
