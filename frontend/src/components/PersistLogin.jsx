import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";
const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {isAuth} = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () =>{
            try {
                await refresh();
            }catch (err){
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        !isAuth?.refreshToken ? verifyRefreshToken() : setIsLoading(false);
    },[])

    useEffect(()=>{
        console.log(`isLoading: ${isLoading}`)
        console.log(`token: ${JSON.stringify(isAuth?.refreshToken)}`)
    },[isLoading])
    return (
        <>
            {isLoading
            ? <p>Loading</p>
            : <Outlet />
            }
        </>
    );
};

export default PersistLogin;