import {
  Table,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  Pagination,
} from "reactstrap";
import { useState, useEffect } from "react";
import TableToExcel from "./TableToExcel";
import TotalExcel from "./TotalExcel";
// ---------
import GetThisMonth from "./getThisMonth";
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

  // --------------

  //엑셀 양식
  const tableColumns = [
    `당월 근태정산`,
    "사원번호",
    "이름",
    "나이",
    "유급휴가일수",
    "소정근로일수",
    "실제근로일수",
    "소정근로시간",
    "승인된 근로시간",
    "전화번호",
    "이메일",
    "입사일",
  ];
  //엑셀에 들어갈 나이를 출생년도로 바꿔주는 함수
  function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  //json 파일 불러오기
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/solfany/Json_Group/main/json/project/002/user-list.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
      });
  }, []);

  // ----------------
  //엑셀 양식
  useEffect(() => {
    setTableData(
      users.map((user) => [
        ``,
        `${user.rank} `,
        `${user.name} 님`,
        `${user.age}세 (${calculateAge(user.age)}년 출생)`,
        `${user.data5} 일`,
        `${user.data1} 일`,
        `${user.data2} 일`,
        `${user.data3} 시간`,
        `${user.data4} 시간`,
        `${user.phone} `,
        `${user.email} `,
        `${user.date} `,
      ])
    );
  }, [users]);

  // 현재 테이블 해당하는 아이템들을 반환하는 함수
  const getCurrentItems = () => {
    const filterData = users.filter((user) => {
      return (
        user.name &&
        user.date &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.date.toLowerCase().includes(searchDays.toLowerCase())
      );
    });

    // ---------

    // currentSortKey에 따라 데이터를 정렬하는 로직
    let sortedData;
    if (currentSortKey === "name") {
      //이름 오름차순/내림차순 정렬
      sortedData = [...filterData].sort((a, b) =>
        sortDirection === "asc" //오름차순 정렬
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (currentSortKey === "vacationDays") {
      //유급휴가 일수 정렬
      sortedData = [...filterData].sort((a, b) =>
        sortDirection === "asc" //오름차순 정렬
          ? a.vacationDays - b.vacationDays
          : b.vacationDays - a.vacationDays
      );
    } else {
      sortedData = filterData; //위의 두 경우에 해당하지 않는 경우에는 filterData를 그대로 할당
    }

    // 페이지네이션 ----------
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  // 현재 페이지에 해당하는 아이템들을 반환하는 함수
  const currentItems = getCurrentItems();

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 이름 & 유급휴가 일수 오름차순/내림차순 정렬
  const handleSortBy = (key) => {
    if (sortDirection === "asc") {
      setUsers([...users].sort((a, b) => (a[key] < b[key] ? 1 : -1)));
      setSortDirection("desc");
    } else {
      setUsers([...users].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
      setSortDirection("asc");
    }
  };

  //체크박스
  const handleCheckbox = (index) => {
    if (checkedIndex === index) {
      // 이미 선택된 체크박스를 클릭하면 선택을 해제합니다.
      setCheckedIndex(-1);
    } else {
      // 다른 체크박스를 클릭하면 해당 index로 설정합니다.
      setCheckedIndex(index);
    }
  };

  // 검색창 해당하는 DB 찾기
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // 달력 날짜 별로 해당하는 db 찾기
  const handleSearchDaysChange = (event) => {
    setSearchDays(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="content">
      <div className="calendarHead">
        <h2 className="calendarTitle">근태정산</h2>
      </div>
      <GetThisMonth />
      <Row>
        <Col md="3">
          <FormGroup>
            <Input
              id="Date"
              name="date"
              placeholder="date placeholder"
              type="date"
              value={searchDays}
              onChange={handleSearchDaysChange}
              onClick={() => setCheckedIndex(-1)}
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder=" 직원 이름으로 검색"
            onClick={() => setCheckedIndex(-1)}
          />
        </Col>
      </Row>
      <Table striped bordered hover style={{ whiteSpace: "nowrap" }}>
        <thead>
          <tr>
            <th onClick={() => handleSortBy("name")}>
              직원{" "}
              {sortDirection === "asc" ? (
                <i className="fa fa-sort-alpha-asc"></i>
              ) : (
                <i className="fa fa-sort-alpha-desc"></i>
              )}
            </th>
            <th onClick={() => handleSortBy("data5")}>
              유급휴가 일수{" "}
              {sortDirection === "asc" ? (
                <i className="fa fa-sort-numeric-asc"></i>
              ) : (
                <i className="fa fa-sort-numeric-desc"></i>
              )}
            </th>
            <th>email</th>
            <th>소정근로일수</th>
            <th>실제 근로일수</th>
            <th>소정근로시간</th>
            <th>승인된 근로시간</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.data5}</td>
              <td>{user.email}</td>
              <td>{user.data1}</td>
              <td>{user.data2}</td>
              <td>{user.data3}</td>
              <td>{user.data4}</td>
              <td>
                <input
                  type="checkbox"
                  checked={index === checkedIndex}
                  onChange={() => handleCheckbox(index)}
                  onClick={(e) => e.stopPropagation()}
                />{" "}
                {index === checkedIndex}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Col>
          <Button size="sm" onClick={goToPrevPage}>
            이전
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              size="sm"
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </Button>
          ))}
          <Button size="sm" onClick={goToNextPage}>
            다음
          </Button>
        </Col>
      </div>
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
              textAlign: "right",
            }}
          >
            <h5>{currentItems[checkedIndex].name} 님의 근태정산 Excel</h5>
            <TableToExcel
              tableData={tableData}
              tableColumns={tableColumns}
              fileName={currentItems[checkedIndex].name}
              sheetName="mySheet"
              currentItems={currentItems}
              checkedIndex={checkedIndex}
            />
            <Button size="sm" onClick={() => setCheckedIndex(-1)}>
              취소
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
export default TimeManagementSystem;
