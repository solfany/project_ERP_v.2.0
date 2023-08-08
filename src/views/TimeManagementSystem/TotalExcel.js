// 전체 엑셀
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "reactstrap";

const TotalExcel = ({ tableData, tableColumns, fileName, sheetName }) => {
  const exportToExcel = () => {
    // 테이블 데이터를 시트 데이터로 변환
    const sheetData = [tableColumns, ...tableData];
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);

    // 엑셀 워크북 생성
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);

    // 엑셀 파일 다운로드
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button size="sm" onClick={exportToExcel}>
      당월 Excel 내려받기
    </Button>
  );
};

export default TotalExcel;
