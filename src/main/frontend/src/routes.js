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
const PointShop = React.lazy(() => import('./views/PointShop/PointShop'));
const MainItemDtl = React.lazy(() =>
  import('./views/PointShop/Page/Dtl/MainItemDtl')
const PointShop = React.lazy(() => import("./views/PointShop/PointShop"));
const MainItemDtl = React.lazy(() => import("./views/PointShop/MainItemDtl"));
const CartPage = React.lazy(() => import("./views/PointShop/CartPage"));
);
const CartPage = React.lazy(() =>
  import('./views/PointShop/Page/Cart/CartPage')
);
const OrderListPage = React.lazy(() =>
  import('./views/PointShop/Page/Order/OrderListPage')
);
const PointShopForm = React.lazy(() =>
  import('./views/PointShop/Page/Form/PointShopForm')
);
const ManagementItemPage = React.lazy(() =>
  import('./views/PointShop/Page/Management/ManagementItemPage')
);
const Dropdowns = React.lazy(() =>
  import('./views/buttons/dropdowns/Dropdowns')
);

//Forms
const ChecksRadios = React.lazy(() =>
  import('./views/forms/checks-radios/ChecksRadios')
);
const FloatingLabels = React.lazy(() =>
  import('./views/forms/floating-labels/FloatingLabels')
);
const FormControl = React.lazy(() =>
  import('./views/forms/form-control/FormControl')
);
const InputGroup = React.lazy(() =>
  import('./views/forms/input-group/InputGroup')
);
const Layout = React.lazy(() => import('./views/forms/layout/Layout'));
const Range = React.lazy(() => import('./views/forms/range/Range'));
const Select = React.lazy(() => import('./views/forms/select/Select'));
const Validation = React.lazy(() =>
  import('./views/forms/validation/Validation')
);
const Charts = React.lazy(() => import('./views/charts/Charts'));

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
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

const staffManagement = React.lazy(() =>
  import("./views/staff/StaffManagement")
);
const Login = React.lazy(() => import("./views/login/Login"));

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
const BulletinBoardPagesEdit = React.lazy(() =>
  import("./views/BulletinBoard/BulletinBoardPagesEdit")
);
// ========================================================
// ========================================================
// ========================================================
// ========================================================

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/calendar', name: '근무일정', element: CalendarBoard },
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
  {
    path: '/point_shop/point_shop/order_list',
    name: '주문목록',
    element: OrderListPage,
  },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  {
    path: '/point_shop/point_shop/form',
    name: '상품등록',
    element: PointShopForm,
  },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  {
    path: '/point_shop/point_shop/management_item_page',
    name: '상품관리',
    element: ManagementItemPage,
  },
  //해당 경로에 있는 요소 map을 import해서 route로 지정?
  //react는 잘 모르겠다
  { path: '/Vacation/Map', name: '휴가일정', element: Map },

  { path: '/Chatting/Chat', name: '사내 메신저', element: Chat },

  {
    path: "/staff/staffManagement",
    name: "staff",
    element: staffManagement,
  },
  {
    path: "/login/Login",
    name: "login",
    element: Login,
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
    path: "/BulletinBoard/BulletinBoardPages/:id",
    name: "BulletinBoardPages",
    element: BulletinBoardPages,
  },
  {
    path: "/BulletinBoard/BulletinBoardPagesEdit/:id",
    name: "BulletinBoardPages",
    element: BulletinBoardPagesEdit,
  },
];

export default routes;
