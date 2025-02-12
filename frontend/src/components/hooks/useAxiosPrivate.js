import React, {useEffect} from 'react';
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import {axiosPrivate} from "../../api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { isAuth } = useAuth();
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                    const prevRequest = error?.config;
                    if (error?.response?.status === 401 && !prevRequest?.sent){
                        prevRequest.sent = true;
                        const { newAccessToken, newRefreshToken }  = await refresh();
                        prevRequest.headers['Authorization']  = `Bearer ${newAccessToken}`;
                        prevRequest.headers['token']  = newRefreshToken;
                        return axiosPrivate(prevRequest);
                    }
                    return Promise.reject(error);
            }
        );

        return() => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [isAuth, refresh])
    return axiosPrivate;
};

export default useAxiosPrivate;