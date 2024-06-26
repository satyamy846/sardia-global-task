import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    async function handleSendOTP(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/reset-password`, {
                email: email
            })
            console.log("Res", res);
            
            if(res){
                setLoading(false);
                toast.success("Email sent successfully!", {
                    position: "top-center"
                  });
                  navigate(`/update-password?email=${encodeURIComponent(email)}`);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error("Something went wrong!", {
                position: "top-center"
              });
            console.log(err);
        }
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSendOTP}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder='Enter your email...'
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? <Spinner/> : `Send OTP`}
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
            <ToastContainer/>
        </>
    )
}

export default ResetPassword;