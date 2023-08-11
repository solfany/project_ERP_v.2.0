import React, { useState, useEffect } from "react";
import { CAlert, CButton, CContainer,CCol, CRow, } from "@coreui/react";
import { Button, Form, FormGroup, Input, Col, CardBody } from "reactstrap"; // Remove this line if it's already imported above
import "./calc.css";
import "./calc.js";

const PayManagementSystemCalculator = () => {
  const [hourlyWage, setHourlyWage] = useState('');
  const [totalPay, setTotalPay] = useState(0);
  const [pension, setPension] = useState(0);
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [jang, setJang] = useState(0);
  const [employmentInsurance, setEmploymentInsurance] = useState(0);
  const [jap, setJap] = useState(0);
  const [miniJap, setMiniJap] = useState(0);
  const [prevOperand, setPrevOperand] = useState('');
  const [currentOperand, setCurrentOperand] = useState('');

  const inputNumberFormat = (number) => {
    return number.toLocaleString();
  };

  const handleNumberClick = (number) => {
    setCurrentOperand((prev) => prev + number);
    setHourlyWage((prev) => prev + number);

  };
  // 키패드 값 삭제
  const handleClearClick = () => {
    setHourlyWage(''); // Clear hourlyWage as well
  };
  // 키패드 하나씩 지움
  const handleDeleteClick = () => {
    setHourlyWage((prev) => prev.slice(0, -1)); // Clear hourlyWage as well
    // You may want to handle deleting from hourlyWage as well, based on your use case
  };

  // 키패드 이벤트 리스너
// 해당 부분에서 이슈 발생ㅠㅠㅠ 
// 클릭 이벤트와 이후 추가된 키보드 입력 이벤트가 충돌하여, 
// 이후에 적용된 키보드 이벤트가 숫자 1개를 입력시 2개가 출력돠는 이슈 발생으로 
// useEffect훅을 사용하여 키보드 이벤트를 감지하고 처리하는 부분을 만드는데, 
// 이때 입력 된 이벤트가 input element에서 발생된것인지 확인하고 
// e.target.tagName을 사용하여 이벤트가 발생한 요소의 태그 이름을 확인한다. 
// input 엘리먼트가 아닌 경우에만 해당 키보드 입력 이벤트를 처리하도록 수정했고, 
// 이렇게 하면 input element에서 키보드 입력 중에는 키보드 이벤트가 처리되지 않으며 다른 요소에서 키보드 입력을 처리할 수 있다. 
  useEffect(() => {
    const handleKeyboardInput = (e) => {
      const key = e.key;
      if (e.target.tagName !== "INPUT") { // Check if the event target is not an input element
        if (/^[0-9]$/.test(key)) {
          handleNumberClick(key);
        } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "=") {
          handleOperatorClick(key);
        } else if (key === "Enter") {
          handleCalculate();
        } else if (key === "Backspace" || key === "Delete") {
          handleDeleteClick();
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyboardInput);
  
    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, []);
  
  

  const calculateTaxesAndInsurance = (salary) => {
    // 국민연금 계산
    const pension = Math.floor(salary * 0.045);

    // 건강보험료 계산
    const healthInsurance = Math.floor(salary * 0.03545);

    //장기요양
    const jang = Math.floor(salary * 0.03545 * 0.01281);

    // 고용보험료 계산
    const employmentInsurance = Math.floor(salary * 0.009);

    // 산재보험료 계산
    const industrialAccidentInsurance = Math.floor(salary * 0);

    //근로 소득세 (1인가구 공제율 100%)
    const jap = Math.floor(salary * 0.00976);

    //지방 소득세
    const miniJap = Math.floor(jap * 0.1);
    return {
      pension,
      healthInsurance,
      employmentInsurance,
      industrialAccidentInsurance,
      jang,
      jap,
      miniJap,
    };
  };

  const handleCalculate = () => {
    const salary = parseInt(hourlyWage) * 1;

    const {
      pension: calculatedPension,
      healthInsurance: calculatedHealthInsurance,
      jang: calculatedJang,
      employmentInsurance: calculatedEmploymentInsurance,
      jap: calculatedJap,
      miniJap: calculatedMiniJap,
    } = calculateTaxesAndInsurance(salary);

    setPension(calculatedPension);
    setHealthInsurance(calculatedHealthInsurance);
    setJang(calculatedJang);
    setEmploymentInsurance(calculatedEmploymentInsurance);
    setJap(calculatedJap);
    setMiniJap(calculatedMiniJap);

    const bTotalPay =
      salary -
      calculatedPension -
      calculatedHealthInsurance -
      calculatedJang -
      calculatedEmploymentInsurance -
      calculatedJap -
      calculatedMiniJap;
    setTotalPay(bTotalPay);
    
  };

  return (
    <>
              <h1>세금 계산기</h1>
              <CAlert color="info">
                서비스 이용 안내 회사내부규정과 기타 조건에 따라 실제
                월급/연봉과 다를 수 있습니다. 본 계산기는 모의 계산 결과로
                법적 효력이 없습니다.
              </CAlert>
              <CContainer>
                <CRow>
                  <CCol xs={12} md={6}>
              <h5 htmlFor="hourlyWage">월급(세전)을 입력하세요 🤑</h5>
              <Input
              className="calcinput"
                type="number"
                name="hourlyWage"
                id="hourlyWage"
                placeholder="숫자를 입력하세요"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(e.target.value)}
              />

              <div className="calc">
                <div className="result">
                  <input className="result__inner">

                </input>
                <div className="keys">
                  <div className="keys__inner">
                    <div className="key__row">
                     <CRow><CCol xs ={12} id="calcBtn"> <CButton color="warning" variant="outline" onClick={handleClearClick} data-clear className="key"> AC </CButton></CCol></CRow>
                     <CRow> <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('7')} data-number className="key" >7  </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('8')} data-number className="key">8  </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('9')} data-number className="key">9  </CButton></CCol></CRow>
                   
                      <CRow><CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('4')} data-number className="key">4  </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() =>handleNumberClick('5')} data-number className="key">5  </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('6')} data-number className="key">6  </CButton></CCol></CRow>
                     
                      <CRow><CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('1')} data-number className="key">1  </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('2')} data-number className="key"id="calcBtn">2  </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('3')} data-number className="key">3  </CButton></CCol></CRow>
                    
                      <CRow><CCol xs={4} id="calcBtn"> <CButton color="danger" variant="outline" onClick={handleDeleteClick} data-delete className="key"id="calcBtn">DEL </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="secondary" variant="outline" onClick={() => handleNumberClick('0')} data-number className="key">0  </CButton></CCol>
                      <CCol xs={4} id="calcBtn"> <CButton color="info" variant="outline" onClick={handleCalculate} className="key"> 계산하기</CButton></CCol></CRow>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              </CCol>
              <CCol xs={12} md={6}>
            {/* 세금 목록 표시 */}
            <CContainer>
            <h5>세금 계산 결과:</h5>
              <h6>국민연금: {pension.toLocaleString()}원</h6>
              <h6>건강보험: {healthInsurance.toLocaleString()}원</h6>
              <h6>장기요양: {jang.toLocaleString()}원</h6>
              <h6>고용보험: {employmentInsurance.toLocaleString()}원</h6>
              <h6>근로소득세: {jap.toLocaleString()}원</h6>
              <h6>지방소득세: {miniJap.toLocaleString()}원</h6>

            <h5>실 급여: {inputNumberFormat(totalPay)}원</h5>
            </CContainer>

            </CCol>
            </CRow>

        </CContainer>
        
        </>
  );
};

export default PayManagementSystemCalculator;




                          
