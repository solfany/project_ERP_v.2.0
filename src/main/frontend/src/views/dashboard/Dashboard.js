import React from 'react';

import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CListGroupItem,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons';

import avatar1 from 'src/assets/images/avatars/솔비.jpg';
import avatar2 from 'src/assets/images/avatars/준이.jpg';
import avatar3 from 'src/assets/images/avatars/3.jpg';
import avatar4 from 'src/assets/images/avatars/4.jpg';
import avatar5 from 'src/assets/images/avatars/5.jpg';
import avatar6 from 'src/assets/images/avatars/6.jpg';

const Dashboard = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const progressExample = [
    {
      title: '하루 평균 방문 고객 수',
      value: '29.7 (명)',
      percent: 80,
      color: 'success',
    },
    {
      title: '하루 평균 계약 성사 고객',
      value: '21.1 (명)',
      percent: 90,
      color: 'info',
    },
    {
      title: '계약 진행 수',
      value: '78(건)',
      percent: 70,
      color: 'warning',
    },
    { title: '서비스 재이용률', value: '', percent: 80, color: 'danger' },
    {
      title: '업계 대비 영업 이익률',
      value: '14.28(%)',
      percent: 87,
      color: 'primary',
    },
  ];

  const progressGroupExample1 = [
    { title: '월요일', value1: 34, value2: 78 },
    { title: '화요일', value1: 56, value2: 94 },
    { title: '수요일', value1: 12, value2: 67 },
    { title: '목요일', value1: 43, value2: 91 },
    { title: '금요일', value1: 22, value2: 73 },
    { title: '토요일', value1: 53, value2: 82 },
    { title: '일요일', value1: 9, value2: 69 },
  ];

  const progressGroupExample2 = [
    { title: '남성', icon: cilUser, value: 53 },
    { title: '여성', icon: cilUserFemale, value: 43 },
  ];

  const progressGroupExample3 = [
    { title: '구글 검색', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: '페이스북 광고', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: '트위터 광고', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ];

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: '김솔비',
        new: true,
        registered: 'Sep 13, 2023',
      },
      authorty: '사원',
      usage: {
        value: 100,
        period: 'Feb 11, 2023 - Sep 13, 2023',
        color: 'success',
      },
      github: 'https://github.com/solfany',
      email: 'solfany1999@gmail.com',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: '홍준이',
        new: true,
        registered: 'Sep 13, 2023',
      },
      authorty: '사원',
      usage: {
        value: 100,
        period: 'Feb 11, 2023 - Sep 13, 2023',
        color: 'danger',
      },
      github: 'https://github.com/Febyihong',

      email: 'Febyihong@naver.com',
    },
    {
      avatar: { src: avatar3, status: 'primary' },
      user: { name: '김자겸', new: true, registered: 'Sep 13, 2023' },
      authorty: '사원',
      usage: {
        value: 100,
        period: 'Feb 11, 2023 - Sep 13, 2023',
        color: 'primary',
      },
      github: 'https://github.com/solfany',

      email: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'warning' },
      user: { name: '조정원', new: true, registered: 'Sep 13, 2023' },
      authorty: '사원',
      usage: {
        value: 100,
        period: 'Feb 11, 2023 - Sep 13, 2023',
        color: 'warning',
      },
      github: 'https://github.com/solfany',

      email: 'Last month',
    },
  ];

  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <CCallout color="primary">
                <span
                  style={{
                    fontSize: '22px',
                    fontFamily: 'SUIT-Regular',
                    fontWeight: '700',
                  }}
                >
                  팀원 명단
                </span>
                <div className="small text-medium-emphasis">
                  소속 - 개발 3팀
                </div>
              </CCallout>
            </CCol>
          </CRow>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>이름</CTableHeaderCell>
                <CTableHeaderCell className="text-center">
                  직급
                </CTableHeaderCell>
                <CTableHeaderCell>직무</CTableHeaderCell>
                <CTableHeaderCell>GitHub</CTableHeaderCell>
                <CTableHeaderCell className="text-center">
                  E-mail
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tableExample.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar
                      size="xl"
                      src={item.avatar.src}
                      status={item.avatar.status}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.user.name}</div>
                    <div className="small text-medium-emphasis">
                      <span>{item.user.new ? 'New' : 'Recurring'}</span> |
                      Registered: {item.user.registered}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CBadge color="success" shape="rounded-pill">
                      {item.authorty}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <strong>{item.usage.value}%</strong>
                      </div>
                      <div className="float-end">
                        <small className="text-medium-emphasis">
                          {item.usage.period}
                        </small>
                      </div>
                    </div>
                    <CProgress
                      thin
                      color={item.usage.color}
                      value={item.usage.value}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CListGroupItem
                      component="a"
                      href={item.github}
                      color={'dark'}
                    >
                      {item.github}
                    </CListGroupItem>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">Last login</div>
                    <strong>{item.email}</strong>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <CCallout color="primary">
                <span
                  style={{
                    fontSize: '22px',
                    fontFamily: 'SUIT-Regular',
                    fontWeight: '700',
                  }}
                >
                  성과 지표
                </span>
                <div className="small text-medium-emphasis">1월 - 7월 2023</div>
              </CCallout>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
              ],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [90, 120, 80, 150, 140, 180, 195],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [130, 170, 175, 180, 190, 190, 200],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [120, 110, 110, 140, 170, 160, 190],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress
                  thin
                  className="mt-2"
                  color={item.color}
                  value={item.percent}
                />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      {/* <WidgetsBrand withCharts /> */}

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>마케팅 현황</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">
                          신규 고객 수
                        </div>
                        <div className="fs-5 fw-semibold">1,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          기존 고객 수
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">
                          {item.title}
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          페이지 방문 수
                        </div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">
                          누적 계약 건수
                        </div>
                        <div className="fs-5 fw-semibold">5,722</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}%
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">
                            ({item.percent}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
