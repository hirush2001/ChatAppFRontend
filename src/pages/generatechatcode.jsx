
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function GenCode() {
    const [email, setEmail] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleGenerateCode() {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/otp/otp",
                {
                    email: email,
                    
                } 
            );

            console.log("Your Code is:", response.data.otp);
            setGeneratedCode(response.data.otp); 
            toast.success("OTP sent to your email!");
            
                // Optional: navigate after a short delay
                setTimeout(() => navigate("/username"), 2000);
            
        } catch (e) {
            if (e.response) {
                console.log("Cannot Generate OTP:", e.response.data);
                toast.error(e.response.data?.message || "Cannot Generate OTP");
            } else {
                console.log("Generating error:", e);
                toast.error("Error while generating code");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-400">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Generate Chat Room Code
                </h1>

                {/* Email input */}
                
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />

                {/* Show generated code (Optional) */}
                {generatedCode && (
                    <div className="mb-4 p-3 text-center text-lg font-mono bg-gray-100 border border-gray-300 rounded-xl">
                        {generatedCode}
                    </div>
                )}

                {/* Button */}
                <button
                    onClick={handleGenerateCode}
                    disabled={loading}
                    className={`w-full mt-5 ${
                        loading ? "bg-gray-400" : "bg-black hover:bg-black"
                    } text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200`}
                >
                    {loading ? "Generating..." : "Generate Code"}
                </button>
            </div>
        </div>
    );
}
