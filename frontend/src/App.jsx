// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { loadCart } from './redux/cartSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage when app starts
    dispatch(loadCart());
  }, [dispatch]);

  return (
    <AuthProvider>
      <div>
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;
