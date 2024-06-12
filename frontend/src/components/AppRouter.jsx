import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/index";


const AppRouter = () => {
    const token = localStorage.getItem('accessToken');
    const location = useLocation();
    return(
        token
            ?
                <Routes>

                        {privateRoutes.map(route =>
                            <Route
                                element={route.element}
                                path={route.path}
                                exact={route.exact}
                                key = {route.path}
                            />
                        )}

                    { <Route
                        path="*"
                        element={<Navigate to="/" state={{from: location}} replace />}
                    /> }
                </Routes>
            :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            element={route.element}
                            exact={route.exact}
                            path={route.path}
                            key = {route.path}
                        />)}
                    <Route
                        path="*"
                        element={<Navigate to="/login" state={{from: location}} replace />}
                    />
                </Routes>
    )

}

export default AppRouter;