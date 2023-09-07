import { useState } from 'react';
import './DeleteIcon.css';

const DeleteIcon = (props) => {
  const handleDeleteClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      className={`button-delete ${props.isDeleting ? 'delete' : ''}`}
      onClick={handleDeleteClick}
    >
      <div className="trash">
        <div className="top">
          <div className="paper"></div>
        </div>
        <div className="box"></div>
        <div className="check">
          <svg viewBox="0 0 8 6">
            <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
          </svg>
        </div>
      </div>
      <span> &nbsp;&nbsp; 주문 취소</span>
    </button>
  );
};

export default DeleteIcon;
