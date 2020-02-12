import React, {useState} from 'react';

export const AuthContext = React.createContext({
    isAuthenticated: false,
    login: ()=>{}
});

const AuthProvider = (props)=>{
    const [isAuth, setIsAuth] = useState(false);
    const loginHandler = ()=>{
        setIsAuth(true);
    };

    return(
        <AuthContext.Provider value={
            {
                isAuthenticated: isAuth,
                login: loginHandler
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )    
}

export default AuthProvider;