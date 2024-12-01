// import React, { useEffect } from 'react';
// import SideBar from './SideBar';
// import { useAppContext } from '../ContextApi';
// import { isAuthenticated } from '../utility/ApiService';

// const AuthLayout = ({ children }) => {
//         const { user } = useAppContext();
      
//         if (!isAuthenticated()) {
//           return <Navigate to="/login" />;
//         }
    
//     return (
//         <div className="flex">
//             <div className="fixed h-full z-[1000]">
//                 <SideBar />
//             </div>
            
//             <div className=" w-[100%] lg:w-[85%] md:w-[78%] ml-auto"> 
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default AuthLayout;

import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import { useAppContext } from '../ContextApi';
import { isAuthenticated } from '../utility/ApiService';
import Cookies from 'js-cookie';

const AuthLayout = ({ children }) => {
    const { user, logout } = useAppContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            if (!authStatus) {
                logout();
                navigate('/login');
            }
            setLoading(false);
        };

        checkAuth();
    }, [navigate, logout]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex">
            <div className="fixed h-full z-[1000]">
                <SideBar />
            </div>
            
            <div className="w-[100%] lg:w-[85%] md:w-[78%] ml-auto">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;

