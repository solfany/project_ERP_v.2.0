import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilCalendarCheck,
  cilChartPie,
  cilClipboard,
  cilCursor,
  cilDescription,
  cilDrop,
  cilMap,
  cilMobileLandscape,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilTablet,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "관리 보드",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavTitle,
    name: "사용자 페이지",
  },
  // {
  //   component: CNavItem,
  //   name: "Colors",
  //   to: "/theme/colors",
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: "Typography",
  //   to: "/theme/typography",
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: "근무일정",
    to: "/calendar",
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "출퇴근기록",
    to: "/attend_manage",
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "출결입력",
        to: "/attend_manage/attendInput",
      },
      {
        component: CNavItem,
        name: "출결기록",
        to: "/attend_manage/attendRecord",
      },
    ],
  },
  //Map
  {
    component: CNavItem,
    name: "휴가일정",
    to: "/Vacation/Map", //경로
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },

  //Chat
  {
    component: CNavItem,
    name: "사내 메신저",
    to: "/Chatting/Chat",
    icon: <CIcon icon={cilTablet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "회사관리",
    to: "/staff/StaffManagement",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "근태관리",
    to: "/TimeManagementSystem/TimeManagementSystem",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "급여관리",
    to: "/PayManagementSystem",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "급여계산기",
        to: "/PayManagementSystem/PayManagementSystemCalculator",
      },
      {
        component: CNavItem,
        name: "급여정산",
        to: "/PayManagementSystem/PayManagementSystemManagement",
      },
    ],
  },
  {
    component: CNavItem,
    name: "게시판",
    to: "/BulletinBoard/BulletinBoard",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "포인트샵",
    to: "/point_shop/point_shop",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "관리자 페이지",
  },
  // {
  //   component: CNavGroup,
  //   name: '직원',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: '직원관리',
  //       to: '/employee/EmployeeManagement',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     // {
  //     //   component: CNavItem,
  //     //   name: "Login",
  //     //   to: "/login",
  //     // },
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: "로그인",
    to: "/login/Login",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
];

export default _nav;
