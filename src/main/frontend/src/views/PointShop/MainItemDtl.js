import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MainItemDtl = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // API 호출을 통해 상품 정보 가져오기
    fetch(`/api/item/${itemId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
    console.log(product);
  }, [itemId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={product.itemImgDtoList[0].imageUrl} alt="product" />
        <h2>{product.itemNm}</h2>
        <p>{product.itemDetail}</p>
        <p>재고수량: {product.stockNumber}</p>
        <p>판매상태: {product.itemSellStatus}</p>
        <p>가격: {product.price}원</p>
      </div>
    </div>
  );
};

export default MainItemDtl;
