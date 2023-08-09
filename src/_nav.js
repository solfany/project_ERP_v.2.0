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
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavTitle,
    name: "Theme",
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
    to: "/Vacation/Map",
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
    component: CNavTitle,
    name: "Components",
  },
  {
    component: CNavGroup,
    name: "Base",
    to: "/base",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Accordion",
        to: "/base/accordion",
      },
      {
        component: CNavItem,
        name: "Breadcrumb",
        to: "/base/breadcrumbs",
      },
      {
        component: CNavItem,
        name: "Cards",
        to: "/base/cards",
      },
      {
        component: CNavItem,
        name: "Carousel",
        to: "/base/carousels",
      },
      {
        component: CNavItem,
        name: "Collapse",
        to: "/base/collapses",
      },
      {
        component: CNavItem,
        name: "List group",
        to: "/base/list-groups",
      },
      {
        component: CNavItem,
        name: "Navs & Tabs",
        to: "/base/navs",
      },
      {
        component: CNavItem,
        name: "Pagination",
        to: "/base/paginations",
      },
      {
        component: CNavItem,
        name: "Placeholders",
        to: "/base/placeholders",
      },
      {
        component: CNavItem,
        name: "Popovers",
        to: "/base/popovers",
      },
      {
        component: CNavItem,
        name: "Progress",
        to: "/base/progress",
      },
      {
        component: CNavItem,
        name: "Spinners",
        to: "/base/spinners",
      },
      {
        component: CNavItem,
        name: "Tables",
        to: "/base/tables",
      },
      {
        component: CNavItem,
        name: "Tooltips",
        to: "/base/tooltips",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Buttons",
    to: "/buttons",
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Buttons",
        to: "/buttons/buttons",
      },
      {
        component: CNavItem,
        name: "Buttons groups",
        to: "/buttons/button-groups",
      },
      {
        component: CNavItem,
        name: "Dropdowns",
        to: "/buttons/dropdowns",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Forms",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Form Control",
        to: "/forms/form-control",
      },
      {
        component: CNavItem,
        name: "Select",
        to: "/forms/select",
      },
      {
        component: CNavItem,
        name: "Checks & Radios",
        to: "/forms/checks-radios",
      },
      {
        component: CNavItem,
        name: "Range",
        to: "/forms/range",
      },
      {
        component: CNavItem,
        name: "Input Group",
        to: "/forms/input-group",
      },
      {
        component: CNavItem,
        name: "Floating Labels",
        to: "/forms/floating-labels",
      },
      {
        component: CNavItem,
        name: "Layout",
        to: "/forms/layout",
      },
      {
        component: CNavItem,

        name: "Validation",
        to: "/forms/validation",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Charts",
    to: "/charts",
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
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
  {
    component: CNavItem,
    name: "Widgets",
    to: "/widgets",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavTitle,
    name: "Extras",
  },
  {
    component: CNavGroup,
    name: "Pages",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Login",
        to: "/login",
      },
      {
        component: CNavItem,
        name: "Register",
        to: "/register",
      },
      {
        component: CNavItem,
        name: "Error 404",
        to: "/404",
      },
      {
        component: CNavItem,
        name: "Error 500",
        to: "/500",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Docs",
    href: "https://coreui.io/react/docs/templates/installation/",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
