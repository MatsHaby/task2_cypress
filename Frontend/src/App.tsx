import './App.css'

import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';

import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import Register from './pages/Register';
import { UserStateProvider } from './context/UserStateContext';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <UserStateProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Wrapper />}>
              <Route element={<Dashboard />} path='/Dashboard' />
              <Route element={<ChangePassword />} path='/changepassword' />
            </Route>
          </Route>
          <Route element={<Login />} path='/' />
          <Route element={<Register />} path='/register' />
          <Route element={<h1>FINNS EJ</h1>} path='*' />
        </Routes>
      </Router>
    </UserStateProvider>
  );

}

export default App
