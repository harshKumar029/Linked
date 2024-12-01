import React, { useState } from 'react';
import loginimg from '../assets/loginimg.svg';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../utility/ApiService"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const [visibility, setVisibility] = useState({
        password: false,
        confirmPassword: false,

    });

    const togglePasswordVisibility = (field) => {
        setVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    // Password requirements
    const passwordCriteria = [
        { text: 'At least 8 characters', valid: password.length >= 8 },
        { text: 'At least one number (0-9) or symbol', valid: /[0-9!@#$%^&*]/.test(password) },
        { text: 'Lowercase (a-z) and uppercase (A-Z)', valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    ];


    const handalsubmit = async (e) => {
        e.preventDefault();
            // Check if all criteria are valid
    const allValid = passwordCriteria.every((criteria) => criteria.valid);

    if (!allValid) {
        alert("Please ensure all password criteria are met before submitting.");
        return; 
    }
    if(password != confirmPassword){
        alert("The passwords you entered do not match. Please try again.");
        return; 
    }
        try {
            const response = await registerUser({username:username, email:email, password:password});
            if (response.status === 'success') {
                // navigate('/login')
                console.log(response)
              } else {
                console.log(response.message);
              }
              console.log(response)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex h-screen">

            {/* <div className=' bg-[#925FE2] w-2/3 relative flex justify-end'> */}
            <div
                className="bg-[#925FE2] w-2/3 hidden lgg:block relative bg-no-repeat bg-right  min-h-screen bg-contain"
                style={{
                    backgroundImage: `url(${loginimg})`,
                }}
            >
                <div className=' space-y-8 pl-16 pt-16'>
                    <img className=" w-36" src={Logo} alt='logo' />
                    <div className='w-[29rem] space-y-2'>
                        <p className=' font-medium text-sm text-[#FDFCFF]'>Easy to Short your loooong boring url for professional purpose.</p>
                        <h3 className=' font-medium text-3xl  text-[#FDFCFF]'>Analyze your links and QR Codes as easily as creating them.</h3>
                    </div>
                    <button className=' bg-[#A176E6] text-[#FDFCFF] text-xl px-5 py-2 rounded-md'>Get a demo</button>
                </div>
                {/* <img src={loginimg} alt="Login Illustration" className="min-h-screen w-full md:w-[70%] lg:w-[80%] xl:w-auto object-contain" /> */}
            </div>

            <div className="lgg:w-1/3 w-full p-10 bg-black">
                <img className=" w-28 lgg:hidden" src={Logo} alt='logo' />

                <p className="text-right text-[#8997A6] my-4 font-medium text-xs">
                    Already a member? <span onClick={() => navigate('/Login')} className="text-[#BA7E7E] cursor-pointer">Sign in</span>
                </p>
                <h1 className="text-3xl text-[#BA7E7E] font-medium mt-4 mb-2">Sign up</h1>
                <p className="text-[#8997A6] font-medium text-sm mb-8">
                    Secure your Connection with mail
                </p>

                <form onSubmit={handalsubmit} className="space-y-6">
                    {/* Full Name Input */}
                    <div className="relative">
                        <svg className="absolute left-3 top-3 w-6 h-6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 13.125C12.5 12.2528 12.5 11.8167 12.3924 11.4618C12.15 10.6628 11.5247 10.0375 10.7257 9.79513C10.3708 9.6875 9.93475 9.6875 9.0625 9.6875H5.9375C5.06527 9.6875 4.62916 9.6875 4.27429 9.79513C3.47528 10.0375 2.85002 10.6628 2.60765 11.4618C2.5 11.8167 2.5 12.2528 2.5 13.125M10.3125 4.6875C10.3125 6.2408 9.05331 7.5 7.5 7.5C5.9467 7.5 4.6875 6.2408 4.6875 4.6875C4.6875 3.1342 5.9467 1.875 7.5 1.875C9.05331 1.875 10.3125 3.1342 10.3125 4.6875Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            className="logsign w-full pl-12 pr-4 py-3 border-b-2 text-[#8997A6] border-[#DEE2E6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
                            placeholder="Full Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        {/* <img src={conditionIcon} alt="Condition Icon" className="absolute right-3 top-3 w-6 h-6" /> */}
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="logsign w-full pl-12 pr-4 py-3 border-b-2 border-[#DEE2E6] text-[#8997A6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
                            placeholder="alex@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/* <img src={conditionIcon} alt="Condition Icon" className="absolute right-3 top-3 w-6 h-6" /> */}
                        <svg className="absolute left-3 top-3 w-6 h-6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 4.375L6.35306 7.94712C6.76631 8.23644 6.97294 8.38106 7.19769 8.43706C7.39619 8.48656 7.60381 8.48656 7.80231 8.43706C8.02706 8.38106 8.23369 8.23644 8.64694 7.94712L13.75 4.375M4.25 12.5H10.75C11.8001 12.5 12.3251 12.5 12.7262 12.2956C13.0791 12.1159 13.3659 11.8291 13.5456 11.4762C13.75 11.0751 13.75 10.5501 13.75 9.5V5.5C13.75 4.4499 13.75 3.92485 13.5456 3.52377C13.3659 3.17096 13.0791 2.88413 12.7262 2.70436C12.3251 2.5 11.8001 2.5 10.75 2.5H4.25C3.1999 2.5 2.67485 2.5 2.27377 2.70436C1.92096 2.88413 1.63413 3.17096 1.45436 3.52377C1.25 3.92485 1.25 4.4499 1.25 5.5V9.5C1.25 10.5501 1.25 11.0751 1.45436 11.4762C1.63413 11.8291 1.92096 12.1159 2.27377 12.2956C2.67485 12.5 3.1999 12.5 4.25 12.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>



                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={visibility.password ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="logsign w-full pl-12 pr-4 py-3 border-b-2 border-[#DEE2E6] text-[#8997A6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
                            placeholder="Enter Strong Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <img src={conditionIcon} alt="Condition Icon" className="absolute right-3 top-3 w-6 h-6" /> */}
                        <svg className="absolute left-3 top-3 w-6 h-6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.75 6.875V5.125C13.75 4.42494 13.75 4.0749 13.6137 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54994 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42494 1.25 5.125V7.375C1.25 8.07506 1.25 8.42513 1.38624 8.6925C1.50608 8.92769 1.69731 9.11894 1.93251 9.23875C2.1999 9.375 2.54994 9.375 3.25 9.375H6.875M7.5 6.25H7.50313M10.625 6.25H10.6281M4.375 6.25H4.37813M12.0312 10.625V9.53125C12.0312 8.92719 11.5416 8.4375 10.9375 8.4375C10.3334 8.4375 9.84375 8.92719 9.84375 9.53125V10.625M7.65625 6.25C7.65625 6.33631 7.58631 6.40625 7.5 6.40625C7.41369 6.40625 7.34375 6.33631 7.34375 6.25C7.34375 6.16371 7.41369 6.09375 7.5 6.09375C7.58631 6.09375 7.65625 6.16371 7.65625 6.25ZM10.7812 6.25C10.7812 6.33631 10.7113 6.40625 10.625 6.40625C10.5387 6.40625 10.4688 6.33631 10.4688 6.25C10.4688 6.16371 10.5387 6.09375 10.625 6.09375C10.7113 6.09375 10.7812 6.16371 10.7812 6.25ZM4.53125 6.25C4.53125 6.33631 4.46129 6.40625 4.375 6.40625C4.28871 6.40625 4.21875 6.33631 4.21875 6.25C4.21875 6.16371 4.28871 6.09375 4.375 6.09375C4.46129 6.09375 4.53125 6.16371 4.53125 6.25ZM9.75 13.125H12.125C12.4751 13.125 12.6501 13.125 12.7838 13.0569C12.9014 12.9969 12.9969 12.9014 13.0569 12.7838C13.125 12.6501 13.125 12.4751 13.125 12.125V11.625C13.125 11.2749 13.125 11.0999 13.0569 10.9662C12.9969 10.8486 12.9014 10.7531 12.7838 10.6931C12.6501 10.625 12.4751 10.625 12.125 10.625H9.75C9.39994 10.625 9.22494 10.625 9.09125 10.6931C8.97362 10.7531 8.87806 10.8486 8.81813 10.9662C8.75 11.0999 8.75 11.2749 8.75 11.625V12.125C8.75 12.4751 8.75 12.6501 8.81813 12.7838C8.87806 12.9014 8.97362 12.9969 9.09125 13.0569C9.22494 13.125 9.39994 13.125 9.75 13.125Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <div onClick={() => togglePasswordVisibility('password')} className="absolute right-3 top-4 cursor-pointer">
                            {visibility.password ? (
                                <svg width="14" height="14" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00838 5.29709C0.951643 5.20721 0.923268 5.16229 0.907384 5.093C0.895455 5.04096 0.895455 4.95888 0.907384 4.90684C0.923268 4.83754 0.951643 4.79263 1.00838 4.70275C1.47731 3.96027 2.87308 2.08325 5.00017 2.08325C7.12725 2.08325 8.52304 3.96027 8.99196 4.70275C9.04871 4.79263 9.07708 4.83754 9.09296 4.90684C9.10488 4.95888 9.10488 5.04096 9.09296 5.093C9.07708 5.16229 9.04871 5.20721 8.99196 5.29709C8.52304 6.03959 7.12725 7.91659 5.00017 7.91659C2.87308 7.91659 1.47731 6.03959 1.00838 5.29709Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.00012 6.25C5.6905 6.25 6.25012 5.69037 6.25012 5C6.25012 4.30962 5.6905 3.75 5.00012 3.75C4.30975 3.75 3.75012 4.30962 3.75012 5C3.75012 5.69037 4.30975 6.25 5.00012 6.25Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.36129 2.1624C5.56775 2.12902 5.78067 2.11111 5.99999 2.11111C8.5929 2.11111 10.2944 4.6138 10.866 5.60378C10.9351 5.72361 10.9697 5.7835 10.9891 5.87594C11.0037 5.94533 11.0036 6.05483 10.9891 6.12422C10.9697 6.21661 10.9349 6.27694 10.8652 6.39756C10.7129 6.66117 10.4807 7.03172 10.1731 7.43361M3.32019 3.06391C2.22204 3.87872 1.47652 5.01078 1.13453 5.60294C1.06503 5.72328 1.03028 5.78344 1.01091 5.87583C0.996367 5.94522 0.996362 6.05467 1.0109 6.12411C1.03026 6.2165 1.06485 6.27639 1.13403 6.39622C1.70564 7.38622 3.40709 9.88889 5.99999 9.88889C7.04548 9.88889 7.94607 9.482 8.68605 8.93144M1.42877 1L10.5712 11M4.92255 4.82149C4.6468 5.12311 4.47626 5.53978 4.47626 6C4.47626 6.9205 5.15848 7.66667 5.99999 7.66667C6.42075 7.66667 6.80168 7.48011 7.07743 7.1785" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            )}
                        </div>

                    </div>

                    {/* Password Criteria */}
                    <div className="space-y-2">
                        {passwordCriteria.map((criteria, index) => (
                            <div key={index} className="flex items-center">
                                <p className=" mr-2">
                                    {criteria.valid ?
                                        (<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.16671 4.61896V5.00229C9.16621 5.90079 8.87525 6.77509 8.33725 7.49471C7.79929 8.21438 7.04308 8.74084 6.18146 8.99559C5.31979 9.25034 4.39891 9.21975 3.55607 8.90838C2.71324 8.597 1.99364 8.0215 1.50461 7.26775C1.01557 6.514 0.783286 5.62234 0.842406 4.72575C0.901523 3.82921 1.24888 2.97577 1.83266 2.29275C2.41644 1.60973 3.20537 1.13372 4.08179 0.935699C4.95821 0.737682 5.87516 0.828278 6.69587 1.19397M9.16671 1.66659L5.00004 5.83742L3.75004 4.58742" stroke="#79FF36" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        )
                                        : (<svg width="6" height="6" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 3C2.5523 3 3 2.5523 3 2C3 1.4477 2.5523 1 2 1C1.4477 1 1 1.4477 1 2C1 2.5523 1.4477 3 2 3Z" stroke="#B6BECF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                        )}
                                </p>
                                <span className="text-sm text-gray-600">{criteria.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative mt-4">
                        <input
                            type={visibility.confirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="logsign w-full pl-12 pr-4 py-3 border-b-2 border-[#DEE2E6] text-[#8997A6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {/* <img src={conditionIcon} alt="Condition Icon" className="absolute right-3 top-3 w-6 h-6" /> */}
                        <svg className="absolute left-3 top-3 w-6 h-6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.75 6.875V5.125C13.75 4.42494 13.75 4.0749 13.6137 3.80751C13.4939 3.57231 13.3027 3.38108 13.0675 3.26124C12.8001 3.125 12.4501 3.125 11.75 3.125H3.25C2.54994 3.125 2.1999 3.125 1.93251 3.26124C1.69731 3.38108 1.50608 3.57231 1.38624 3.80751C1.25 4.0749 1.25 4.42494 1.25 5.125V7.375C1.25 8.07506 1.25 8.42513 1.38624 8.6925C1.50608 8.92769 1.69731 9.11894 1.93251 9.23875C2.1999 9.375 2.54994 9.375 3.25 9.375H6.875M7.5 6.25H7.50313M10.625 6.25H10.6281M4.375 6.25H4.37813M12.0312 10.625V9.53125C12.0312 8.92719 11.5416 8.4375 10.9375 8.4375C10.3334 8.4375 9.84375 8.92719 9.84375 9.53125V10.625M7.65625 6.25C7.65625 6.33631 7.58631 6.40625 7.5 6.40625C7.41369 6.40625 7.34375 6.33631 7.34375 6.25C7.34375 6.16371 7.41369 6.09375 7.5 6.09375C7.58631 6.09375 7.65625 6.16371 7.65625 6.25ZM10.7812 6.25C10.7812 6.33631 10.7113 6.40625 10.625 6.40625C10.5387 6.40625 10.4688 6.33631 10.4688 6.25C10.4688 6.16371 10.5387 6.09375 10.625 6.09375C10.7113 6.09375 10.7812 6.16371 10.7812 6.25ZM4.53125 6.25C4.53125 6.33631 4.46129 6.40625 4.375 6.40625C4.28871 6.40625 4.21875 6.33631 4.21875 6.25C4.21875 6.16371 4.28871 6.09375 4.375 6.09375C4.46129 6.09375 4.53125 6.16371 4.53125 6.25ZM9.75 13.125H12.125C12.4751 13.125 12.6501 13.125 12.7838 13.0569C12.9014 12.9969 12.9969 12.9014 13.0569 12.7838C13.125 12.6501 13.125 12.4751 13.125 12.125V11.625C13.125 11.2749 13.125 11.0999 13.0569 10.9662C12.9969 10.8486 12.9014 10.7531 12.7838 10.6931C12.6501 10.625 12.4751 10.625 12.125 10.625H9.75C9.39994 10.625 9.22494 10.625 9.09125 10.6931C8.97362 10.7531 8.87806 10.8486 8.81813 10.9662C8.75 11.0999 8.75 11.2749 8.75 11.625V12.125C8.75 12.4751 8.75 12.6501 8.81813 12.7838C8.87806 12.9014 8.97362 12.9969 9.09125 13.0569C9.22494 13.125 9.39994 13.125 9.75 13.125Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <div onClick={() => togglePasswordVisibility('confirmPassword')} className="absolute right-3 top-4 cursor-pointer">
                            {visibility.confirmPassword ? (
                                <svg width="14" height="14" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00838 5.29709C0.951643 5.20721 0.923268 5.16229 0.907384 5.093C0.895455 5.04096 0.895455 4.95888 0.907384 4.90684C0.923268 4.83754 0.951643 4.79263 1.00838 4.70275C1.47731 3.96027 2.87308 2.08325 5.00017 2.08325C7.12725 2.08325 8.52304 3.96027 8.99196 4.70275C9.04871 4.79263 9.07708 4.83754 9.09296 4.90684C9.10488 4.95888 9.10488 5.04096 9.09296 5.093C9.07708 5.16229 9.04871 5.20721 8.99196 5.29709C8.52304 6.03959 7.12725 7.91659 5.00017 7.91659C2.87308 7.91659 1.47731 6.03959 1.00838 5.29709Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.00012 6.25C5.6905 6.25 6.25012 5.69037 6.25012 5C6.25012 4.30962 5.6905 3.75 5.00012 3.75C4.30975 3.75 3.75012 4.30962 3.75012 5C3.75012 5.69037 4.30975 6.25 5.00012 6.25Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.36129 2.1624C5.56775 2.12902 5.78067 2.11111 5.99999 2.11111C8.5929 2.11111 10.2944 4.6138 10.866 5.60378C10.9351 5.72361 10.9697 5.7835 10.9891 5.87594C11.0037 5.94533 11.0036 6.05483 10.9891 6.12422C10.9697 6.21661 10.9349 6.27694 10.8652 6.39756C10.7129 6.66117 10.4807 7.03172 10.1731 7.43361M3.32019 3.06391C2.22204 3.87872 1.47652 5.01078 1.13453 5.60294C1.06503 5.72328 1.03028 5.78344 1.01091 5.87583C0.996367 5.94522 0.996362 6.05467 1.0109 6.12411C1.03026 6.2165 1.06485 6.27639 1.13403 6.39622C1.70564 7.38622 3.40709 9.88889 5.99999 9.88889C7.04548 9.88889 7.94607 9.482 8.68605 8.93144M1.42877 1L10.5712 11M4.92255 4.82149C4.6468 5.12311 4.47626 5.53978 4.47626 6C4.47626 6.9205 5.15848 7.66667 5.99999 7.66667C6.42075 7.66667 6.80168 7.48011 7.07743 7.1785" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Submit Button and Separator */}
                    <div className="flex items-center pt-3 space-x-10">
                        <button
                            type="submit"
                            className="pl-10 pr-1  py-1 inline-flex gap-3 items-center text-white bg-[#4D5EFF] rounded-full font-medium hover:bg-blue-600 transition"
                        >
                            Sign Up
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16.5" cy="16.5" r="16.5" fill="#717EFF" />
                                <path d="M8 17H24M24 17L18 11M24 17L18 23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </button>
                        <span className="text-gray-400 font-medium">or</span>
                        <svg className=' cursor-pointer' width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8094 8.14946C15.8094 7.49394 15.7562 7.01559 15.6411 6.51953H8.15576V9.47819H12.5495C12.4609 10.2135 11.9826 11.3208 10.9195 12.0648L10.9046 12.1639L13.2714 13.9973L13.4353 14.0137C14.9412 12.6229 15.8094 10.5766 15.8094 8.14946Z" fill="#4285F4" />
                            <path d="M8.15571 15.945C10.3083 15.945 12.1153 15.2363 13.4353 14.0139L10.9195 12.065C10.2463 12.5345 9.3427 12.8623 8.15571 12.8623C6.04743 12.8623 4.25806 11.4716 3.6202 9.54932L3.5267 9.55726L1.06575 11.4618L1.03357 11.5513C2.34459 14.1556 5.03754 15.945 8.15571 15.945Z" fill="#34A853" />
                            <path d="M3.62023 9.54936C3.45193 9.0533 3.35453 8.52176 3.35453 7.97257C3.35453 7.42332 3.45193 6.89184 3.61138 6.39577L3.60692 6.29013L1.11514 4.35498L1.03361 4.39376C0.493273 5.47449 0.183228 6.68811 0.183228 7.97257C0.183228 9.25703 0.493273 10.4706 1.03361 11.5513L3.62023 9.54936Z" fill="#FBBC05" />
                            <path d="M8.15571 3.08269C9.65274 3.08269 10.6626 3.72934 11.2384 4.26974L13.4884 2.07286C12.1065 0.788397 10.3083 0 8.15571 0C5.03754 0 2.34459 1.78937 1.03357 4.39371L3.61134 6.39573C4.25806 4.47347 6.04743 3.08269 8.15571 3.08269Z" fill="#EB4335" />
                        </svg>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signup



// import React, { useState } from 'react';
// import loginimg from '../assets/loginimg.svg';
// import Logo from '../assets/logo.png';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios if you are using it

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         fullname: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [visibility, setVisibility] = useState({
//         password: false,
//         confirmPassword: false,
//     });
//     const navigate = useNavigate();

//     const togglePasswordVisibility = (field) => {
//         setVisibility((prevState) => ({
//             ...prevState,
//             [field]: !prevState[field],
//         }));
//     };

//     // Handle form input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Basic client-side validation
//         if (formData.password !== formData.confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }

//         try {
//             // Make POST request to the backend signup endpoint
//             const response = await axios.post('http://localhost:8000/api/auth/signup', formData);
            
//             // Handle response
//             if (response.status === 200) {
//                 // Navigate to login or dashboard page on successful signup
//                 navigate('/dashboard');
//             } else {
//                 alert('Signup failed.',response);
//             }
//         } catch (error) {
//             console.error('Error during signup:', error);
//             alert('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="flex h-screen">
//             {/* Left Section with image */}
//             <div
//                 className="bg-[#925FE2] w-2/3 hidden lgg:block relative bg-no-repeat bg-right min-h-screen bg-contain"
//                 style={{ backgroundImage: `url(${loginimg})` }}
//             >
//                 <div className="space-y-8 pl-16 pt-16">
//                     <img className="w-36" src={Logo} alt="logo" />
//                     <div className="w-[29rem] space-y-2">
//                         <p className="font-medium text-sm text-[#FDFCFF]">
//                             Easy to Short your loooong boring url for professional purpose.
//                         </p>
//                         <h3 className="font-medium text-3xl text-[#FDFCFF]">
//                             Analyze your links and QR Codes as easily as creating them.
//                         </h3>
//                     </div>
//                     <button className="bg-[#A176E6] text-[#FDFCFF] text-xl px-5 py-2 rounded-md">
//                         Get a demo
//                     </button>
//                 </div>
//             </div>

//             {/* Right Section with form */}
//             <div className="lgg:w-1/3 w-full p-10 bg-black">
//                 <img className="w-28 lgg:hidden" src={Logo} alt="logo" />
//                 <p className="text-right text-[#8997A6] my-4 font-medium text-xs">
//                     Already a member?{' '}
//                     <span onClick={() => navigate('/login')} className="text-[#BA7E7E] cursor-pointer">
//                         Sign in
//                     </span>
//                 </p>
//                 <h1 className="text-3xl text-[#BA7E7E] font-medium mt-4 mb-2">Sign up</h1>
//                 <p className="text-[#8997A6] font-medium text-sm mb-8">
//                     Secure your Connection with mail
//                 </p>

//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                     {/* Full Name Input */}
//                     <div className="relative">
//                         <input
//                             type="text"
//                             name="fullname"
//                             className="logsign w-full pl-12 pr-4 py-3 border-b-2 text-[#8997A6] border-[#DEE2E6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
//                             placeholder="Full Name"
//                             value={formData.fullname}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     {/* Email Input */}
//                     <div className="relative">
//                         <input
//                             type="email"
//                             name="email"
//                             className="logsign w-full pl-12 pr-4 py-3 border-b-2 text-[#8997A6] border-[#DEE2E6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
//                             placeholder="alex@gmail.com"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     {/* Password Input */}
//                     <div className="relative">
//                         <input
//                             type={visibility.password ? 'text' : 'password'}
//                             name="password"
//                             className="logsign w-full pl-12 pr-4 py-3 border-b-2 text-[#8997A6] border-[#DEE2E6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
//                             placeholder="Enter Strong Password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     {/* Confirm Password Input */}
//                     <div className="relative">
//                         <input
//                             type={visibility.confirmPassword ? 'text' : 'password'}
//                             name="confirmPassword"
//                             className="logsign w-full pl-12 pr-4 py-3 border-b-2 text-[#8997A6] border-[#DEE2E6] bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
//                             placeholder="Confirm Password"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     {/* Signup Button */}
//                     <button type="submit" className="w-full bg-[#BA7E7E] text-[#FDFCFF] text-xl py-3 rounded-md">
//                         Sign Up
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Signup;
