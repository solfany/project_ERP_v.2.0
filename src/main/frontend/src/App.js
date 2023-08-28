import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import ProtectedRoute from '../src/components/ProtectedRoute';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));


// const token = 'jwtSecretKey'; // 토큰을 받아온다면 여기에 실제 토큰을 넣어주세요
// const parts = token.split('.');
// const decodedHeader = JSON.parse(atob(parts[0]));
// const decodedPayload = JSON.parse(atob(parts[1]));

// console.log('Decoded Header:', decodedHeader);
// console.log('Decoded Payload:', decodedPayload);

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            {/* <Route path="/" element={<ProtectedRoute element={<DefaultLayout />} />} /> */}
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    );
  }
}

export default App;



// import React, { Component, Suspense } from 'react';
// import { HashRouter, Route, Routes } from 'react-router-dom';
// import './scss/style.scss';
// import ProtectedRoute from '../src/components/ProtectedRoute';

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// );

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// // Pages
// const Login = React.lazy(() => import('./views/login/Login'));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

// class App extends Component {
//   render() {
//     return (
//       <HashRouter>
//         <Suspense fallback={loading}>
//           <Routes>
//             <Route
//               path="/login"
//               name="Login Page"
//               element={<Login />}
//             />
//             <Route
//               exact
//               path="/register"
//               name="Register Page"
//               element={<Register />}
//             />
//             <Route
//               exact
//               path="/404"
//               name="Page 404"
//               element={<Page404 />}
//             />
//             <Route
//               exact
//               path="/500"
//               name="Page 500"
//               element={<Page500 />}
//             />
//             {/* 보호된 레이아웃과 페이지 */}
//             {/* <Route
//               path="*"
//               element={<ProtectedRoute element={<DefaultLayout />} />}
//             /> */}
//           </Routes>
//         </Suspense>
//       </HashRouter>
//     );
//   }
// }

// export default App;