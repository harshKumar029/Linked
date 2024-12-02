import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create the context
const AppContext = createContext();

// Custom hook to access the context
export const useAppContext = () => {
    return useContext(AppContext);
};

// AppContextProvider Component
export const AppContextProvider = ({ children }) => {
    // Sidebar states
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // On initial load, check sessionStorage for user data
        const storedUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
        setUser(storedUser);
    }, []);

    const updateuser = (userData) => {
        if(userData.token){
        // Save token in a secure cookie
        Cookies.set('authToken', userData.token, {
            secure: true, // Ensures it's only sent over HTTPS
            sameSite: 'Strict', // Prevent CSRF attacks
            expires: 2, // Expires in 7 days
        });
        sessionStorage.setItem('user', JSON.stringify(userData.user));
        setUser(userData.user);
        console.log("User logged in:", userData.user);
        }else{
            sessionStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            console.log("User logged in:", userData);
        }
    };

    // Logout function
    const logout = () => {
        Cookies.remove('authToken');
        sessionStorage.removeItem('user');
        setUser(null);
        console.log("User logged out");
    };

    // Provide all states and functions
    return (
        <AppContext.Provider
            value={{
                // Sidebar states
                isOpen,
                setIsOpen,
                isOpenProfile,
                setIsOpenProfile,
                // User states and actions
                user,
                updateuser,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
