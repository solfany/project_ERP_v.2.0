import { cilCart } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell, // CTableCell 대신 CTableDataCell 사용
  CButton,
} from '@coreui/react';

const CartPage = () => {
  const cartItems = []; // 장바구니 상품 목록을 여기에 추가하세요

  return (
    <CCard>
      <CCardHeader>
        <CIcon icon={cilCart} /> &nbsp; 장바구니
      </CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>상품명</CTableHeaderCell>
              <CTableHeaderCell>가격</CTableHeaderCell>
              <CTableHeaderCell>수량</CTableHeaderCell>
              <CTableHeaderCell>총 가격</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {cartItems.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.price}</CTableDataCell>
                <CTableDataCell>{item.quantity}</CTableDataCell>
                <CTableDataCell>{item.price * item.quantity}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger">삭제</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default CartPage;
