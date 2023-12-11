import { Navigate, Outlet } from 'react-router-dom';

import { useUserState } from '../hooks/Context';

const PrivateRoute = () => {
  const { user } = useUserState();

  return (
    user && user.status === 'success' ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  );
};

export default PrivateRoute;
