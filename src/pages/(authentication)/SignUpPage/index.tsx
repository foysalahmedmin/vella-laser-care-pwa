import { Button } from "@/components/ui/Button";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { cn } from "@/lib/utils";
import { fetchFilteredCities, signUp } from "@/services/auth.service";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
  });

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
    <div className="bg-primary-500 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex h-3/5 flex-col">
          <Button
            onClick={() => navigate(-1)}
            className="mt-6 self-start"
            variant="ghost"
          >
            <ArrowLeft className="text-white" size={24} />
          </Button>

          <div className="flex flex-col items-center justify-center py-8">
            <img
              src="/assets/logo-white.png"
              alt="Logo"
              className="mb-4 h-16 w-16"
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
              <Button
                variant="link"
                onClick={() => navigate("/auth/")}
                className="h-auto p-0 font-bold text-white underline"
              >
                {language.code === "en" ? "Sign In" : "সাইন ইন করুন"}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative -top-32 mx-auto w-full max-w-2xl rounded-2xl bg-white p-4 shadow-lg lg:p-8">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={cn(
              "mb-4 w-full rounded-lg border p-3",
              "focus:ring-primary focus:ring-2 focus:outline-none",
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

          <Input
            placeholder={language.code === "en" ? "Name" : "নাম"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />

          <Input
            type="email"
            placeholder={
              language.code === "en" ? "Enter your email" : "আপনার ইমেইল লিখুন"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />

          <Input
            placeholder={
              language.code === "en"
                ? "Enter your phone number"
                : "আপনার ফোন নম্বর লিখুন"
            }
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4"
          />

          <Input
            placeholder={language.code === "en" ? "Address" : "ঠিকানা"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mb-4"
          />

          <Input
            placeholder={language.code === "en" ? "Postal" : "পোস্টাল কোড"}
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            className="mb-4"
          />

          <div className="relative mb-6">
            <Input
              type={passwordView ? "password" : "text"}
              placeholder={
                language.code === "en"
                  ? "Enter your password"
                  : "আপনার পাসওয়ার্ড লিখুন"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 transform"
              onClick={() => setPasswordView(!passwordView)}
            >
              {passwordView ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </div>

          <Button
            onClick={handleRegister}
            disabled={isPending}
            className="w-full py-3"
          >
            {isPending
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
  );
}
