import React from 'react';
import './PointShopNav.css';
import { Link, useLocation } from 'react-router-dom';

const PointShopNav = () => {
  const location = useLocation();

  return (
    <div className="point-shop-nav-header">
      <Link to="/point_shop/point_shop/" id="point-shop-logo">
        OP
      </Link>
      <div className="point-shop-nav">
        <ul>
          <li>
            <Link
              to="/point_shop/point_shop/"
              id={
                location.pathname === '/point_shop/point_shop/'
                  ? 'point-shop-nav-current'
                  : ''
              }
            >
              전체보기
            </Link>
          </li>
          <li>
            <Link
              to="/point_shop/point_shop/cart_page"
              id={
                location.pathname === '/point_shop/point_shop/cart_page'
                  ? 'point-shop-nav-current'
                  : ''
              }
            >
              장바구니
            </Link>
          </li>
          <li>
            <Link
              to="/point_shop/point_shop/order_list"
              id={
                location.pathname === '/point_shop/point_shop/order_list'
                  ? 'point-shop-nav-current'
                  : ''
              }
            >
              주문목록
            </Link>
          </li>
          <li>
            <Link
              to="/point_shop/point_shop/form"
              id={
                location.pathname === '/point_shop/point_shop/form'
                  ? 'point-shop-nav-current'
                  : ''
              }
            >
              상품등록
            </Link>
          </li>
          <li>
            <Link
              to="/point_shop/point_shop/management_item_page"
              id={
                location.pathname ===
                '/point_shop/point_shop/management_item_page'
                  ? 'point-shop-nav-current'
                  : ''
              }
            >
              상품관리
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PointShopNav;
