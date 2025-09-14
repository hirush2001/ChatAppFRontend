import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignupPage() {
    const [mobilenumber, setMobilenumber] = useState("");
    const [firsName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
   const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault(); 
        try {
            await axios.post(process.env.REACT_APP_BACKEND_URL + "/users",{
              mobilenumber:mobilenumber,
              firsName:firsName,
              lastName:lastName,
              password:password
            }

            )
          console.log("Registration Successful")
          toast.success("Registration Successful")
          navigate("/login")
        }
        catch (e) {
          console.error(e.response?.data?.message || "Registration Failed")
          toast.error("Registration Failed")
        }
        
    }
    return (
<div className="min-h-screen flex items-center justify-center bg-yellow-400">
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Signup ✨
    </h2>

    <form className="space-y-5">
      {/* Mobile Number */}
      <div>
        <input
          type="text"
          name="mobilenumber"
          placeholder="Mobile Number"
          onChange={(e) => setMobilenumber(e.target.value)}
          value={mobilenumber}
         className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
        />
      </div>

      {/* First Name */}
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firsName}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"        />
      </div>

      {/* Last Name */}
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"        />
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"        />
      </div>

      {/* Signup Button */}
      <button
        type="submit"
        onClick={handleSignup}
        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 shadow-lg transform hover:scale-105 transition-transform"
      >
        Register
      </button>
    </form>

    {/* Extra Links */}
    <p className="text-sm text-center text-gray-600 mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-purple-600 font-semibold hover:underline">
        Login
      </a>
    </p>
  </div>
</div>

    )
}