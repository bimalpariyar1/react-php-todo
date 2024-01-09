import "./App.css";
import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Login from "./views/auth/Login";
import Register from "views/auth/Register";
import Home from "views/app/Home";
import Todos from "views/app/Todos";
import AuthLayout from "layouts/AuthLayout";
import AppLayout from "layouts/AppLayout";

const ProtectedRoute = () => {
    const location = useLocation();

    const token = localStorage.getItem("token");
    if (!token) {
        return (
            <Navigate
                to="/auth/login"
                replace={true}
                state={{
                    path: location.pathname,
                }}
            />
        );
    }

    return <Outlet />;
};

function App() {
    useEffect(() => {
        const darkMode = localStorage.getItem("darkmode");

        if (!darkMode) {
            document.body.setAttribute("data-bs-theme", "dark");
        } else {
            document.body.setAttribute("data-bs-theme", darkMode === "ON" ? "dark" : "");
        }
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="todos" element={<Todos />} />
                    </Route>
                </Route>

                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
