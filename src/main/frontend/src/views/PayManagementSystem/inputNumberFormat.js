function inputNumberFormat(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default inputNumberFormat;

// 급여관리
