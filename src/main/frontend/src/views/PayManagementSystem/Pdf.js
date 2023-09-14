import jsPDF from "jspdf";
import React, { useState, useEffect } from "react";
import "jspdf-autotable";
import QRCode from "qrcode";
import encodedData from "./encodedFontData";
import CIcon from "@coreui/icons-react";
import {
  CContainer,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
} from "@coreui/react";
import { cilCloudDownload } from "@coreui/icons";

function Pdf({ userData }) {
  const [qrCodeURL, setQrCodeURL] = useState("");
  const [pdfViewerUrl, setPdfViewerUrl] = useState("");

  // QR코드 생성 함수 변경
  const generateQrCode = async (pdfUrl) => {
    try {
      const url = await QRCode.toDataURL(pdfUrl);
      setQrCodeURL(url);
      return url;
    } catch (err) {
      console.error(err);
      return "";
    }
  };

  const generatePdf = async () => {
    const doc = new jsPDF();

    const finalPdfDataURI = doc.output("datauristring");
    const finalPdfBlob = doc.output("blob");
    const finalPdfURL = URL.createObjectURL(finalPdfBlob);

    setPdfViewerUrl(finalPdfURL);

    const base64Font = encodedData.encodedFontData;

    // 로고 추가
    doc.addFileToVFS("NotoSerifKR.ttf", base64Font);
    doc.addFont("NotoSerifKR.ttf", "NotoSerifKR", "normal");
    doc.setFont("NotoSerifKR");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);

    doc.text("9 월 급여명세서", 105, 20, {
      align: "center",
      fontStyle: "bold",
    });

    // 기본 정보 추가
    doc.setFontSize(12);
    doc.text("회사명 : ", 10, 30);
    doc.text("지급일 : ", 10, 40);

    // 테이블 헤더와 데이터 설정
    const headers = [
      ["이름", "생년월일", "사원번호", "부서명", "직급", "주소", "이메일"],
    ];
    const data = [
      [
        userData.empName,
        userData.birthDate,
        userData.empNum,
        userData.dept,
        userData.position,
        userData.address,
        userData.email,
      ],
    ];

    doc.autoTable({
      head: headers,
      body: data,
      startY: 50,
      styles: {
        font: "NotoSerifKR",
        lineColor: [0, 0, 0],
        lineWidth: 0.03,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [200, 200, 200],
      },
    });

    // 근태정산 항목 테이블
    const detailsHeader = [["근태정산 항목", "합계"]];
    const detailsData = [
      ["실제근로 일수", userData.actualWorkDays],
      ["실제근로시간", userData.workingHours],
      ["무급휴가 일수", "0"],
      ["유급휴가 일수", userData.vacation],
    ];

    doc.autoTable({
      head: detailsHeader,
      body: detailsData,
      startY: doc.autoTable.previous.finalY + 5,
      styles: {
        font: "NotoSerifKR",
        lineColor: [0, 0, 0],
        lineWidth: 0.03,
        fontSize: 10,
        textColor: [0, 0, 0],
      },
      headStyles: { fillColor: [200, 200, 200] },
    });

    // 지급항목 테이블
    const calculatorHeader = [["지급항목", "지급금액"]];
    const calculatorData = [
      ["기본급", "3,300,000 원"],
      ["식대", "300,000 원"],
      ["교통비", "0 원"],
      ["차량유지비", "100,000 원"],
      ["월 보너스", "100,000 원"],
      ["1인 가구 월세 지원", "200,000 원"],
    ];

    doc.autoTable({
      head: calculatorHeader,
      body: calculatorData,
      startY: doc.autoTable.previous.finalY + 10,
      styles: {
        font: "NotoSerifKR",
        lineColor: [0, 0, 0],
        lineWidth: 0.03,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [200, 200, 200],
      },
    });

    // 공제항목 테이블
    const totalHeader = [["공제항목", "공제금액"]];
    const totalData = [
      ["국민연금", "180,000 원 "],
      ["건강보험", "141,800 원"],
      ["장기요양", "1,816 원"],
      ["고용보험", "36,000 원"],
      ["근로소득세", "39,040 원"],
      ["지방소득세", "3,904 원"],
    ];

    doc.autoTable({
      head: totalHeader,
      body: totalData,
      startY: doc.autoTable.previous.finalY + 10,
      styles: {
        font: "NotoSerifKR",
        lineColor: [0, 0, 0],
        lineWidth: 0.03,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [200, 200, 200],
      },
    });

    doc.setFontSize(10);
    doc.text(
      "귀하의 노고에 감사드립니다.",
      105,
      doc.autoTable.previous.finalY + 10,
      {
        align: "center",
      }
    );

    doc.setFontSize(14);
    doc.text("주식 회사 ( ---- )", 105, doc.autoTable.previous.finalY + 20, {
      align: "center",
    });

    // QR 코드 추가
    const pdfBlob = doc.output("blob");
    const pdfTempUrl = URL.createObjectURL(pdfBlob);
    const generatedQrCodeURL = await generateQrCode(pdfTempUrl);
    doc.addImage(
      generatedQrCodeURL,
      "PNG",
      150,
      doc.autoTable.previous.finalY + 10,
      30,
      30
    );

    // PDF 저장 및 다운로드
    const updatedPdfBlob = doc.output("blob");
    const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);
    setPdfViewerUrl(updatedPdfUrl);
    doc.save("급여명세.pdf");
  };

  return (
    <div>
      <CButton onClick={generatePdf} size="sm">
        <CIcon icon={cilCloudDownload} />
      </CButton>
    </div>
  );
}
export default Pdf;
