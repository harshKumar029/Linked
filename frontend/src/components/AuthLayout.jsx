import React from 'react';
import SideBar from './SideBar';

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="fixed h-full z-[1000]">
                <SideBar />
            </div>
            
            <div className=" w-[100%] lg:w-[85%] md:w-[78%] ml-auto"> 
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
