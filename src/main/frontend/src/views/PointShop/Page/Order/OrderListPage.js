import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PointShopNav from '../../PointShopNav';
import './OrderListPage.css';
import jwt_decode from 'jwt-decode';
import {
  CCard,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTableBody,
} from '@coreui/react';
import DeleteIcon from './DeleteIcon';
import { Pagination, message } from 'antd';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

function OrderListPage() {
  const [orders, setOrders] = useState([]); // 주문 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(5); // 총 페이지 수
  const [totalItems, setTotalItems] = useState(10); // 총 아이템 수
  const [isDeleting, setIsDeleting] = useState(false);
  // 쿠키에서 staffInfo 데이터 가져오기
  const staffInfo = JSON.parse(Cookies.get('staffInfo'));

  //초기 렌더링
  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  // API를 통해 주문 데이터를 가져오는 함수 (주문 데이터는 서버에서 가져와야 함)
  const fetchOrders = async (page) => {
    try {
      const response = await axios.post(
        `/api/order/orderList/${page}`,
        staffInfo
      );
      const data = response.data;
      setOrders(data.orders);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      message.success('데이터를 성공적으로 갱신하였습니다.');
    } catch (error) {
      message.error('데이터를 갱신하는 도중 에러가 발생하였습니다.');
      console.error('Error fetching orders:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    // 버튼 기본 동작
    setIsDeleting(true);
    setTimeout(() => setIsDeleting(false), 3200);
    try {
      const wantDelete = window.confirm('주문을 취소하시겠습니까?');

      if (wantDelete) {
        // POST 요청
        const response = await axios.post(`api/order/${orderId}/cancel`);

        message.info(`주문번호 ${orderId}이(가) 취소되었습니다! `);
        fetchOrders(currentPage);
      }
    } catch (error) {
      // 주문 취소 실패 시 처리
      message.error(`주문 취소 중 오류가 발생했습니다.`);
    }
  };

  // 페이지 번호를 변경하고 주문 데이터를 가져오는 함수
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="app-content">
      <PointShopNav />
      <div className="app-content-actions"></div>
      <CCard>
        <CCardHeader>주문목록</CCardHeader>
        {/* 주문 데이터 표시 */}
        <CTable responsive>
          <CTableHead>
            <CTableRow className="order-title">
              <div>&nbsp; 주문번호</div>
              <div>주문일시</div>
              <div>주문상태</div>
              <div style={{ maxWidth: '50px' }}>정보</div>
            </CTableRow>
          </CTableHead>
          {orders.map((order) => (
            <CAccordion key={order.orderId}>
              <CAccordionItem>
                <CAccordionHeader className="order-accordion-button">
                  <CTableRow
                    key={order.orderId}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-around',
                      transform: 'translateX(20px)',
                    }}
                  >
                    <CTableDataCell>
                      {order.orderId}&nbsp;&nbsp;&nbsp;&nbsp;
                    </CTableDataCell>
                    <CTableDataCell>{order.orderDate}</CTableDataCell>
                    <CTableDataCell>
                      <span
                        className={
                          order.orderStatus == 'ORDER'
                            ? 'orderStatus-order'
                            : 'orderStatus-cancel'
                        }
                      >
                        {order.orderStatus}
                      </span>
                    </CTableDataCell>
                  </CTableRow>
                </CAccordionHeader>
                <CAccordionBody>
                  <CTable responsive>
                    <CTableHead>
                      <CTableRow className="order-item-title">
                        <CTableDataCell>이미지</CTableDataCell>
                        <CTableDataCell>상품명</CTableDataCell>
                        <CTableDataCell>수량</CTableDataCell>
                        <CTableDataCell>주문가격</CTableDataCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {order.orderItemDtoList.map((orderItem, index) => (
                        <>
                          <CTableRow
                            key={index}
                            className="order-item-detail"
                            style={{
                              textAlign: 'center',
                            }}
                          >
                            <CTableDataCell>
                              <img
                                src={orderItem.imgUrl}
                                alt={orderItem.itemNm}
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  marginTop: '10px',
                                }}
                              />
                            </CTableDataCell>
                            <CTableDataCell>{orderItem.itemNm}</CTableDataCell>
                            <CTableDataCell>{orderItem.count}</CTableDataCell>
                            <CTableDataCell>
                              {orderItem.orderPrice.toLocaleString()}원
                            </CTableDataCell>
                          </CTableRow>
                        </>
                      ))}
                      <CTableRow>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell
                          style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: '20px',
                          }}
                        >
                          총 가격 :{' '}
                          <span style={{ color: '#C6303E' }}>
                            {order.orderItemDtoList
                              .reduce((totalPrice, orderItem) => {
                                return totalPrice + orderItem.orderPrice;
                              }, 0)
                              .toLocaleString()}
                            원
                          </span>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                  <div
                    style={{
                      textAlign: 'center',
                      paddingRight: '5%',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {order.orderStatus == 'ORDER' ? (
                      <DeleteIcon
                        onClick={() => handleCancelOrder(order.orderId)}
                        orderId={order.orderId}
                        isDeleting={isDeleting}
                        setIsDeleting={setIsDeleting}
                      />
                    ) : (
                      <p style={{ fontWeight: '700', fontSize: '20px' }}>
                        취소 처리된 주문입니다.
                      </p>
                    )}
                  </div>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          ))}
        </CTable>
      </CCard>
      <div className="order-pagination">
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          onChange={(value) => setCurrentPage(value)}
        />
      </div>
    </div>
  );
}

export default OrderListPage;

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
