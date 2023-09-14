import { CButton, CTooltip } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const MainItems = ({
  id,
  imgUrl,
  itemNm,
  itemDetail,
  stockNumber,
  itemSellStatus,
  isGridActive,
  price,
}) => {
  return (
    <div className="products-row">
      <Link to={`/point_shop/point_shop/${id}`}>
        <button className="cell-more-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-more-vertical"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </Link>
      <div className="product-cell image">
        <img src={imgUrl} alt="product" />
        <span>{itemNm}</span>
      </div>

      <div className="product-cell status-cell">
        <span className="cell-label">판매상태 : </span>
        <span
          className={`status ${
            itemSellStatus == 'SELL' ? 'active' : 'disabled'
          }`}
        >
          {itemSellStatus}
        </span>
      </div>
      <div className="product-cell sales">
        <span className="cell-label">판매량 : </span>
        {Math.floor(Math.random() * 100)}
      </div>
      <div className="product-cell stock">
        <span className="cell-label">재고수량 : </span>
        {stockNumber}
      </div>
      <div className="product-cell price">
        <span className="cell-label">가격 : </span>
        {price.toLocaleString()}원
      </div>
      <div className="product-cell category">
        <Link to={`/point_shop/point_shop/${id}`}>
          <CTooltip content="상세페이지로 이동합니다." placement="right">
            <CButton
              color="info"
              variant="ghost"
              className={isGridActive ? 'cell-more-button' : 'show-detail'}
              style={{
                fontSize: '12px',
                fontWeight: '700',
                padding: '5px 12px',
              }}
            >
              보러가기
            </CButton>
          </CTooltip>
        </Link>
      </div>
    </div>
  );
};
export default MainItems;
