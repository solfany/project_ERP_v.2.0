import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './MainItemDtl.css';
import CartIcon from './CartIcon';
import { updateCartItemsCount } from 'src/action';

const MainItemDtl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartItemsCount = useSelector((state) => state.cartItemsCount); // 상태를 가져옴
  const dispatch = useDispatch(); // useDispatch를 추가

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  // 이미지 클릭시 이미지를 교체하는 함수
  const handleImageClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  // 장바구니 추가 버튼 클릭시 발동하는 함수
  const handleAddToCart = async () => {
    const updatedCount = cartItemsCount + 1;
    dispatch(updateCartItemsCount(updatedCount));

    try {
      const response = await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: id, // 상품 아이디를 전송
          count: 1, // 수량을 설정
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const cartItemId = await response.json();
      console.log('Added to cart:', cartItemId);

      // 장바구니 페이지로 이동
      navigate('/point_shop/point_shop/cart_page');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // 처음 렌더링 시 id를 파라미터로 상품 정보를 받아오는 함수
  useEffect(() => {
    fetch(`/api/item/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
        // 처음 active 클래스를 가질 이미지를 첫번째 이미지로 설정
        setActiveImage(product.itemImgDtoList[0].imgUrl);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Data not available</div>;
  }

  return (
    <div className="gridDTL product">
      <div className="column-xs-12 column-md-7">
        <div className="product-gallery">
          <div className="product-image">
            <div className="product-image">
              <img
                className="active"
                src={
                  activeImage == ''
                    ? product.itemImgDtoList[0].imgUrl
                    : activeImage
                }
              />
            </div>
            <ul className="image-list">
              {product.itemImgDtoList.map((img, index) => (
                <li
                  key={index}
                  className="image-item"
                  onClick={() => handleImageClick(img.imgUrl)}
                >
                  <img src={img.imgUrl} alt={`image-${index}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="column-xs-12 column-md-5">
        <hr />
        <span className="itemNm">{product.itemNm}</span>
        <hr />
        <span
          className="price"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            fontSize: '28px',
          }}
        >
          {product.price} 원
        </span>
        <div className="description">
          <p>{product.itemDetail}</p>
        </div>
        <hr />
        <div>
          <p className="stockNumber">재고수량: {product.stockNumber}</p>
          <p className="itemSellStatus">판매상태: {product.itemSellStatus}</p>
        </div>
        <hr />
        <div className="add-to-cart-container">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
      <CartIcon
        cartItemsCount={cartItemsCount}
        updateCartItemsCount={(count) => dispatch(updateCartItemsCount(count))}
      />
    </div>
  );
};

export default MainItemDtl;
