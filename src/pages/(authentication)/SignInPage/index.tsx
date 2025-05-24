import useUser from "@/hooks/states/useUser";
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
        <div className="relative h-[50vh] bg-blue-500">
          <div className="relative flex h-[60%] flex-col items-center justify-center px-5 text-center text-white">
            <img
              src="/images/white_logo.png"
              alt="Logo"
              className="mb-4 h-16 w-16"
            />
            <h1 className="text-3xl font-bold md:text-5xl">Sign in to your</h1>
            <h1 className="text-3xl font-bold md:text-5xl">Account</h1>
            <p className="pt-4 text-lg md:text-xl">
              Enter your email and password
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-card absolute top-3/4 left-1/2 w-5/6 -translate-x-1/2 transform rounded-2xl p-6 shadow-lg md:w-4/5 md:p-12 lg:w-3/5">
            <div className="mb-4 md:mb-8">
              <label htmlFor="email" className="mb-2 block text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4 md:mb-8">
              <label htmlFor="password" className="mb-2 block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4 flex items-center justify-between md:mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
              className={`w-full rounded-md px-4 py-2 font-medium text-white ${
                isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <div className="mt-4 flex items-center justify-center md:mt-8">
              <span className="text-gray-700">Don't have an account?</span>
              <button
                onClick={() => navigate("/signup")}
                className="ml-2 font-bold text-blue-500 hover:text-blue-700"
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
