import React, { useState } from "react";
import { CAlert, CButton, CRow, CCol, CContainer } from "@coreui/react";
import { Button, Form, FormGroup, Input, Col, CardBody } from "reactstrap";
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

  const handleClearClick = () => {
    setCurrentOperand('');
    setPrevOperand('');
    setHourlyWage('');
  };

  const handleDeleteClick = () => {
    setCurrentOperand((prev) => prev.slice(0, -1));
    setHourlyWage((prev) => prev.slice(0, -1));
  };

  const calculateTaxesAndInsurance = (salary) => {
    // 국민연금 계산
    const pension = Math.floor(salary * 0.045);

    // 건강보험료 계산
    const healthInsurance = Math.floor(salary * 0.03545);

    // 장기요양
    const jang = Math.floor(salary * 0.03545 * 0.01281);

    // 고용보험료 계산
    const employmentInsurance = Math.floor(salary * 0.009);

    // 산재보험료 계산
    const industrialAccidentInsurance = Math.floor(salary * 0);

    // 근로 소득세 (1인가구 공제율 100%)
    const jap = Math.floor(salary * 0.00976);

    // 지방 소득세
    const miniJap = Math.floor(jap * 0.1);

    // 근로소득세와 지방소득세를 제외한 세금 총액
    const totalTaxes = pension + healthInsurance + jang + employmentInsurance;

    return {
      totalTaxes,
      pension,
      healthInsurance,
      employmentInsurance,
      jang,
      jap,
      miniJap,
    };
  };

  const handleCalculate = () => {
    const salary = parseInt(hourlyWage) * 1;

    const {
      totalTaxes,
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

    const bTotalPay = salary - totalTaxes;

    setTotalPay(bTotalPay);
  };

  return (
    <>
          <FormGroup>
            <div className="calc">
            <h1>세금 계산기</h1>
            <CAlert color="info">
              {/* CAlert content... */}
            </CAlert>
            <CContainer>
              <CRow>
                <CCol xs={6}>
                  <FormGroup>
                    <h4 htmlFor="hourlyWage">월급(세전)을 입력하세요</h4>
                    <Input
                      type="number"
                      name="hourlyWage"
                      id="hourlyWage"
                      placeholder="월급을 입력하세요"
                      value={hourlyWage}
                      onChange={(e) => setHourlyWage(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="calcbody">
                    <div className="calc">
                      <div className="result">
                        {/* Result display... */}
                      </div>
                      {/* Keypad buttons... */}
                    </div>
                  </FormGroup>
                </CCol>
</div>
                <CCol xs={6}>
                  <FormGroup>
                    <h4>세금 계산 결과:</h4>
                    <h4>국민연금: {pension.toLocaleString()}원</h4>
                    <h4>건강보험: {healthInsurance.toLocaleString()}원</h4>
                    <h4>장기요양: {jang.toLocaleString()}원</h4>
                    <h4>고용보험: {employmentInsurance.toLocaleString()}원</h4>
                    <h4>근로소득세: {jap.toLocaleString()}원</h4>
                    <h4>지방소득세: {miniJap.toLocaleString()}원</h4>
                  </FormGroup>

                  <Button color="info" onClick={handleCalculate}>
                    계산하기
                  </Button>
                  <h3>실 급여: {inputNumberFormat(totalPay)}원</h3>
                </CCol>
              </CRow>
            </CContainer>
          </FormGroup>
  </>
);
};

export default PayManagementSystemCalculator;