import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cilCart, cilMinus, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CButton,
  CTableBody,
  CTableDataCell,
  CTooltip,
} from '@coreui/react';
import PointShopNav from '../../PointShopNav';
import './CartPage.css';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // 쿠키에서 staffInfo 데이터 가져오기
  const staffInfo = JSON.parse(Cookies.get('staffInfo'));

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    console.log(staffInfo);
    try {
      const response = await axios.post('/api/cart/list', staffInfo);
      setCartItems(response.data);
      message.success('데이터를 성공적으로 갱신하였습니다.');
      console.log(response.data);
    } catch (error) {
      message.error('데이터를 갱신하는 도중 에러가 발생하였습니다.');
      console.error('Error fetching cart items:', error);
    }
  };

  const handleUpdateItemCount = async (cartItemId, newCount) => {
    try {
      const response = await axios.patch(
        `/api/cart/item/${cartItemId}`,
        { count: newCount, staff: staffInfo },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // 업데이트 성공 시 상태 갱신
      const updatedCartItems = cartItems.map((item) => {
        if (item.cartItemId === cartItemId) {
          return { ...item, count: newCount };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } catch (error) {
      message.error('수량 설정 도중 에러가 발생했습니다. 다시 확인해주세요.');
    }
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      const wantDelete = window.confirm('상품을 삭제하시겠습니까?');

      if (wantDelete) {
        await axios.delete(`/api/cart/item/${cartItemId}`);

        // 삭제 성공 시 상태 갱신
        const updatedCartItems = cartItems.filter(
          (item) => item.cartItemId !== cartItemId
        );
        setCartItems(updatedCartItems);
        message.info('상품이 삭제되었습니다.');
      } else {
        // 사용자가 확인을 취소한 경우
        message.info('상품 삭제가 취소되었습니다.');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleOrder = async () => {
    try {
      await axios.post('/api/cart/orders', {
        cartOrderDtoList: cartItems.map((item) => ({
          cartItemId: item.cartItemId,
        })),
        staff: staffInfo,
      });
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
          setCartItems([]);
        }, 8000);
      }
      message.success('주문이 성공적으로 처리되었습니다.');
    } catch (error) {
      console.error('Error while placing order:', error);
      message.error('주문 처리 중 오류가 발생하였습니다.');
    }
  };

  return (
    <div className="app-content" style={{ height: 'auto', minHeight: '95vh' }}>
      <PointShopNav />
      <div className="app-content-actions"></div>
      <CCard>
        <CCardHeader>
          <CIcon icon={cilCart} /> &nbsp; 장바구니
        </CCardHeader>
        <CCardBody>
          <CTable bordered striped responsive hover className="cart_table">
            <CTableHead>
              <CTableRow style={{ textAlign: 'center' }}>
                <CTableHeaderCell>상품명</CTableHeaderCell>
                <CTableHeaderCell>이미지</CTableHeaderCell>
                <CTableHeaderCell>가격</CTableHeaderCell>
                <CTableHeaderCell>수량</CTableHeaderCell>
                <CTableHeaderCell>총 가격</CTableHeaderCell>
                <CTableHeaderCell>작업</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {cartItems.map((item) => (
                <CTableRow
                  key={item.cartItemId}
                  style={{ textAlign: 'center', verticalAlign: 'middle' }}
                >
                  <CTableDataCell>{item.itemNm}</CTableDataCell>
                  <CTableDataCell>
                    <img
                      src={item.imgUrl}
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.price.toLocaleString()} 원
                  </CTableDataCell>
                  <CTableDataCell style={{ width: '215px' }}>
                    <CButton
                      color="secondary"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleUpdateItemCount(item.cartItemId, item.count + 1)
                      }
                    >
                      <CIcon icon={cilPlus} />
                    </CButton>
                    &nbsp;{item.count} 개&nbsp;
                    <CButton
                      color="secondary"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleUpdateItemCount(item.cartItemId, item.count - 1)
                      }
                    >
                      <CIcon icon={cilMinus} />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell style={{ width: '175px' }}>
                    {(item.price * item.count).toLocaleString()} 원
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      variant="ghost"
                      onClick={() => handleDeleteCartItem(item.cartItemId)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
        <div className="add-to-cart-container">
          <CTooltip content="주문을 진행합니다." placement="top">
            <button
              className={`order ${isAnimating ? 'animate' : ''}`}
              onClick={handleOrder}
            >
              <span className="default">주문하기</span>
              <span className="success">
                주문완료! &nbsp;
                <svg viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
              </span>
              <div className="box"></div>
              <div className="truck">
                <div className="back"></div>
                <div className="front">
                  <div className="window"></div>
                </div>
                <div className="light top"></div>
                <div className="light bottom"></div>
              </div>
              <div className="lines"></div>
            </button>
          </CTooltip>
        </div>
      </CCard>
    </div>
  );
};

export default CartPage;

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
