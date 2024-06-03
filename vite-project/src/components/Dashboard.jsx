import axios from "axios";
import Spinner from "./Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleLogout(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/logout`, );

            if (res) {
                setLoading(false);
                toast.success("Logged out successfully", {
                    position: "top-center"
                });
                navigate("/")
            }
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    return (
        <>

            <div className="flex justify-between items-center px-5 py-2">
            <div>Profile</div>
            <button
                className="bg-slate-700 rounded text-white px-3 py-2 text-sm :hover"
                onClick={(e) => handleLogout(e)}
            >{loading ? <Spinner /> : `Logout`}
            </button>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Dashboard;