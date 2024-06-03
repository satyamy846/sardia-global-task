import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    function checkRequiredFields(){
        console.log("check req");
        let errors = {};
        if(name.length === 0|| name.length === "") errors.name = "Name is required";
        if(email.length === 0|| email.length === "") errors.email = "Email is required";
        if(password.length === 0|| password.length === "") errors.password = "Password is required";
        console.log(errors);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    function validatePassword(password){
        // let passwordArr = password("");
        if(password.length <8){
            let errors = {};
            errors.message = "Password length must be atleast 8";
            setErrors(errors);
            return false;
        }
        let hasNumber = false;
        let hasCapital = false;

        for(let pass of password){
            if(pass >= 'A' && pass <='Z'){
                hasCapital = true;
            }

            if(pass >= '0' && pass<='9'){
                hasNumber = true;
            }
        }

        if(!hasNumber){
            let errors = {};
            errors.message = "Password must have atleast a number";
            setErrors(errors);
            return false;
        }

        if(!hasCapital){
            let errors = {};
            errors.message = "Password must have atleast a capital letter";
            setErrors(errors);
            return false;
        }
        return true;
    }

  async function handleSignup(e){
    e.preventDefault();
    setLoading(true);
    try{
      console.log("url --", import.meta.env.VITE_SERVER_BASE_URL);

      if(!checkRequiredFields()){
        return;
      }
      if(!validatePassword(password)){
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/signup`, {
        name: name,
        email: email,
        password: password
      },{withCredentials: true});

      console.log("response ---- ", response);
      if(response){
        setLoading(false);
        toast.success("Signed Up successfully !", {
            position: "top-center"
          });
        navigate("/login");
      }
    }
    catch(err){
      setLoading(false);
       console.log(err);
       toast.error("Something went wrong", {
        position: "top-center"
       })
    }
  }

  function handleNavigateToSignIn(){
    navigate("/login")
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignup}>
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Enter your name"
                //   required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
                {errors.name  && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>
            </div>
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
                  placeholder="Enter your email"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                //   required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
              </div>
              <div className="text-sm">
              <p>Already Signed In?</p>
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={handleNavigateToSignIn}>
                  Sign In
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               {loading ? <Spinner/> : `Sign Up`}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}