import { createContext, useState, useContext, useEffect } from 'react';

const Auth = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(undefined);
    useEffect(() => {
        let storedToken = JSON.parse(localStorage.getItem('token'))
        setAuth(storedToken);
    }, []);

    const updateAuth = (newValue) => {
        setAuth(newValue);
        localStorage.setItem("token", JSON.stringify(newValue));
    }

    const logout = () => {
        localStorage.removeItem("token");
        setAuth(null);
    }

    return (
        <Auth.Provider value={{ auth, updateAuth, logout }}>
            {children}
        </Auth.Provider>
    );
};

const useAuth = () => {
    return useContext(Auth);
}

export { Auth, useAuth, AuthProvider };