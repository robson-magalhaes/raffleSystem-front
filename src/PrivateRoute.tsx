import { 
  //Navigate, 
  Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  };
  let token = isAuthenticated();
  
  return token ? <Outlet /> : location.href = '/login';
 // <Navigate to="/login" />
}

export default PrivateRoute;
