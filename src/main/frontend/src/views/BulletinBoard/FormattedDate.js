import React from 'react';

function FormattedDate({ date }) {
  return (
    <span>
      {new Date(date).toLocaleString('ko', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}
    </span>
  );
}

export default FormattedDate;
