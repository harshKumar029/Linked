import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'

const LandingPage = () => {
    const navigate = useNavigate(); 
    return (
        <div>
            <nav className="bg-[#181818] shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">

                    {/* Logo Section */}
                    <div className=" w-28">
                        <img onClick={()=> navigate('/')} src={Logo} alt='Logo'/>
                    </div>

                    {/* Center Links */}
                    <div className="hidden md:flex space-x-8 text-gray-600">
                        <a href="#feature" className="hover:text-indigo-600">Feature</a>
                        <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
                        <a href="#solution" className="hover:text-indigo-600">Solution</a>
                        <a href="#support" className="hover:text-indigo-600">Support</a>
                    </div>

                    {/* Right Section - Login & Signup */}
                    <div className="flex space-x-4">
                        <p onClick={()=> navigate('/login')} className="px-4 py-2 bg-indigo-600  cursor-pointer  text-white rounded hover:bg-indigo-700">Login</p>
                        <p onClick={()=> navigate('/signup')} className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded hover:bg-indigo-700">
                            Signup
                        </p>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default LandingPage
