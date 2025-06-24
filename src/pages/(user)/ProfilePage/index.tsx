import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { fetchMe } from "@/services/auth.service";
import { Edit, Lock, LogOut, Trash2, User } from "lucide-react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user: authUser, clearUser } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: me } = useQuery({
    queryKey: ["me", authUser.isAuthenticated, authUser.role],
    queryFn: fetchMe,
  });

  const handleLogout = async () => {
    // Implement actual logout logic
    clearUser();
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    setShowDeleteModal(false);
    clearUser();
    navigate("/");
  };

  const ProfileSection = ({ me }: { me: any }) => (
    <div className="items-center justify-center bg-white py-6">
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed bg-gray-200">
          {me?.photo ? (
            <img
              src={me.photo}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User className="text-gray-400" size={48} />
          )}
        </div>
        <h2 className="pt-3 text-lg font-bold">
          {me?.name || language.code === "en"
            ? "User Name"
            : "ব্যবহারকারীর নাম"}
        </h2>
      </div>
    </div>
  );

  const BioSection = ({ me }: { me: any }) => (
    <div className="items-center justify-center rounded-lg bg-white p-4 shadow-sm">
      <div className="w-full space-y-6 rounded-md bg-white p-4">
        <div className="flex items-center">
          <div className="w-8/12 space-y-3">
            <p className="text-sm font-bold">
              {language.code === "en" ? "Email" : "ইমেইল"}
            </p>
            <p className="text-gray-600">{me?.email || "-"}</p>
          </div>
          <div className="w-4/12 space-y-3">
            <p className="text-sm font-bold">
              {language.code === "en" ? "Phone" : "ফোন"}
            </p>
            <p className="text-gray-600">{me?.phone || "-"}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-8/12 space-y-3">
            <p className="text-sm font-bold">
              {language.code === "en" ? "Postal" : "পোস্টাল"}
            </p>
            <p className="text-gray-600">{me?.postal || "-"}</p>
          </div>
          <div className="w-4/12 space-y-3">
            <p className="text-sm font-bold">
              {language.code === "en" ? "Role" : "ভূমিকা"}
            </p>
            <p className="text-gray-600">{me?.role || "-"}</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm font-bold">
            {language.code === "en" ? "Address" : "ঠিকানা"}
          </p>
          <p className="text-gray-600">{me?.address || "-"}</p>
        </div>
      </div>
    </div>
  );

  const SettingsSection = () => (
    <div className="items-center justify-center rounded-lg bg-white p-4 shadow-sm">
      <div className="w-full space-y-4 rounded-md bg-white p-4">
        <div className="border-b border-gray-200 pb-4">
          <Button
            onClick={() => navigate("/reset-password")}
            variant="ghost"
            className="w-full justify-between px-0"
          >
            <span>
              {language.code === "en"
                ? "Reset Password"
                : "পাসওয়ার্ড রিসেট করুন"}
            </span>
            <div className="rounded-full bg-gray-100 p-2">
              <Lock className="text-gray-700" size={16} />
            </div>
          </Button>
        </div>

        {navigator.userAgent.includes("iPhone") && (
          <div className="border-b border-gray-200 pb-4">
            <Button
              onClick={() => setShowDeleteModal(true)}
              variant="ghost"
              className="w-full justify-between px-0"
            >
              <span>
                {language.code === "en" ? "Delete Account" : "অ্যাকাউন্ট মুছুন"}
              </span>
              <div className="rounded-full bg-gray-100 p-2">
                <Trash2 className="text-gray-700" size={16} />
              </div>
            </Button>
          </div>
        )}

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-between px-0"
        >
          <span>{language.code === "en" ? "Logout" : "লগআউট"}</span>
          <div className="rounded-full bg-gray-100 p-2">
            <LogOut className="text-gray-700" size={16} />
          </div>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="text-gray-700"
          >
            {language.code === "en" ? "Back" : "পিছনে"}
          </Button>

          <h1 className="text-xl font-bold">
            {language.code === "en" ? "My Profile" : "আমার প্রোফাইল"}
          </h1>

          <Button
            onClick={() => navigate("/edit-profile")}
            variant="ghost"
            className="text-primary"
          >
            <Edit size={20} />
          </Button>
        </div>

        {/* Profile Content */}
        <div className="space-y-4">
          <ProfileSection me={me} />
          <BioSection me={me} />
          <SettingsSection />
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal}>
        <Modal.Backdrop />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              {language.code === "en" ? "Delete Account" : "অ্যাকাউন্ট মুছুন"}
            </Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p className="mb-4">
              {language.code === "en"
                ? "Are you sure you want to delete your account? This action cannot be undone."
                : "আপনি কি নিশ্চিত যে আপনি আপনার অ্যাকাউন্ট মুছে ফেলতে চান? এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              {language.code === "en" ? "Cancel" : "বাতিল করুন"}
            </Button>
            <Button className="destructive" onClick={handleDeleteAccount}>
              {language.code === "en" ? "Delete" : "মুছুন"}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
