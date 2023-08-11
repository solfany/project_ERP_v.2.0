// 개인 엑셀 시트
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "reactstrap";

const TableToExcel = ({
  tableData,
  tableColumns,
  fileName,
  sheetName,
  checkedIndex,
}) => {
  const exportToExcel = () => {
    // 체크된 행 데이터 추출
    const checkedData = tableData.filter(
      (rowData, rowIndex) => rowIndex === checkedIndex
    );

    // 테이블 데이터를 시트 데이터로 변환
    const sheetData = [tableColumns, ...checkedData];
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);

    // 엑셀 워크북 생성
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);

    // 엑셀 파일 다운로드
    XLSX.writeFile(workbook, `${fileName}_근태정산.xlsx`);
  };

  return (
    <Button size="sm" onClick={exportToExcel}>
      내려받기
    </Button>
  );
};

export default TableToExcel;
