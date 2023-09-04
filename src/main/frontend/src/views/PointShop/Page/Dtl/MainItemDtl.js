import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './MainItemDtl.css';
import './../../PointShopNav.css';

import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormSelect,
  CSpinner,
  CTooltip,
} from '@coreui/react';
import PointShopNav from '../../PointShopNav';
import axios from 'axios';

const MainItemDtl = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch를 추가
  const [product, setProduct] = useState({
    id: 0,
    itemDetail: '',
    itemImgDtoList: [{}],
    itemImgIds: [],
    itemNm: '',
    itemSellStatus: '',
    price: 0,
    stockNumber: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  // 이미지 클릭시 이미지를 교체하는 함수
  const handleImageClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  // 장바구니 담는 함수
  const handleAddToCart = async () => {
    const updatedCount = cartItemsCount + 1;
    // dispatch(updateCartItemsCount(updatedCount));

    try {
      const response = await fetch('/api/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: id,
          count: selectedQuantity,
          staff: staffData,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const cartItemId = await response.json();
      console.log('Added to cart:', cartItemId, response);

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
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  // 처음 active 클래스를 가질 이미지를 첫번째 이미지로 설정
  useEffect(() => {
    setActiveImage(product.itemImgDtoList[0].imgUrl);
  }, [product]);

  if (isLoading) {
    return <CSpinner color="primary" />;
  }

  if (!product) {
    return <div>Data not available</div>;
  }

  return (
    <div className="app-content">
      <PointShopNav />
      <div className="app-content-actions"></div>
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
          <label htmlFor="price" className="item-dtl-label">
            가격 :
          </label>
          <span
            className="price"
            style={{
              display: 'inline-block',
              marginTop: '20px',
              marginLeft: '20px',
              fontSize: '28px',
            }}
          >
            {product.price.toLocaleString()} 원
          </span>
          <div className="quantity-selector">
            <label htmlFor="quantity" className="item-dtl-label">
              수량 :{' '}
            </label>
            <CFormSelect
              size="lg"
              className="mb-3"
              aria-label="Large select example"
              id="quantity"
              value={selectedQuantity}
              onChange={handleQuantityChange}
              style={{
                display: 'inline-block',
                maxWidth: '300px',
                marginTop: '20px',
                marginLeft: '20px',
                fontSize: '20px',
              }}
            >
              <option>수량을 선택하세요.</option>
              {Array.from({ length: product.stockNumber }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </CFormSelect>
          </div>
          <hr />
          <CAccordion flush>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>상세설명</CAccordionHeader>
              <CAccordionBody>
                <p dangerouslySetInnerHTML={{ __html: product.itemDetail }} />
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          {/* <div className="description">
            <p dangerouslySetInnerHTML={{ __html: product.itemDetail }} />
          </div> */}
          <hr />
          <div>
            <label htmlFor="stockNumber" className="item-dtl-label">
              재고수량 :
            </label>
            <span className="stockNumber"> {product.stockNumber}</span> <br />
            <label htmlFor="itemSellStatus" className="item-dtl-label">
              판매상태 :
            </label>
            <span className="itemSellStatus"> {product.itemSellStatus}</span>
          </div>
          <hr />
          <div>
            <span className="item-dtl-label">결제금액 : </span>
            <span className="item-dtl-label cal-result">
              {product.price} X{' '}
            </span>
            <span className="item-dtl-label cal-result">
              {selectedQuantity} ={' '}
            </span>
            <span className="price" style={{ fontSize: '25px' }}>
              {(product.price * selectedQuantity).toLocaleString()} 원{' '}
            </span>
          </div>
          <div className="add-to-cart-container">
            <CTooltip
              content="장바구니 페이지로 이동합니다."
              placement="bottom"
            >
              <button className="add-to-cart" onClick={handleAddToCart}>
                Add To Cart
              </button>
            </CTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainItemDtl;

// staff 객체 생성
const staffData = {
  accountNumber: 'sadf',
  address: 'asdf',
  bankName: 'sadf',
  birthDate: 'asdf',
  dept: 'asdf',
  email: 'sadf',
  empId: 'asdf',
  empName: 'sadf',
  empNum: 2,
  empPwd: '$2a$10$QQECryOgvDyssOivdwsK0.tPve9YY3nImGTWbh7sA1rxV4slPGZQm',
  phoneNumber: 'asdf',
  position: 'asdf',
};
