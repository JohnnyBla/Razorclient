import './App.css';
import Footer from '../src/components/footerComponent';
import Home from './components/homeScreenComponent';
import ResetPass from './UserRegister/Resetpass';
import DispatchComponent from './accountComponents/dispatchComponent';
import PrivacyPolicy from './components/privacyPolicy';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../src/shared/context/auth-context';
import { useAuth } from '../src/shared/hooks/auth-hook';
import LoadReport from './accountComponents/components/LoadReportTable';
import ExpenseReport from './accountComponents/components/ExpenseReportTable';

function App() {
  const { token, login, logout, username, userid } = useAuth();

  const state = localStorage.getItem('user');

  let routes;
  if (state) {
    const stated = JSON.parse(state);
    const username = stated.username;
    const userid = stated.userid;
    routes = (
      <>
        <Route path='/' element={<DispatchComponent />} />
        <Route path='/FAQs' element={<PrivacyPolicy />} />
        <Route
          path='/Load-Report-Tables'
          element={<LoadReport info={username} data={token} uid={userid} />}
        />
        <Route
          path='/Expense-Report-Tables'
          element={<ExpenseReport info={username} data={token} uid={userid} />}
        />

        <Route
          path={`/Dashboard`}
          element={
            <DispatchComponent info={username} data={token} uid={userid} />
          }
        />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='*' element={<Navigate replace to='/' />} />
        <Route path='/' element={<Home />} />
        <Route path='/rdpassreset' element={<ResetPass />} />
      </>
    );
  }
  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
          username: username,
          userid: userid,
        }}
      >
        <BrowserRouter>
          <div className='vh-100 d-flex flex-column'>
            <Routes>{routes}</Routes>

            <Footer />
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
