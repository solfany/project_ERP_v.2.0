import { Table, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import TableToExcel from "./TableToExcel";
import TotalExcel from "./TotalExcel";
import { Pagination, message } from "antd";
import {
  CContainer,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from "@coreui/react";
// ---------
import CountWeekdays from "./CountWeekdays";
import CarComponent from "./CarComponent";
function TimeManagementSystem() {
  const [users, setUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDays, setSearchDays] = useState("");
  const [checkedIndex, setCheckedIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지에 표시할 아이템 수
  const [currentSortKey, setCurrentSortKey] = useState("");
  const [tableData, setTableData] = useState([]);
  // 검색창 상태관리
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchEmpNum, setSearchEmpNum] = useState("");

  const totalPages = Math.ceil(users.length / itemsPerPage); // 총 페이지 수
  // 현재 페이지에 대한 아이템만 반환

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // --------------

  //엑셀 양식
  const tableColumns = [
    "사원번호",
    "이름",
    "나이",
    "유급휴가일수",
    "소정근로일수",
    "실제근로일수",
    "소정근로시간",
    "전화번호",
    "이메일",
  ];
  // 나이 및 출생년도를 반환하는 함수
  function getAgeAndBirthYear(birthDate) {
    // 년도만 추출
    const birthYear = parseInt(birthDate.split("-")[0], 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear; // 현재 나이 계산

    return `${birthYear}년 출생, 나이 만 ${age}세`;
  }

  // ----------------
  //엑셀 양식
  useEffect(() => {
    setTableData(
      users.map((user) => [
        `${user.staff.empNum}`, // 사원 번호
        `${user.staff.empName}`, // 사원 이름
        `${getAgeAndBirthYear(user.birthDate)}`, // 연도를 나이로 변환하는 함수
        `${user.vacation} 일`, // 유급휴가일수
        `${user.workingDays} 일`, //소정근로일수
        `${user.actualWorkDays} 시간`, // 실제근로일수
        `${user.workingHours} 시간`, //소정근로시간
        `${user.phoneNumber} `, // 핸드폰
        `${user.staff.email} `, //이메일
      ])
    );
  }, [users]);

  // 현재 페이지에 해당하는 아이템을 반환하는 함수
  const getCurrentItems = () => {
    return getFilteredAndSortedItems().slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  };

  // 현재페이지 반환
  const getFilteredAndSortedItems = () => {
    let filteredUsers = users.filter((user) => {
      const nameMatch = user.staff.empName
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const deptMatch = user.staff.dept
        .toLowerCase()
        .includes(searchDepartment.toLowerCase());
      const empNumMatch = String(user.staff.empNum).includes(searchEmpNum);

      return nameMatch && deptMatch && empNumMatch;
    });

    // 정렬 로직
    if (currentSortKey === "empName") {
      filteredUsers.sort((a, b) =>
        sortDirection === "asc"
          ? a.staff.empName.localeCompare(b.staff.empName)
          : b.staff.empName.localeCompare(a.staff.empName)
      );
    } else if (currentSortKey === "vacation") {
      filteredUsers.sort((a, b) =>
        sortDirection === "asc"
          ? a.vacation - b.vacation
          : b.vacation - a.vacation
      );
    }
    return filteredUsers;
  };

  // 정렬
  const sortByKey = (a, b, key, direction) => {
    if (a[key] === b[key]) return 0;
    const order = a[key] > b[key] ? 1 : -1;
    return direction === "asc" ? order : -order;
  };

  const handleSortBy = (key) => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setCurrentSortKey(key);
    setSortDirection(newDirection);
  };

  // 체크박스 선택
  const handleCheckbox = (index) => {
    setCheckedIndex(checkedIndex === index ? -1 : index);
  };

  // 검색창 이벤트 핸들러
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchDepartmentChange = (event) => {
    setSearchDepartment(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchEmpNumChange = (event) => {
    setSearchEmpNum(event.target.value);
    setCurrentPage(1);
  };

  // 서버에서 데이터 불러오기
  useEffect(() => {
    // fetch("/api/timeManagement")를 사용하여 데이터를 불러옵니다.
    fetch("/api/timeManagement")
      .then((response) => response.json())
      .then((data) => {
        // 데이터를 받아와서 setUsers 함수를 사용하여 users 상태를 업데이트합니다.
        setUsers(data);
        console.log(data);
      });
  }, []); // 빈 배열을 두 번째 인자로 전달하여 한 번만 실행되도록 설정합니다.

  return (
    <CContainer>
      <h2 className="calendarTitle">근태정산</h2>
      <CountWeekdays />
      <Row>
        <Col md="4">
          <Input
            type="text"
            value={searchName}
            onChange={handleSearchNameChange}
            placeholder=" 직원 이름으로 검색"
            onClick={() => setCheckedIndex(-1)}
          />
        </Col>
        <Col md="4">
          <Input
            type="text"
            value={searchDepartment}
            onChange={handleSearchDepartmentChange}
            placeholder=" 부서 이름으로 검색"
            onClick={() => setCheckedIndex(-1)}
          />
        </Col>
        <Col md="4">
          <Input
            type="text"
            value={searchEmpNum}
            onChange={handleSearchEmpNumChange}
            placeholder=" 사원번호로 검색"
            onClick={() => setCheckedIndex(-1)}
          />
        </Col>
      </Row>

      <br />
      <CTable striped bordered hover style={{ whiteSpace: "nowrap" }}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell onClick={() => handleSortBy("empName")}>
              직원{" "}
              {sortDirection === "asc" ? (
                <i className="fa fa-sort-alpha-asc"></i>
              ) : (
                <i className="fa fa-sort-alpha-desc"></i>
              )}
            </CTableHeaderCell>
            <CTableHeaderCell>사원번호</CTableHeaderCell>
            <CTableHeaderCell>부서</CTableHeaderCell>

            <CTableHeaderCell onClick={() => handleSortBy("vacation")}>
              유급휴가 일수{" "}
              {sortDirection === "asc" ? (
                <i className="fa fa-sort-numeric-asc"></i>
              ) : (
                <i className="fa fa-sort-numeric-desc"></i>
              )}
            </CTableHeaderCell>
            <CTableHeaderCell>소정근로일수</CTableHeaderCell>
            <CTableHeaderCell>실제 근로일수</CTableHeaderCell>
            <CTableHeaderCell>소정근로시간</CTableHeaderCell>
            <CTableHeaderCell>email</CTableHeaderCell>
            <CTableHeaderCell>선택</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getCurrentItems().map((user, index) => (
            <CTableRow key={user.id}>
              <CTableDataCell>{user.staff.empName}</CTableDataCell>
              <CTableDataCell>{user.staff.empNum}</CTableDataCell>
              <CTableDataCell>{user.staff.dept}</CTableDataCell>
              <CTableDataCell>{user.vacation}</CTableDataCell>
              <CTableDataCell>{user.workingDays} 일</CTableDataCell>
              <CTableDataCell>{user.actualWorkDays} 일</CTableDataCell>
              <CTableDataCell>{user.workingHours} 시간</CTableDataCell>
              <CTableDataCell>{user.staff.email}</CTableDataCell>
              <CTableDataCell>
                <input
                  type="checkbox"
                  checked={index === checkedIndex}
                  onChange={() => handleCheckbox(index)}
                  onClick={(e) => e.stopPropagation()}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {getCurrentItems().length === 0 && <CarComponent />}
      <Pagination
        current={currentPage}
        total={users.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
      />
      <div
        style={{
          textAlign: "center",
        }}
      ></div>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <TotalExcel
          tableData={tableData}
          tableColumns={tableColumns}
          fileName="myTable"
          sheetName="통합 근태 "
        />
      </div>
      {checkedIndex !== -1 && (
        <>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h5>{users[checkedIndex].staff.empName} 님의 근태정산 Excel</h5>
            <TableToExcel
              tableData={tableData}
              tableColumns={tableColumns}
              fileName={users[checkedIndex].staff.empName}
              sheetName="mySheet"
              currentItems={getCurrentItems()} // 현재 페이지의 항목들을 전달합니다.
              checkedIndex={checkedIndex}
            />
            <Button size="sm" onClick={() => setCheckedIndex(-1)}>
              취소
            </Button>
          </div>
        </>
      )}
    </CContainer>
  );
}
export default TimeManagementSystem;
