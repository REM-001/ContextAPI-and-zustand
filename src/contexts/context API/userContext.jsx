import { createContext , useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children}) => {
    const [user, setUser] = useState({ msgLogin: '', isLog: false }); 

    const handleLogin = () => {
    setUser({
        msgLogin: 'Welcome you have Logged in Successfully Mostafa',
        isLog: true
    });
    };

    const handleLogout = () => {
    setUser({
        msgLogin: 'You have just disconnected',
        isLog: false
    });
    };

    const contextValues = {
        user,
        handleLogin,
        handleLogout,
    }


    return (
    <UserContext.Provider value={contextValues}>
        {children}
    </UserContext.Provider>
    )
}