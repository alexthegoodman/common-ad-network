"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Eye, EyeSlash, UserPlus, Upload } from "@phosphor-icons/react";
import { upload } from "@vercel/blob/client";
import { getCategoryOptions } from "@/app/lib/categories";

function RegisterForm() {
  const searchParams = useSearchParams();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyLink: "",
    companyDescription: "",
    profilePic: "",
    inviteCode: "",
    category: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill invite code from URL
  useEffect(() => {
    const inviteFromUrl = searchParams.get("invite");
    if (inviteFromUrl) {
      setFormData((prev) => ({ ...prev, inviteCode: inviteFromUrl }));
    }
  }, [searchParams]);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
      });

      setFormData({ ...formData, profilePic: blob.url });
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!formData.inviteCode) {
      setError("Invite code is required");
      return;
    }

    setIsLoading(true);

    const success = await register({
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      companyLink: formData.companyLink,
      companyDescription: formData.companyDescription || undefined,
      profilePic: formData.profilePic || undefined,
      inviteCode: formData.inviteCode,
      category: formData.category || undefined,
    });

    if (success) {
      window.location.href = "/dashboard";
    } else {
      setError(
        "Registration failed. Please check your invite code and try again."
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus size={32} className="text-white" weight="bold" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Join Common Ad Network
            </h1>
            <p className="text-gray-600 mt-2">
              Create your account and start earning karma
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="inviteCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Invite Code *
              </label>
              <input
                type="text"
                id="inviteCode"
                required
                value={formData.inviteCode}
                onChange={(e) =>
                  setFormData({ ...formData, inviteCode: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your invite code"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Get an invite code from an existing member
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your Company"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="companyLink"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Website *
              </label>
              <input
                type="url"
                id="companyLink"
                required
                value={formData.companyLink}
                onChange={(e) =>
                  setFormData({ ...formData, companyLink: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://yourcompany.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              >
                <option value="">Select your company category</option>
                {getCategoryOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                This determines which ads will be displayed on your site
              </p>
            </div>

            <div>
              <label
                htmlFor="companyDescription"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Description
              </label>
              <textarea
                id="companyDescription"
                rows={3}
                value={formData.companyDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companyDescription: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Brief description of your company (optional)"
                disabled={isLoading}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be used as your first ad description (
                {formData.companyDescription.length}/160 characters)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture (optional)
              </label>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <input
                  type="url"
                  value={formData.profilePic}
                  onChange={(e) =>
                    setFormData({ ...formData, profilePic: e.target.value })
                  }
                  className="flex-1 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Or paste image URL directly"
                  disabled={isLoading}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isLoading}
                  className="px-4 bg-gray-50 border-l border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                >
                  {isUploading ? "Uploading..." : <Upload size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload image (max 5MB) or paste URL • Recommended for better
                profile visibility
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Min. 8 characters"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Repeat password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeSlash size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
