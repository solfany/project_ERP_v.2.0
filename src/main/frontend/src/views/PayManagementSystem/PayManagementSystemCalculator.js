import React, { useState, useEffect } from "react";
import {
  CAlert,
  CButton,
  CContainer,
  CCol,
  CRow,
  CPopover,
  CCard,
} from "@coreui/react";
import { Button, Form, FormGroup, Input, Col, CardBody } from "reactstrap"; // Remove this line if it's already imported above
import Swal from "sweetalert2";
import "./calc.css";
import { Popover } from "@coreui/coreui";

const PayManagementSystemCalculator = () => {
  const [hourlyWage, setHourlyWage] = useState("");
  const [totalPay, setTotalPay] = useState(0);
  const [pension, setPension] = useState(0);
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [jang, setJang] = useState(0);
  const [employmentInsurance, setEmploymentInsurance] = useState(0);
  const [jap, setJap] = useState(0);
  const [miniJap, setMiniJap] = useState(0);
  const [prevOperand, setPrevOperand] = useState("");
  const [currentOperand, setCurrentOperand] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [popoverActive, setPopoverActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleReceipt = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const inputNumberFormat = (number) => {
    return number.toLocaleString();
  };

  const handleNumberClick = (number) => {
    setCurrentOperand((prev) => prev + number);
    setHourlyWage((prev) => prev + number);
  };
  // 키패드 값 삭제
  const handleClearClick = () => {
    setHourlyWage(""); // Clear hourlyWage as well
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

      if (e.target.tagName !== "INPUT") {
        // 입력 대상이 input 요소가 아닌 경우
        if (key === "Backspace" || key === "Delete" || key === " ") {
          // 스페이스바 입력 조건 추가
          e.preventDefault();
          if (key === "Backspace" || key === "Delete") {
            handleDeleteClick();
          }
        }
      } else {
        // 이 섹션은 input 필드 내의 입력을 처리합니다.
        if (
          !/^[0-9]$/.test(key) && // 키가 숫자가 아닌 경우
          key !== "Backspace" &&
          key !== "Delete" &&
          key !== "Enter" &&
          key !== "." &&
          key !== "ArrowLeft" &&
          key !== "ArrowRight" &&
          key !== "ArrowUp" &&
          key !== "ArrowDown"
        ) {
          // 허용된 키와 일치하지 않는 경우 경고를 표시하고 입력을 방지합니다.
          alert("숫자만 입력 할 수 있습니다.");
          e.preventDefault(); // 키 입력 동작을 방지합니다.
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardInput);

    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCalculate();
    }
  };

  const showAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Alert가 실행되었습니다.", // Alert 제목
      text: "Something went wrong!",
    });
  };

  // ==========================
  const [title, setTitle] = useState("");
  const PayManagementSystemCalculatorTitle = [
    " 우측 계산기에 숫자 입력 후, 좌측 명세서에서 확인가능합니다",
    " 월급여액은 비과세 소득을 제외한 금액이랍니다.",
    " 명세서를 보면 이미 월급에서 세금이 징수된 것을 확인할 수 있어요. 이걸 ‘원천징수’라 합니다",
    " 이미 납부한 세금을 다시 계산해 최종적으로 올해 납부할 세금을 확인, 정산하는 게 '연말정산'이에요",
    " 공제란 세금을 줄이는 걸 의미해요. 공제에는 근로소득공제, 종합소득공제, 세액공제 총 3가지가 있어요.",
    " 소득공제는 세율을 곱하기 전 단계의 소득 금액을 줄여주는 것, 액공제는 세율을 곱해서 나온 세액에서 일정한 금액을 줄여주는 것입니다.",
  ];
  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * PayManagementSystemCalculatorTitle.length
    );
    setTitle(PayManagementSystemCalculatorTitle[randomIndex]);
  }, []);

  // -------------------------------

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
        서비스 이용 안내 회사내부규정과 기타 조건에 따라 실제 월급/연봉과 다를
        수 있습니다. 본 계산기는 모의 계산 결과로 법적 효력이 없습니다.🥶
      </CAlert>
      <CAlert color="warning">
        💡 알고 계셨나요?
        {title}
      </CAlert>

      <CContainer className="PayContainer">
        <CRow>
          <CCol xs={12} md={6}>
            <h4 className="PayTitle">월급(세전)을 입력하세요. </h4>
            <div className="calcbody">
              <div className="calc">
                <div className="result">
                  <div className="result__inner">
                    <Input
                      onKeyDown={handleKeyDown}
                      className="calcinput"
                      type="number"
                      name="hourlyWage"
                      id="hourlyWage"
                      placeholder="숫자를 입력하세요"
                      value={hourlyWage}
                      onChange={(e) => setHourlyWage(e.target.value)}
                    />
                  </div>

                  <div className="keys">
                    <div className="keys__inner">
                      <div className="key__row">
                        <CRow>
                          <CCol xs={12} id="calcBtn">
                            {" "}
                            <CButton
                              color="warning"
                              variant="outline"
                              onClick={handleClearClick}
                              data-clear
                              className="key"
                            >
                              {" "}
                              AC{" "}
                            </CButton>
                          </CCol>
                        </CRow>
                        <CRow>
                          {" "}
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("7")}
                              data-number
                              className="key"
                            >
                              7{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("8")}
                              data-number
                              className="key"
                            >
                              8{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("9")}
                              data-number
                              className="key"
                            >
                              9{" "}
                            </CButton>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("4")}
                              data-number
                              className="key"
                            >
                              4{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("5")}
                              data-number
                              className="key"
                            >
                              5{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("6")}
                              data-number
                              className="key"
                            >
                              6{" "}
                            </CButton>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("1")}
                              data-number
                              className="key"
                            >
                              1{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("2")}
                              data-number
                              className="key"
                              id="calcBtn"
                            >
                              2{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("3")}
                              data-number
                              className="key"
                            >
                              3{" "}
                            </CButton>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="danger"
                              variant="outline"
                              onClick={handleDeleteClick}
                              data-delete
                              className="key"
                              id="calcBtn"
                            >
                              DEL{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="secondary"
                              variant="outline"
                              onClick={() => handleNumberClick("0")}
                              data-number
                              className="key"
                            >
                              0{" "}
                            </CButton>
                          </CCol>
                          <CCol xs={4} id="calcBtn">
                            {" "}
                            <CButton
                              color="info"
                              variant="outline"
                              onClick={handleCalculate}
                              className="key"
                            >
                              {" "}
                              계산하기
                            </CButton>
                          </CCol>
                        </CRow>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CCol>

          {/* ======================================================================== */}

          {/* 세금 목록 표시 */}
          <CCol xs={12} md={6}>
            <h4 className="PayTitle">
              계산 결과 확인
              <br />⤵
            </h4>
            <div className="receiptName">
              <article className={`receipt ${isActive ? "active" : ""}`}>
                <section class="receipt__half upper">
                  <p className="sm">2023년 기준 명세</p>
                  <div className="receipt__content">
                    {/* CPopover 과 button, css(pointer-event) error 이슈... 
    명세 디자인을 하다 보니 기존 세금 컨텐츠를 일시적으로 
    가려두고 버튼을 눌렀을 때만 보이게 작업을 진행을 원했고, 
    작업을 하다보니 닫기 버튼을 눌렀을 때 가려져 있던 컨텐츠와 버튼 이벤트가 출동하여 이슈가 발생. 
    그래서 해결책으로 receipt__content 부분에 pointer-event를 통해 none값을 주었고, 해당 값을 주자 CPopover(팝오버)
    즉, 마우스오버 까지 none 값으로 노출이 안되는 상황 발생. 
    해결 방법으로는 pointer-event 값을 none 값을 안준 나머지 css에 auto 값을 주어 
    닫기 버튼을 눌렀을 때 세금 명세 컨텐츠는 마우스 이벤트 none 으로 막고 
    그 이외에 상황엔 마우스 hover시에 정상작동 하도록 하나하나 지정해주었다.   */}

                    <CRow>
                      <CCol xs={6}>
                        <CPopover
                          content="월 소득액(비과세액 제외)에서 4.5%를 공제합니다. 근로자, 기업 각 각 4.5% 씩 부담합니다 "
                          placement="left"
                          trigger={["hover", "focus"]}
                          id="popover-content"
                        >
                          <span
                            className="d-inline-block" // 팝오버를 보이도록 상태 업데이트
                          >
                            {" "}
                            국민연금{" "}
                          </span>
                        </CPopover>
                      </CCol>
                      <CCol xs={6} className="rightCol">
                        {" "}
                        ₩ {pension.toLocaleString()}
                      </CCol>

                      <CCol xs={6}>
                        <CPopover
                          content="월 소득액(비과세 제외)에서 7.09% 를 공제합니다. 근로자 기업 각각 3.545% 씩 부담합니다"
                          placement="left"
                          trigger={["hover", "focus"]}
                          id="popover-content"
                        >
                          <span className="d-inline-block">건강보험</span>
                        </CPopover>
                      </CCol>
                      <CCol xs={6} className="rightCol">
                        {" "}
                        ₩ {healthInsurance.toLocaleString()}
                      </CCol>

                      <CCol xs={6}>
                        <CPopover
                          content="건강보험금액의 12.81%를 공제합니다"
                          placement="left"
                          trigger={["hover", "focus"]}
                          id="popover-content"
                        >
                          <span className="d-inline-block"> 장기요양 </span>
                        </CPopover>
                      </CCol>
                      <CCol xs={6} className="rightCol">
                        {" "}
                        ₩ {jang.toLocaleString()}
                      </CCol>

                      <CCol xs={6}>
                        <CPopover
                          content="월 소득액(비과세 제외)에서 0.9% 공제합니다"
                          placement="left"
                          trigger={["hover", "focus"]}
                          id="popover-content"
                        >
                          <span className="d-inline-block"> 고용보험 </span>
                        </CPopover>
                      </CCol>
                      <CCol xs={6} className="rightCol">
                        {" "}
                        ₩ {employmentInsurance.toLocaleString()}
                      </CCol>

                      <CCol xs={6}>
                        <CPopover
                          content="급여와 부양가족수에 따라 국세청의 근로소득 간이세액표 자료를 기준으로 공제합니다 "
                          placement="left"
                          trigger={["hover", "focus"]}
                          id="popover-content"
                        >
                          <span className="d-inline-block"> 근로소득세 </span>
                        </CPopover>
                      </CCol>
                      <CCol xs={6} className="rightCol">
                        {" "}
                        ₩ {jap.toLocaleString()}
                      </CCol>

                      <CCol xs={6}>
                        <CPopover
                          content="소득세의 10%를 공제합니다."
                          placement="left"
                          trigger={["hover", "focus"]}
                          id="popover-content"
                        >
                          <span className="d-inline-block"> 지방소득세 </span>
                        </CPopover>
                      </CCol>
                      <CCol xs={6} className="rightCol">
                        {" "}
                        ₩ {miniJap.toLocaleString()}
                      </CCol>
                      <p className="smP">
                        🔔 각 항목 별 마우스 오버시 상세정보 확인 가능합니다.
                      </p>
                    </CRow>
                  </div>
                  <hr />
                  <h4> ₩ {inputNumberFormat(totalPay)} </h4>
                  <br />
                </section>
                <section
                  className={`receipt__half lower ${isActive ? "active" : ""}`}
                >
                  <button className="toBtn" onClick={toggleReceipt}>
                    {isActive ? "닫기" : "열기"}
                  </button>
                </section>
              </article>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};
export default PayManagementSystemCalculator;
