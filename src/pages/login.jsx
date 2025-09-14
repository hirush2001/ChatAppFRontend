/*
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [mobilenumber, setMobilenumber] = useState("");
    const navigate = useNavigate()


    async function handleLogin() {
        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/users/login",
                {mobilenumber: mobilenumber.trim(),
                    password: password.trim(), });
            console.log("Login Successful", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/chatbox");
        } catch (e) {
            if (e.response) {
                console.log("Cannot login:", e.response.data.message);
            } else {
                console.log("Login error:", e.message);
                
            }
        }
    
    
    }
    return (
        <div>
            <h2>Login</h2>
            
            <input
          type="text"
          name="mobilenumber"
          placeholder="Mobilenumber"
          onChange={(e) => setMobilenumber(e.target.value)}
          value={mobilenumber}
        /><br />
     
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        /><br />
        <button type="submit" onClick={handleLogin}>Login</button>
      
    
    </div>
    )
}
    
*/

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
        const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/users/login",
            {
              mobilenumber: mobilenumber.trim(),
              password: password.trim(),
            }
          );
          

      console.log("Login Successful", response.data);
      toast.success("Login Successful");
      localStorage.setItem("token", response.data.token);
      navigate("/hub");
    } catch (e) {
      if (e.response) {
        console.log("Cannot login:", e.response.data);
        toast.error("cannot login");
      } else {
        console.log("Login error:", e);
        toast.error("Login error");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-400">
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Login 🔑
    </h2>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="space-y-5"
    >
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

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 shadow-lg transform hover:scale-105 transition-transform"
      >
        Login
      </button>
    </form>

    {/* Extra Links */}
    <p className="text-sm text-center text-gray-600 mt-6">
      Don’t have an account?{" "}
      <a href="/signup" className="text-purple-600 font-semibold hover:underline">
        Sign up
      </a>
    </p>
  </div>
</div>

  
  );
}

