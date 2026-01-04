import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import Services from '../pages/services';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
