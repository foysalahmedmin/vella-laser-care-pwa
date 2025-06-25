import { Button } from "@/components/ui/Button";
import { FormControl } from "@/components/ui/FormControl";
import useLanguage from "@/hooks/states/useLanguage";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ServiceManagePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedServices, setSelectedServices] = useState("");
  const [formData, setFormData] = useState({
    serviceName: "",
    location: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/parlors");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={() => navigate(-1)} variant="ghost">
            {language.code === "en" ? "Back" : "পিছনে"}
          </Button>
          <h1 className="text-xl font-bold">
            {language.code === "en"
              ? "Parlor Service Setup"
              : "পার্লার সেবা সেটআপ"}
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4 space-y-2">
            <p className="text-lg font-bold">
              {language.code === "en" ? "Upload image" : "ছবি আপলোড করুন"}
            </p>
            <div className="bg-primary/10 border-primary-200 flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed">
              <Upload className="text-primary mb-2 h-16 w-16" />
              <p className="text-primary font-medium">
                {language.code === "en"
                  ? "Click to upload or drag and drop"
                  : "আপলোড করতে ক্লিক করুন বা ফাইল টেনে আনুন"}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                {language.code === "en"
                  ? "PNG, JPG, GIF up to 10MB"
                  : "PNG, JPG, GIF সর্বোচ্চ ১০MB"}
              </p>
            </div>
          </div>

          <label className="block w-full space-y-2">
            <span>{language.code === "en" ? "Service Name" : "সেবার নাম"}</span>
            <FormControl
              as={"input"}
              type="text"
              placeholder={
                language.code === "en"
                  ? "Enter Service Name"
                  : "সেবার নাম লিখুন"
              }
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="block w-full space-y-2">
            <label className="block pb-2 text-lg font-bold">
              {language.code === "en" ? "Add services" : "সেবা যোগ করুন"}
            </label>
            <FormControl
              as={"select"}
              value={selectedServices}
              onChange={(e) => setSelectedServices(e.target.value)}
            >
              <option value="">
                {language.code === "en"
                  ? "Select a service"
                  : "একটি সেবা নির্বাচন করুন"}
              </option>
              {[
                "Hair Cut",
                "Hair Color",
                "Hair Straightening",
                "Hair Styling",
                "Hair Extensions",
                "Hair Waxing",
              ].map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </FormControl>
          </label>

          <label className="block w-full space-y-2">
            <span>
              {language.code === "en" ? "Parlor Location" : "পার্লারের অবস্থান"}
            </span>
            <FormControl
              as={"input"}
              type="text"
              placeholder={
                language.code === "en"
                  ? "Enter Parlor Location"
                  : "পার্লারের অবস্থান লিখুন"
              }
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="block w-full space-y-2">
            <span>
              {language.code === "en" ? "Add description" : "বিবরণ যোগ করুন"}
            </span>
            <FormControl
              as={"textarea"}
              placeholder={
                language.code === "en" ? "Enter description" : "বিবরণ লিখুন"
              }
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>

          <Button type="submit" className="mt-6 w-full py-3">
            {language.code === "en" ? "SAVE" : "সংরক্ষণ করুন"}
          </Button>
        </form>
      </div>
    </div>
  );
}
