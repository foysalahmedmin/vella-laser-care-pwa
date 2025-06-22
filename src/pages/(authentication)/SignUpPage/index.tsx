import { Button } from "@/components/ui/Button";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { cn } from "@/lib/utils";
import { fetchFilteredCities, signUp } from "@/services/auth.service";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

interface City {
  _id: string;
  name: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { setUser } = useUser();

  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [passwordView, setPasswordView] = useState(true);

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["filtered_cities"],
    queryFn: fetchFilteredCities,
  });

  const { mutateAsync, isLoading } = useMutation({ mutationFn: signUp });

  const handleRegister = async () => {
    try {
      if (
        !name ||
        !phone ||
        !address ||
        !email ||
        !password ||
        !city ||
        !postal
      ) {
        return toast.error(
          language.code === "en"
            ? "Please enter all fields"
            : "সমস্ত ক্ষেত্র পূরণ করুন",
        );
      }

      const userData = await mutateAsync({
        name,
        phone,
        address,
        email,
        role: "customer",
        password,
        city,
        postal,
      });

      setUser(userData);
      toast.success(
        language.code === "en"
          ? "Account created successfully!"
          : "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",
      );
      navigate("/login");
    } catch (error) {
      toast.error(
        language.code === "en"
          ? "An error occurred during registration"
          : "নিবন্ধন প্রক্রিয়ায় একটি ত্রুটি ঘটেছে",
      );
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col py-6">
      <div className="relative container">
        <Button
          onClick={() => navigate(-1)}
          className="self-start"
          variant="none"
          size="none"
        >
          <ArrowLeft className="text-white" size={24} />
        </Button>
      </div>
      <div className="bg-primary absolute inset-0 -z-10 h-1/2" />
      <div className="container flex flex-1 items-center justify-center">
        <div>
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center py-8">
              <img
                src="/logo-small-white.png"
                alt="Logo"
                className="h-16 w-16"
              />
              <h1 className="text-3xl font-bold text-white lg:text-5xl">
                {language.code === "en" ? "Sign Up" : "নিবন্ধন করুন"}
              </h1>

              <div className="flex items-center space-x-2 pt-4 pb-6">
                <p className="text-white">
                  {language.code === "en"
                    ? "Already have an account?"
                    : "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?"}
                </p>
                <Link
                  to="/auth/signin"
                  className="h-auto p-0 font-bold text-white underline"
                >
                  {language.code === "en" ? "Sign In" : "সাইন ইন করুন"}
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-card relative mx-auto w-full max-w-2xl space-y-4 rounded-2xl p-4 shadow-lg lg:p-8">
            <div className="space-y-4">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={cn(
                  "w-full rounded-full border px-4 py-2",
                  "focus-within:ring-primary focus-within:ring-2 focus-within:outline-none",
                )}
              >
                <option value="">
                  {language.code === "en" ? "Select City" : "শহর নির্বাচন করুন"}
                </option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>

              <input
                placeholder={language.code === "en" ? "Name" : "নাম"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  "w-full rounded-full border px-4 py-2",
                  "focus-within:ring-primary focus-within:ring-2 focus-within:outline-none",
                )}
              />

              <input
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

              <input
                placeholder={
                  language.code === "en"
                    ? "Enter your phone number"
                    : "আপনার ফোন নম্বর লিখুন"
                }
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={cn(
                  "w-full rounded-full border px-4 py-2",
                  "focus-within:ring-primary focus-within:ring-2 focus-within:outline-none",
                )}
              />

              <input
                placeholder={language.code === "en" ? "Address" : "ঠিকানা"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={cn(
                  "w-full rounded-full border px-4 py-2",
                  "focus-within:ring-primary focus-within:ring-2 focus-within:outline-none",
                )}
              />

              <input
                placeholder={language.code === "en" ? "Postal" : "পোস্টাল কোড"}
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
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
                  className="absolute top-1/2 right-2 -translate-y-1/2 transform"
                  onClick={() => setPasswordView(!passwordView)}
                >
                  {passwordView ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>

            <Button
              onClick={handleRegister}
              disabled={isLoading}
              className="primary w-full"
            >
              {isLoading
                ? language.code === "en"
                  ? "Creating account..."
                  : "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : language.code === "en"
                  ? "Sign Up"
                  : "নিবন্ধন করুন"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
