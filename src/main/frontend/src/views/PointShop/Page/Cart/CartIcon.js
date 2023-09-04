import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import { cilCart } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import './CartIcon.css'; // 애니메이션을 위한 CSS 파일
import { useNavigate } from 'react-router-dom';

const CartIcon = ({ cartItemsCount, updateCartItemsCount }) => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false); // 애니메이션 상태 관리

  useEffect(() => {
    // cartItemsCount가 변경될 때마다 애니메이션 효과 적용
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  }, [cartItemsCount]);

  const handleClick = () => {
    navigate('/point_shop/point_shop/cart_page');
  };

  return (
    <div style={{ position: 'fixed', bottom: '60px', right: '30px' }}>
      <CButton color="warning" onClick={handleClick}>
        <CIcon icon={cilCart} />
        <span className={`cart-badge ${animate ? 'animate' : ''}`}>
          {cartItemsCount}
        </span>
      </CButton>
    </div>
  );
};

export default CartIcon;
