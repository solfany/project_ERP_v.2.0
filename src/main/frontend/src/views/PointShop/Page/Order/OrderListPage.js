import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PointShopNav from '../../PointShopNav';
import './OrderListPage.css';

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

function OrderListPage() {
  const [orders, setOrders] = useState([]); // 주문 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(5); // 총 페이지 수
  const [totalItems, setTotalItems] = useState(10); // 총 아이템 수

  const [isDeleting, setIsDeleting] = useState(false);
  console.log('totalPages 밖: ', totalPages);
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
      // POST 요청
      const response = await axios.post(`api/order/${orderId}/cancel`);

      // 주문 취소 성공 시 처리
      message.info(`주문번호 ${orderId}이(가) 취소되었습니다! `);
      fetchOrders(currentPage);
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
            <CAccordion>
              <CAccordionItem>
                <CAccordionHeader>
                  <CTableRow
                    key={order.orderId}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <CTableDataCell>{order.orderId}</CTableDataCell>
                    <CTableDataCell>{order.orderDate}</CTableDataCell>
                    <CTableDataCell>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {order.orderStatus}
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
                            style={{ textAlign: 'center' }}
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
                              {orderItem.orderPrice}원
                            </CTableDataCell>
                          </CTableRow>
                        </>
                      ))}
                      <CTableRow className="order-item-button">
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell>
                          <DeleteIcon
                            onClick={() => handleCancelOrder(order.orderId)}
                            orderId={order.orderId}
                            isDeleting={isDeleting}
                            setIsDeleting={setIsDeleting}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
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
