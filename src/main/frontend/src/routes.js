import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const CalendarBoard = React.lazy(() =>
  import("./views/Calendar/CalendarBoard")
);
const Attend_Input = React.lazy(() =>
  import("./views/Attend_Manage/Attend_Manage/Attend_Input")
);
const Attend_Record = React.lazy(() =>
  import("./views/Attend_Manage/Attend_Manage/Attend_Record")
);
const PointShop = React.lazy(() => import("./views/PointShop/PointShop"));
const MainItemDtl = React.lazy(() => import("./views/PointShop/MainItemDtl"));
const CartPage = React.lazy(() => import("./views/PointShop/CartPage"));
// Base
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Paginations")
);
const Placeholders = React.lazy(() =>
  import("./views/base/placeholders/Placeholders")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const Progress = React.lazy(() => import("./views/base/progress/Progress"));
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
const Tables = React.lazy(() => import("./views/base/tables/Tables"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));

// Buttons
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Dropdowns = React.lazy(() =>
  import("./views/buttons/dropdowns/Dropdowns")
);

//Forms
const ChecksRadios = React.lazy(() =>
  import("./views/forms/checks-radios/ChecksRadios")
);
const FloatingLabels = React.lazy(() =>
  import("./views/forms/floating-labels/FloatingLabels")
);
const FormControl = React.lazy(() =>
  import("./views/forms/form-control/FormControl")
);
const InputGroup = React.lazy(() =>
  import("./views/forms/input-group/InputGroup")
);
const Layout = React.lazy(() => import("./views/forms/layout/Layout"));
const Range = React.lazy(() => import("./views/forms/range/Range"));
const Select = React.lazy(() => import("./views/forms/select/Select"));
const Validation = React.lazy(() =>
  import("./views/forms/validation/Validation")
);
const Charts = React.lazy(() => import("./views/charts/Charts"));

//Map(Vacation)
//Map에 대한 변수에 대한 경로를 지정해 import
const Map = React.lazy(() => import("./views/Vacation/Map"));

//Chat
const Chat = React.lazy(() => import("./views/Chatting/Chat"));
const SendMessage = React.lazy(() => import("./views/Chatting/SendMessage"));

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

const staffManagement = React.lazy(() =>
  import("./views/staff/StaffManagement")
);

const TimeManagementSystem = React.lazy(() =>
  import("./views/TimeManagementSystem/TimeManagementSystem")
);
const PayManagementSystemCalculator = React.lazy(() =>
  import("./views/PayManagementSystem/PayManagementSystemCalculator")
);
const PayManagementSystemManagement = React.lazy(() =>
  import("./views/PayManagementSystem/PayManagementSystemManagement")
);
const BulletinBoard = React.lazy(() =>
  import("./views/BulletinBoard/BulletinBoard")
);
const BulletinBoardPages = React.lazy(() =>
  import("./views/BulletinBoard/BulletinBoardPages")
);
// ========================================================
// ========================================================
// ========================================================
// ========================================================

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
  { path: "/calendar", name: "근무일정", element: CalendarBoard },
  {
    path: "/attend_manage/attendInput",
    name: "출결 입력",
    element: Attend_Input,
  },
  {
    path: "/attend_manage/attendRecord",
    name: "출결 기록",
    element: Attend_Record,
  },
  {
    path: "/point_shop/point_shop",
    name: "포인트샵",
    element: PointShop,
  },
  {
    path: "/point_shop/point_shop/:id",
    name: "제품 상세정보",
    element: MainItemDtl,
  },
  {
    path: "/point_shop/point_shop/cart_page",
    name: "장바구니",
    element: CartPage,
  },
  //해당 경로에 있는 요소 map을 import해서 route로 지정?
  //react는 잘 모르겠다
  { path: "/Vacation/Map", name: "휴가일정", element: Map },

  { path: "/Chatting/Chat", name: "사내 메신저", element: Chat },
  {
    path: "/chat/room/enter/:roomId",
    name: "채팅보내기",
    element: SendMessage,
  },

  { path: "/base", name: "Base", element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: Accordion },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", element: Breadcrumbs },
  { path: "/base/cards", name: "Cards", element: Cards },
  { path: "/base/carousels", name: "Carousel", element: Carousels },
  { path: "/base/collapses", name: "Collapse", element: Collapses },
  { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  { path: "/base/navs", name: "Navs", element: Navs },
  { path: "/base/paginations", name: "Paginations", element: Paginations },
  { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  { path: "/base/popovers", name: "Popovers", element: Popovers },
  { path: "/base/progress", name: "Progress", element: Progress },
  { path: "/base/spinners", name: "Spinners", element: Spinners },
  { path: "/base/tables", name: "Tables", element: Tables },
  { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    element: ButtonGroups,
  },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/forms", name: "Forms", element: FormControl, exact: true },
  { path: "/forms/form-control", name: "Form Control", element: FormControl },
  { path: "/forms/select", name: "Select", element: Select },
  {
    path: "/forms/checks-radios",
    name: "Checks & Radios",
    element: ChecksRadios,
  },
  { path: "/forms/range", name: "Range", element: Range },
  { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  {
    path: "/forms/floating-labels",
    name: "Floating Labels",
    element: FloatingLabels,
  },
  { path: "/forms/layout", name: "Layout", element: Layout },
  { path: "/forms/validation", name: "Validation", element: Validation },
  // { path: '/employee/EmployeeManagement', exact: true, name: 'Icons', element: CoreUIIcons },
  //{ path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  //{ path: '/icons/flags', name: 'Flags', element: Flags },
  //{ path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    element: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  { path: "/notifications/badges", name: "Badges", element: Badges },
  { path: "/notifications/modals", name: "Modals", element: Modals },
  { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  { path: "/widgets", name: "Widgets", element: Widgets },

  {
    path: "/staff/staffManagement",
    name: "staff",
    element: staffManagement,
  },
  {
    path: "/TimeManagementSystem/TimeManagementSystem",
    name: "TimeManagementSystem",
    element: TimeManagementSystem,
  },
  {
    path: "/PayManagementSystem/PayManagementSystemCalculator",
    name: "PayManagementSystemCalculator",
    element: PayManagementSystemCalculator,
  },
  {
    path: "/PayManagementSystem/PayManagementSystemManagement",
    name: "PayManagementSystemManagement",
    element: PayManagementSystemManagement,
  },
  {
    path: "/BulletinBoard/BulletinBoard",
    name: "BulletinBoard",
    element: BulletinBoard,
  },
  {
    path: "/BulletinBoard/BulletinBoardPages",
    name: "BulletinBoardPages",
    element: BulletinBoardPages,
  },
];

export default routes;
