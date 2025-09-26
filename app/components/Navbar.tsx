"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { Menu } from "@headlessui/react";
import {
  House,
  SquaresFour,
  ChartLine,
  ChatCircle,
  Code,
  Plus,
  SignOut,
  User,
  Trophy,
  List,
  UserPlus,
  Copy,
  GithubLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import AddAdForm from "./AddAdForm";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isGeneratingInvite, setIsGeneratingInvite] = useState(false);
  const [isAddAdFormOpen, setIsAddAdFormOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const generateInviteLink = async () => {
    setIsGeneratingInvite(true);
    try {
      const response = await fetch("/api/invite/create", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setInviteLink(data.inviteUrl);
        setIsInviteModalOpen(true);
      } else {
        console.error("Failed to generate invite link");
      }
    } catch (error) {
      console.error("Error generating invite link:", error);
    } finally {
      setIsGeneratingInvite(false);
    }
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch (error) {
      console.error("Failed to copy invite link:", error);
    }
  };

  const navigation = user
    ? [
        { name: "Dashboard", href: "/dashboard", icon: ChartLine },
        { name: "Browse Ads", href: "/ads", icon: SquaresFour },
        { name: "Social Feed", href: "/feed", icon: ChatCircle },
        { name: "Embed Code", href: "/embed", icon: Code },
      ]
    : [];

  return (
    <nav className="font-sans bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={user ? "/dashboard" : "/"}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <SquaresFour size={20} className="text-white" weight="bold" />
              </div>
              <span className="font-serif text-md md:text-xl font-bold text-gray-900 word-wrap">
                Common Ad Network
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 px-2 py-2 text-sm font-small text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={() => setIsAddAdFormOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white text-sm font-small rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus size={18} />
                Add Ad
              </button>
            </div>
          )}

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Karma Display */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full">
                  <Trophy size={16} className="text-primary-600" />
                  <span className="text-sm font-semibold text-primary-700">
                    {user.karma.toLocaleString()}
                  </span>
                </div>

                {/* User Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-primary-600" />
                    </div>
                    <span className="hidden sm:block">{user.companyName}</span>
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user.companyName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={generateInviteLink}
                          disabled={isGeneratingInvite}
                          className={`${
                            active ? "bg-gray-50" : ""
                          } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:text-primary-600 disabled:opacity-50`}
                        >
                          <UserPlus size={16} />
                          {isGeneratingInvite
                            ? "Generating..."
                            : "Invite Friend"}
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-gray-50" : ""
                          } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:text-red-600`}
                        >
                          <SignOut size={16} />
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </>
            ) : (
              <div className="flex items-center gap-3 min-w-[150px]">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Get Started
                </Link>
                <div className="flex flex-row items-center gap-3">
                  <a
                    href="https://github.com/alexthegoodman/common-ad-network"
                    target="_blank"
                  >
                    <GithubLogoIcon size={24} />
                  </a>
                  <a href="https://x.com/AlexTheGoodman" target="_blank">
                    <XLogoIcon size={24} />
                  </a>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            {user && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <List size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setIsAddAdFormOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 w-full text-base font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus size={20} />
                Add Ad
              </button>
              <div className="flex items-center gap-3 px-3 py-2 mt-4 pt-4 border-t border-gray-200">
                <Trophy size={20} className="text-primary-600" />
                <span className="text-base font-semibold text-primary-700">
                  {user.karma.toLocaleString()} Karma
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Invite a Friend
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Share this invite link with your friend to give them access to
              Common Ad Network.
            </p>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-4">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none"
              />
              <button
                onClick={copyInviteLink}
                className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
                title="Copy link"
              >
                <Copy size={16} />
              </button>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Ad Form Modal */}
      <AddAdForm
        isOpen={isAddAdFormOpen}
        onClose={() => setIsAddAdFormOpen(false)}
        onSuccess={() => {
          setIsAddAdFormOpen(false);
          // Optionally refresh the page or show a success message
        }}
      />
    </nav>
  );
}
