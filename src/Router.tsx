import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/auth/Register";
import { Navigate, Outlet } from 'react-router-dom';
import { Login } from "./pages/auth/Login";
import { getCurrentUser } from "./utils/user";
import { Profile } from "./pages/Profile";

export function PrivateRoute() {
  const token = localStorage.getItem('token');

  return token && getCurrentUser() ? <Outlet /> : <Navigate to="/login" />;
}

export function AuthRoute() {
    const token = localStorage.getItem('token');
  
    return token && getCurrentUser() ? <Navigate to="/" /> : <Outlet />;
  }

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route element={<PrivateRoute />}>
                  <Route>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile/:id" element={<Profile />} />
                  </Route>
              </Route>
              <Route element={<AuthRoute />}>
                <Route>
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
              </Route>
            </Route>
        </Routes>
    )
}