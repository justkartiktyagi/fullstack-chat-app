import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail, Calendar, BadgeCheck } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleUpdateProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Loading...";

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="bg-base-100/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 space-y-10 border border-base-300">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
            <p className="text-base-content/60">
              Manage and view your personal information
            </p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImage || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-36 rounded-full object-cover border-4 border-primary shadow-lg"
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-2 right-2 bg-primary text-white p-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-md ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpdateProfile}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-base-content/60">
              {isUpdatingProfile
                ? "Updating profile picture..."
                : "Click the camera icon to change your profile picture"}
            </p>
          </div>

          {/* Info Section */}
          <div className="grid gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="flex items-center gap-3 bg-base-200 p-4 rounded-xl border border-base-300">
                <User className="w-5 h-5 text-primary" />
                <input
                  type="text"
                  value={authUser?.fullName || ""}
                  readOnly
                  className="bg-transparent w-full focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="flex items-center gap-3 bg-base-200 p-4 rounded-xl border border-base-300">
                <Mail className="w-5 h-5 text-primary" />
                <input
                  type="text"
                  value={authUser?.email || ""}
                  readOnly
                  className="bg-transparent w-full focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Member Since */}
            <div className="flex justify-between items-center bg-base-200 p-5 rounded-xl border border-base-300">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">Member Since</span>
              </div>
              <span className="text-base-content/70 font-medium">
                {memberSince}
              </span>
            </div>

            {/* Account Status */}
            <div className="flex justify-between items-center bg-base-200 p-5 rounded-xl border border-base-300">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-5 h-5 text-green-500" />
                <span className="font-medium">Account Status</span>
              </div>

              <div className="flex items-center gap-2 text-green-500 font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
