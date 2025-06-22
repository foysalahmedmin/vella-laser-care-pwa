import { Button } from "@/components/ui/Button";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { cn } from "@/lib/utils";
import { signIn } from "@/services/auth.service";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Signin() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(true);

  const { isLoading, mutateAsync } = useMutation({ mutationFn: signIn });
  const { setUser } = useUser();

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        return toast.error(
          language.code === "en"
            ? "Please enter email and password"
            : "ইমেইল ও পাসওয়ার্ড দিন",
        );
      }
      const response = await mutateAsync({ email, password });
      setUser(response);
      toast.success(
        language.code === "en" ? "Login Successful" : "লগইন সফল হয়েছে",
      );
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          language.code === "en" ? "Login Failed" : "লগইন ব্যর্থ হয়েছে",
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col py-6">
      <div className="bg-primary absolute inset-0 -z-10 h-1/2" />
      <div className="container flex flex-1 items-center justify-center">
        <div className="w-full">
          <div className="flex w-full flex-col">
            <div className="flex flex-col items-center justify-center py-8">
              <img
                src="/logo-small-white.png"
                alt="Logo"
                className="h-16 w-16"
              />
              <h1 className="text-3xl font-bold text-white lg:text-5xl">
                {language.code === "en"
                  ? "Sign In To Your Account"
                  : "সাইন ইন করুন"}
              </h1>

              <div className="flex items-center space-x-2 pt-4 pb-6">
                <p className="text-white">
                  {language.code === "en"
                    ? "Enter your email and password"
                    : "আপনার ইমেইল ও পাসওয়ার্ড লিখুন"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card relative mx-auto w-full max-w-2xl space-y-4 rounded-2xl p-4 shadow-lg lg:p-8">
            <div className="space-y-4">
              <input
                id="email"
                type="email"
                placeholder={
                  language.code === "en"
                    ? "Enter your email"
                    : "আপনার ইমেইল লিখুন"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full rounded-full border px-4 py-2",
                  "focus-within:ring-primary focus-within:ring-2 focus-within:outline-none",
                )}
              />
              <div
                className={cn(
                  "relative w-full rounded-full border px-4 py-2 pr-14",
                  "focus-within:ring-primary focus-within:ring-2 focus-within:outline-none",
                )}
              >
                <input
                  type={passwordView ? "password" : "text"}
                  placeholder={
                    language.code === "en"
                      ? "Enter your password"
                      : "আপনার পাসওয়ার্ড লিখুন"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 outline-none"
                />
                <Button
                  variant="none"
                  size="none"
                  shape="icon"
                  className="primary absolute top-1/2 right-2 -translate-y-1/2 transform"
                  onClick={() => setPasswordView(!passwordView)}
                >
                  {passwordView ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between md:mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="focus:ring-primary accent-primary text-primary h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="remember" className="ml-2 text-gray-700">
                  {language.code === "en" ? "Remember me" : "আমাকে মনে রাখুন"}
                </label>
              </div>
              <hr />
              <button className="text-primary hover:text-primary text-center">
                {language.code === "en"
                  ? "Forgot Password?"
                  : "পাসওয়ার্ড ভুলে গেছেন?"}
              </button>
            </div>

            <Button
              onClick={handleSignIn}
              disabled={isLoading}
              className="primary w-full"
            >
              {isLoading
                ? language.code === "en"
                  ? "Signing in..."
                  : "সাইন ইন হচ্ছে..."
                : language.code === "en"
                  ? "Sign In"
                  : "সাইন ইন করুন"}
            </Button>

            <div className="flex items-center justify-center">
              <span className="text-gray-700">
                {language.code === "en"
                  ? "Don't have an account?"
                  : "আপনার কি কোনো অ্যাকাউন্ট নেই?"}
              </span>
              <Link
                to="/auth/signup"
                className="text-primary ml-1 h-auto p-0 font-bold underline"
              >
                {language.code === "en" ? "Sign Up" : "সাইন আপ করুন"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
