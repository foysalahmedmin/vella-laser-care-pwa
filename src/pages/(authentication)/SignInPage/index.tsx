import useUser from "@/hooks/states/useUesr";
import { signIn } from "@/services/auth.service";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: signIn,
  });
  const { setUser } = useUser();

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        return toast.error("Please enter email and password");
      }
      const response = await mutateAsync({ email, password });
      await setUser(response);
      toast.success("Login Successful");
      setEmail("");
      setPassword("");
      navigate(response?.role === "customer" ? "/products" : "/parlor");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return toast.error(error.message);
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="h-[50vh] bg-blue-500 relative">
          <div className="h-[60%] flex flex-col justify-center items-center relative text-white text-center px-5">
            <img
              src="/images/white_logo.png"
              alt="Logo"
              className="w-16 h-16 mb-4"
            />
            <h1 className="text-3xl md:text-5xl font-bold">Sign in to your</h1>
            <h1 className="text-3xl md:text-5xl font-bold">Account</h1>
            <p className="text-lg md:text-xl pt-4">
              Enter your email and password
            </p>
          </div>

          {/* Form Section */}
          <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-6 md:p-12 w-5/6 md:w-4/5 lg:w-3/5 rounded-2xl">
            <div className="mb-4 md:mb-8">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 md:mb-8">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between items-center mb-4 md:mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
              <button className="text-blue-500 hover:text-blue-700">
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <div className="flex justify-center items-center mt-4 md:mt-8">
              <span className="text-gray-700">Don't have an account?</span>
              <button
                onClick={() => navigate("/signup")}
                className="ml-2 text-blue-500 font-bold hover:text-blue-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
