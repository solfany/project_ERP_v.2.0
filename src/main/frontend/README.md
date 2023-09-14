## 파이널 프로젝트
```
frontend
├─ .DS_Store
├─ jest.config.js
├─ jsconfig.json
├─ LICENSE
├─ migration.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ %PUBLIC_URL%
│  ├─ favicon.ico
│  ├─ index.html
│  └─ manifest.json
├─ README.md
└─ src
   ├─ .DS_Store
   ├─ App.js
   ├─ App.test.js
   ├─ assets
   │  ├─ brand
   │  │  ├─ logo-negative.js
   │  │  ├─ logo.js
   │  │  └─ sygnet.js
   │  └─ images
   │     ├─ angular.jpg
   │     ├─ avatars
   │     │  ├─ 1.jpg
   │     │  ├─ 2.jpg
   │     │  ├─ 3.jpg
   │     │  ├─ 4.jpg
   │     │  ├─ 5.jpg
   │     │  ├─ 6.jpg
   │     │  ├─ 7.jpg
   │     │  ├─ 8.jpg
   │     │  ├─ 9.jpg
   │     │  ├─ 솔비.jpg
   │     │  ├─ 솔비원본.jpg
   │     │  └─ 준이.jpg
   │     ├─ react.jpg
   │     └─ vue.jpg
   ├─ components
   │  ├─ AppBreadcrumb.js
   │  ├─ AppContent.js
   │  ├─ AppFooter.js
   │  ├─ AppHeader.js
   │  ├─ AppSidebar.js
   │  ├─ AppSidebarNav.js
   │  ├─ axios.js
   │  ├─ Button
   │  │  ├─ Button.css
   │  │  └─ CustomButton.js
   │  ├─ DocsCallout.js
   │  ├─ DocsExample.js
   │  ├─ DocsLink.js
   │  ├─ FileUpload.js
   │  ├─ GetUserInfo.js
   │  ├─ header
   │  │  ├─ AppHeaderDropdown.js
   │  │  └─ index.js
   │  ├─ index.js
   │  ├─ ProtectedRoute.js
   │  └─ UserProfile.js
   ├─ index.js
   ├─ layout
   │  └─ DefaultLayout.js
   ├─ redux
   │  └─ authSlice.js
   ├─ reportWebVitals.js
   ├─ routes.js
   ├─ scss
   │  ├─ style.scss
   │  ├─ _custom.scss
   │  ├─ _example.scss
   │  ├─ _layout.scss
   │  └─ _variables.scss
   ├─ setupTests.js
   ├─ store.js
   ├─ views
   │  ├─ Attend_Manage
   │  │  ├─ Attend_Button.js
   │  │  ├─ Attend_Input.css
   │  │  ├─ Attend_Input.js
   │  │  ├─ Attend_Record.js
   │  │  ├─ Timer.css
   │  │  └─ Timer.js
   │  ├─ BulletinBoard
   │  │  ├─ BulletinBoard.js
   │  │  ├─ BulletinBoardComment.js
   │  │  ├─ BulletinBoardHashTag.js
   │  │  ├─ BulletinBoardModal.js
   │  │  ├─ BulletinBoardPages.js
   │  │  ├─ BulletinBoardPagesEdit.js
   │  │  ├─ css
   │  │  │  ├─ BulletinBoard.css
   │  │  │  ├─ BulletinBoardComment.css
   │  │  │  ├─ BulletinBoardHashTag.css
   │  │  │  └─ LikeHeartBtn.css
   │  │  ├─ FormattedDate.js
   │  │  ├─ HashTagCustom.js
   │  │  ├─ LikeHeartBtn.js
   │  │  └─ UpdatePostCount.js
   │  ├─ Calendar
   │  │  ├─ Calendar
   │  │  │  ├─ calendar.css
   │  │  │  ├─ events.js
   │  │  │  └─ MyCalendar.js
   │  │  ├─ CalendarBoard.js
   │  │  └─ CalendarModal
   │  │     ├─ modal.css
   │  │     └─ RunModal.js
   │  ├─ Chatting
   │  │  ├─ Chat.css
   │  │  ├─ Chat.js
   │  │  ├─ SendMessage.js
   │  │  ├─ SignIn.js
   │  │  └─ Signout.js
   │  ├─ dashboard
   │  │  └─ Dashboard.js
   │  ├─ login
   │  │  ├─ Login.js
   │  │  └─ ProfileEdit.js
   │  ├─ pages
   │  │  ├─ page404
   │  │  │  └─ Page404.js
   │  │  ├─ page500
   │  │  │  └─ Page500.js
   │  │  └─ register
   │  │     └─ Register.js
   │  ├─ PayManagementSystem
   │  │  ├─ calc.css
   │  │  ├─ DownBtn
   │  │  ├─ DownBtn.css
   │  │  ├─ DownloadButton.js
   │  │  ├─ Employee.js
   │  │  ├─ EmployeeModal.js
   │  │  ├─ encodedFontData.js
   │  │  ├─ inputNumberFormat.js
   │  │  ├─ PayExplanation.json
   │  │  ├─ PayManagementSystemCalculator.js
   │  │  ├─ PayManagementSystemManagement.js
   │  │  ├─ Pdf.js
   │  │  └─ YourStyle.css
   │  ├─ PointShop
   │  │  ├─ MainItems.css
   │  │  ├─ MainItems.js
   │  │  ├─ Page
   │  │  │  ├─ Cart
   │  │  │  │  ├─ CartPage.css
   │  │  │  │  └─ CartPage.js
   │  │  │  ├─ Dtl
   │  │  │  │  ├─ MainItemDtl.css
   │  │  │  │  └─ MainItemDtl.js
   │  │  │  ├─ Form
   │  │  │  │  └─ PointShopForm.js
   │  │  │  ├─ Management
   │  │  │  │  ├─ ManagementItemPage.js
   │  │  │  │  ├─ MoreItem.css
   │  │  │  │  └─ MoreItem.js
   │  │  │  └─ Order
   │  │  │     ├─ DeleteIcon.css
   │  │  │     ├─ DeleteIcon.js
   │  │  │     ├─ OrderListPage.css
   │  │  │     └─ OrderListPage.js
   │  │  ├─ PointShop.css
   │  │  ├─ PointShop.js
   │  │  ├─ PointShopNav.css
   │  │  └─ PointShopNav.js
   │  ├─ staff
   │  │  └─ StaffManagement.js
   │  ├─ theme
   │  │  ├─ colors
   │  │  │  └─ Colors.js
   │  │  └─ typography
   │  │     └─ Typography.js
   │  ├─ TimeManagementSystem
   │  │  ├─ CarComponent.css
   │  │  ├─ CarComponent.js
   │  │  ├─ CountWeekdays.js
   │  │  ├─ css
   │  │  ├─ css.css
   │  │  ├─ listStyle.css
   │  │  ├─ TableToExcel.js
   │  │  ├─ TimeManagementSystem.js
   │  │  └─ TotalExcel.js
   │  └─ Vacation
   │     ├─ Map.css
   │     ├─ Map.js
   │     ├─ MapArray.js
   │     └─ VacationModal.js
   └─ _nav.js

```