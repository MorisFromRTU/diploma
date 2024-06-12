import {createContext, useState} from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(null);
    return( 
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
