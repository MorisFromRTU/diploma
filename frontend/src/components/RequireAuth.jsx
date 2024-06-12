import useAuth from "./hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";


const RequireAuth = () => {
    const {isAuth} = useAuth();
    const location = useLocation();
    return (
        isAuth?.email
            ? <Outlet />
            : <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default RequireAuth;