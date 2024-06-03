import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOTP] = useState();
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = decodeURIComponent(queryParams.get('email'));
    const navigate = useNavigate();

    async function handleUpdatePassword(e) {
        console.log("sss")
        e.preventDefault();
        try {
            console.log("email -- ", email);
            console.log("otp -- ", otp);
            console.log("password -- ", newPassword);

            const response = await axios.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/update-password`, {
                otp: otp,
                email: email,
                password: newPassword
            });
            console.log(response);
            if(response.status === 200){
                toast.success("Password updated successfully!", {
                    position: "top-center"
                  });
                  navigate("/login")
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong!", {
                position:"top-center"
            })
        }
    }

    return (
        <>
            {
                console.log("params - ", params, "location - ", location, "email = ", email)
            }
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleUpdatePassword}>
                    <div>
                            <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                                OTP
                            </label>
                            <div className="mt-2">
                                <input
                                    id="otp"
                                    // name="otp"
                                    type="number"
                                    placeholder='Enter your otp'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Enter your new password'
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default UpdatePassword;