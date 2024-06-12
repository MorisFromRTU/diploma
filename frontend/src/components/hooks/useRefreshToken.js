import useAuth from "./useAuth";
import axios from '../../api/axios';

const useRefreshToken = () => {

    const {isAuth, setIsAuth} = useAuth();
    
    const refresh = async () => {
        const accToken = localStorage.getItem("accessToken");
        const refToken = localStorage.getItem("refreshToken");

        if (!accToken || !refToken) {
            throw new Error("No token available.");
        }
       
        const response = await axios.get("/refresh", {
            headers: {
                token: refToken,
            }
                
        });
        const { accessToken, refreshToken } = response.data;
        setIsAuth(prev => {
            return {...prev, refreshToken: response.data.refreshToken, accessToken: response.data.accessToken}
        });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return response.data;
    }
return refresh;
}
export default useRefreshToken;
    /*const refresh = async () => {
        const response = await axios.get('/refresh',{
            withCredentials: true
        });
        setIsAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.refreshToken);
            return {...prev, refreshToken: response.data.refreshToken }
        });
        return response.data.refreshToken;
    }
    return refresh;
;*/

