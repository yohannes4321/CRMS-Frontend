import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // For pop-up notifications

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    });
    const { id, token } = useParams(); // Extract user id and token from URL params
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const dataRequest = await fetch('http://localhost:8000/api/reset_password/' + id + '/' + token, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: data.password })
            });

            const dataResponse = await dataRequest.json();

            if (dataResponse.success) {
                toast.success(dataResponse.message);
                navigate('/login');
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("An error occurred while resetting the password.");
            console.error("Error during password reset:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500">
            <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Reset Password</h2>

                <form onSubmit={handleSubmit}>
                    {/* New Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-2xl">New Password:</label>
                        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter New Password"
                                value={data.password}
                                name="password"
                                required
                                onChange={handleOnChange}
                                className="w-full bg-transparent focus:outline-none text-gray-800"
                            />
                            <div
                                className="cursor-pointer ml-3 text-gray-600 hover:text-red-500 transition-all"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2 text-2xl">Confirm Password:</label>
                        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm New Password"
                                value={data.confirmPassword}
                                name="confirmPassword"
                                required
                                onChange={handleOnChange}
                                className="w-full bg-transparent focus:outline-none text-gray-800"
                            />
                            <div
                                className="cursor-pointer ml-3 text-gray-600 hover:text-red-500 transition-all"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold py-3 px-8 rounded-full w-full mt-4 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-500 transition-transform transform hover:scale-105"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
