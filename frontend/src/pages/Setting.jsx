import React, { useState } from "react";
import { useAppContext } from "../ContextApi";
import { updatename, userdetail, updatepassword, deleteuser } from "../utility/ApiService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { user, logout, updateuser } = useAppContext();
  const [userName, setuserName] = useState(user.username);
  const [currentpassword, setcurrentpassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Password requirements
  const passwordCriteria = [
    { text: "At least 8 characters", valid: password.length >= 8 },
    {
      text: "At least one number (0-9) or symbol",
      valid: /[0-9!@#$%^&*]/.test(password),
    },
    {
      text: "Lowercase (a-z) and uppercase (A-Z)",
      valid: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
  ];

  const handledeleteuser = async (e) => {

    const authToken = Cookies.get("authToken");
    if (!authToken) {
      alert("Error: Token not found in cookies");
      return;
    }
    const response = await deleteuser({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("response response",response)
    if (response.message === "User account deleted successfully.") {
    logout();
    navigate("/login");
    }
  };

  const UpdateUserName = async () => {

    if (userName !== user.username) {
      try {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          alert("Error: Token not found in cookies");
          return;
        }

        const response = await updatename(
          { username: userName },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === "success") {
          alert("UserName updated");
          try {
            const Getuserdetail = await userdetail({
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            });
            updateuser(Getuserdetail.data);
          } catch (error) {
            console.error(error);
          }
        } else if (response.response) {
          // Handle the error based on the response status
          switch (response.response.status) {
            case 400:
              alert("Bad request. Please check your input and try again.");
              break;
            case 401: {
              alert("Unauthorized. Please login again.");
              logout();
              navigate("/login");
              break;
            }
            case 403:
              alert(
                "Access forbidden. You do not have permission to access this resource."
              );
              break;
            case 404:
              alert(
                "Resource not found. The requested resource could not be found on the server."
              );
              break;
            case 500:
              alert("Internal server error. Please try again later.");
              break;
            case 502:
              alert(
                "Bad gateway. The server received an invalid response from the upstream server."
              );
              break;
            case 503:
              alert(
                "Service unavailable. The server is currently unable to handle the request. Please try again later."
              );
              break;
            case 504:
              alert(
                "Gateway timeout. The server did not receive a timely response from the upstream server."
              );
              break;
            default:
              alert(
                `An error occurred. Status code: ${response.response.status}`
              );
          }
        } else {
          alert("An unknown error occurred.");
        }
      } catch (error) {
        alert("An unexpected error occurred. Please try again.");
        console.error("Error occurred while logging in:", error);
      }
    } else {
      alert("Username is unchanged. No update needed.");
    }
  };

  const UpdatePassword = async () => {
    if (password != confirmPassword) {
      alert("Password do not match");
    }
    const allValid = passwordCriteria.every((criteria) => criteria.valid);

    if (!allValid) {
      alert("Please ensure all password criteria are met before submitting.");
      return;
    }
    if (password != confirmPassword) {
      alert("The passwords you entered do not match. Please try again.");
      return;
    }

    const authToken = Cookies.get("authToken");

    try {
      const response = await updatepassword(
        { currentpassword: currentpassword, password: password },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === "success") {
        alert("password updated");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-[95%] m-auto my-5 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#434343]">User Profile</h1>
      </div>

      {/* Display Name Section */}
      <div className="space-y-2 ">
        <h3 className="font-semibold text-[#434343]">Display Name</h3>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          className="logsign w-full p-2 border text-[#8997A6] border-gray-400 rounded bg-transparent focus:outline-none focus:border-blue-500 placeholder-[#495057] placeholder:font-medium"
          placeholder="Full Name"
          required
        />
        <button
          onClick={UpdateUserName}
          className="px-5 py-2 mt-2 bg-[#003C51] text-white rounded-lg flex items-center gap-3"
        >
          Update display name
        </button>
      </div>

      <div className="">
        <h3 className="text-xl font-semibold text-[#434343] mb-2">
          Email Address
        </h3>
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-semibold text-sm text-[#333333]">
                Email ID
              </th>
              <th className="p-3 text-left font-semibold text-sm text-[#333333]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition-all duration-200">
              <td className="p-3 text-sm text-[#555555]">
                harshanand029@gmail.com
              </td>
              {user.isVerified ? (
                <td className="p-3 text-sm text-green-500 font-semibold">
                  Verified
                </td>
              ) : (
                <td className="p-3 text-sm text-red-500 font-semibold">
                  Not Verified
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Security & Authentication Section */}
      <div className="space-y-4 ">
        <h3 className="text-xl font-semibold text-[#434343]">
          Security & Authentication
        </h3>
        <p className="text-sm text-[#8997A6]">Change password</p>
        <p className="text-xs text-[#8997A6]">
          You will be required to log in after changing your password.
        </p>

        {/* Password Change Form */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#434343]">
            Current password
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-400 rounded"
            value={currentpassword}
            onChange={(e) => setcurrentpassword(e.target.value)}
          />

          <label className="block text-sm font-medium text-[#434343]">
            New password
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-400 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Password Criteria */}
          <div className="space-y-2">
            {passwordCriteria.map((criteria, index) => (
              <div key={index} className="flex items-center">
                <p className=" mr-2">
                  {criteria.valid ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.16671 4.61896V5.00229C9.16621 5.90079 8.87525 6.77509 8.33725 7.49471C7.79929 8.21438 7.04308 8.74084 6.18146 8.99559C5.31979 9.25034 4.39891 9.21975 3.55607 8.90838C2.71324 8.597 1.99364 8.0215 1.50461 7.26775C1.01557 6.514 0.783286 5.62234 0.842406 4.72575C0.901523 3.82921 1.24888 2.97577 1.83266 2.29275C2.41644 1.60973 3.20537 1.13372 4.08179 0.935699C4.95821 0.737682 5.87516 0.828278 6.69587 1.19397M9.16671 1.66659L5.00004 5.83742L3.75004 4.58742"
                        stroke="#79FF36"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 4 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 3C2.5523 3 3 2.5523 3 2C3 1.4477 2.5523 1 2 1C1.4477 1 1 1.4477 1 2C1 2.5523 1.4477 3 2 3Z"
                        stroke="#B6BECF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </p>
                <span className="text-sm text-gray-600">{criteria.text}</span>
              </div>
            ))}
          </div>

          <label className="block text-sm font-medium text-[#434343]">
            Confirm new password
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-400 rounded"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={UpdatePassword}
            className="px-5  py-2 mt-4 bg-[#003C51] text-white rounded-lg flex  gap-3"
          >
            Change password
          </button>
        </div>
      </div>

      {/* Access History Section */}
      <div>
        {/* <h3 className="text-xl font-semibold text-[#434343]">Access History</h3>
        <p className="text-sm text-[#8997A6]">
          You're viewing recent activity on your account.
        </p> */}

        {/* <table className="w-full border-collapse border border-gray-300 mt-4 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-semibold text-sm text-[#333333]">Login Method</th>
              <th className="p-3 text-left font-semibold text-sm text-[#333333]">Location</th>
              <th className="p-3 text-left font-semibold text-sm text-[#333333]">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition-all duration-200">
              <td className="p-3 text-sm text-[#555555]">Log In With Google</td>
              <td className="p-3 text-sm text-[#555555]">(Advaya Global LLP) (IN, BR, Patna)</td>
              <td className="p-3 text-sm text-[#888888]">12 Nov 2024, 10:22 GMT+5:30</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-all duration-200">
              <td className="p-3 text-sm text-[#555555]">Log In With Google</td>
              <td className="p-3 text-sm text-[#555555]">(Bharti Airtel) (IN, BR, Patna)</td>
              <td className="p-3 text-sm text-[#888888]">11 Nov 2024, 10:35 GMT+5:30</td>
            </tr>
          </tbody>
        </table> */}
        <button onClick={handledeleteuser} className=" float-end mb-5 px-5 py-2 mt-4 bg-[#ac2b2b] text-white rounded-lg flex items-center gap-3">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Setting;
