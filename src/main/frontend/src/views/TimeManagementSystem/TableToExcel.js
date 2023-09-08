import React from "react";
import * as XLSX from "xlsx";
import { Button } from "reactstrap";

/**
 * TableToExcel 컴포넌트는 사용자가 선택한 테이블의 행 데이터를 엑셀 파일로 내려받기 위한 기능을 제공합니다.
 */
const TableToExcel = ({
  tableData, // 전체 테이블 데이터
  tableColumns, // 테이블의 컬럼 목록
  fileName, // 저장할 엑셀 파일의 이름
  sheetName, // 엑셀 시트의 이름
  checkedIndex, // 사용자가 선택한 테이블의 행 인덱스
}) => {
  /**
   * 사용자가 선택한 행 데이터를 엑셀 파일로 내려받는 기능을 수행합니다.
   */
  const exportToExcel = () => {
    // 사용자가 선택한 행 데이터를 추출
    const checkedData = extractCheckedData(tableData, checkedIndex);

    // 엑셀 파일에 추가될 데이터 목록을 구성
    // 이 목록에는 제목, 컬럼 이름, 사용자가 선택한 행 데이터가 포함됩니다.
    const sheetData = [["근태정산"], tableColumns, ...checkedData];

    // 데이터 목록을 바탕으로 엑셀 시트를 생성
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // 새로운 엑셀 워크북을 생성하고, 앞서 생성한 시트를 추가
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // 워크북을 엑셀 파일로 저장
    XLSX.writeFile(wb, `${fileName}_근태정산.xlsx`);
  };

  // "내려받기" 버튼. 버튼을 클릭하면 exportToExcel 함수가 실행됩니다.
  return (
    <Button size="sm" onClick={exportToExcel}>
      내려받기
    </Button>
  );
};

/**
 * 사용자가 선택한 행 데이터를 추출합니다.
 */
const extractCheckedData = (tableData, checkedIndex) => {
  return tableData.filter((rowData, rowIndex) => rowIndex === checkedIndex);
};

export default TableToExcel;
