"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  Trophy,
  Users,
  TrendUp,
  Shield,
  ArrowRight,
  CheckCircle,
  ArrowRightIcon,
  TrophyIcon,
  LockIcon,
  ChartLineUpIcon,
  CheckIcon,
  MailboxIcon,
  Target,
  Code,
  PaintBrush,
  ChartBar,
} from "@phosphor-icons/react";

export default function Home() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInviteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/invite/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Invite request submitted successfully!");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect authenticated users to dashboard
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="bg-[#EBF1EC]">
      {/* Hero Section */}
      <section className="hero w-full">
        <div className="flex flex-col lg:flex-row">
          <div className="left w-full lg:w-1/2 bg-primary-500 p-8 sm:p-12 lg:p-20">
            <h1 className="block text-4xl sm:text-6xl md:text-8xl lg:text-[164px] leading-tight lg:leading-[188px] text-white mb-6">
              <span className="text-[#F1FF89]">Give</span> clicks,{" "}
              <span className="text-[#F1FF89]">Get</span> clicks
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed lg:leading-[46px] text-white font-sans">
              With Common Ad Network, indie makers can support each other
              through mutual advertising. By allowing ads to display on your
              site, you will earn a place on others.
            </p>
            <div className="relative">
              <form
                onSubmit={handleInviteRequest}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-4 py-5 bg-white text-black w-full sm:w-60"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#5C6657] text-white font-serif text-lg sm:text-xl lg:text-2xl px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#4a523f] transition-colors flex items-center gap-4 disabled:opacity-50"
                >
                  {isSubmitting ? "Requesting..." : "Request Invite"}
                  <MailboxIcon size={24} className="sm:w-8 sm:h-8" />
                </button>
              </form>
              {message && (
                <p
                  className={`mt-2 text-sm ${
                    message.includes("successfully")
                      ? "text-gray-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
          {/** Example Ads */}
          <div className="right w-full lg:w-1/2">
            <a
              href="https://madebycommon.com"
              target="_blank"
              className="ad block w-full"
            >
              <img className="block w-full" src="/stunts-ad-common.png" />
              <div className="flex flex-row justify-between font-sans bg-[#5C6657] p-4 sm:p-6 text-white text-balance">
                <div>
                  <span className="block text-sm sm:text-base">
                    Stunts - Make Videos Easily
                  </span>
                  <span className="block text-xs sm:text-sm text-gray-300">
                    Stunts enables anyone to generate animation keyframes for
                    engaging videos
                  </span>
                </div>
                <div>
                  <ArrowRightIcon size={24} className="sm:w-8 sm:h-8" />
                </div>
              </div>
            </a>
            <div className="flex flex-col sm:flex-row">
              <a
                href="https://madebycommon.com"
                target="_blank"
                className="ad block w-full lg:w-[408px]"
              >
                <img className="block w-full" src="/thermometer.png" />
                <div className="flex flex-row justify-between font-sans bg-[#5C6657] p-4 sm:p-6 text-white text-balance">
                  <div>
                    <span className="block text-sm sm:text-base">
                      The Common Thermometer
                    </span>
                    <span className="block text-xs sm:text-sm text-gray-300">
                      A premium thermometer with LiDAR for plant height and
                      shape monitoring
                    </span>
                  </div>
                  <div>
                    <ArrowRightIcon size={24} className="sm:w-8 sm:h-8" />
                  </div>
                </div>
              </a>

              {/* Text-only ads */}
              <div>
                <a
                  href="http://Kan.bn"
                  target="_blank"
                  className="ad block w-full bg-[#FF6363] text-white p-4 sm:p-6 hover:bg-[#e55555] transition-colors"
                >
                  <div className="flex flex-row justify-between font-sans text-balance">
                    <div>
                      <span className="block text-sm sm:text-base font-semibold">
                        Kan.bn - The Open-Source Trello
                      </span>
                      <span className="block text-xs sm:text-sm text-gray-200 mt-1">
                        Very fast and easy to use like Trello, open to all
                      </span>
                    </div>
                    <div>
                      <ArrowRightIcon size={24} className="sm:w-8 sm:h-8" />
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.onlook.com"
                  target="_blank"
                  className="ad block w-full bg-[#5C6657] text-white p-4 sm:p-6 hover:bg-[#4a523f] transition-colors"
                >
                  <div className="flex flex-row justify-between font-sans text-balance">
                    <div>
                      <span className="block text-sm sm:text-base font-semibold">
                        Onlook - The Cursor for Designers
                      </span>
                      <span className="block text-xs sm:text-sm text-gray-300 mt-1">
                        This tool helps people with an idea create a working
                        prototype and design
                      </span>
                    </div>
                    <div>
                      <ArrowRightIcon size={24} className="sm:w-8 sm:h-8" />
                    </div>
                  </div>
                </a>

                <a
                  href="https://microlaunch.net"
                  target="_blank"
                  className="ad block w-full bg-[#3ECF8E] text-white p-4 sm:p-6 hover:bg-[#2eb377] transition-colors"
                >
                  <div className="flex flex-row justify-between font-sans text-balance">
                    <div>
                      <span className="block text-sm sm:text-base font-semibold">
                        Microlaunch - World-Class Tech Products
                      </span>
                      <span className="block text-xs sm:text-sm text-gray-100 mt-1">
                        Share your new app or product with the indie maker
                        community
                      </span>
                    </div>
                    <div>
                      <ArrowRightIcon size={24} className="sm:w-8 sm:h-8" />
                    </div>
                  </div>
                </a>

                {/* <a
                  href="https://cal.com"
                  target="_blank"
                  className="ad block w-full bg-[#292929] text-white p-4 sm:p-6 hover:bg-[#1a1a1a] transition-colors"
                >
                  <div className="flex flex-row justify-between font-sans text-balance">
                    <div>
                      <span className="block text-sm sm:text-base font-semibold">
                        Cal.com - Open Source Calendly
                      </span>
                      <span className="block text-xs sm:text-sm text-gray-300 mt-1">
                        The scheduling platform that puts you in control of your
                        time
                      </span>
                    </div>
                    <div>
                      <ArrowRightIcon size={24} className="sm:w-8 sm:h-8" />
                    </div>
                  </div>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="how mt-10 sm:mt-20 mb-10 sm:mb-20">
        <div>
          <div className="w-full sm:w-[300px] text-center mx-auto sm:ml-10 p-4 bg-primary-500">
            <h1 className="text-5xl sm:text-7xl text-[#F1FF89]">How?</h1>
          </div>
          <div className="flex flex-col lg:flex-row bg-linear-65 from-[rgba(249,249,47,0.5)] to-[rgba(104,255,66,0.5)] font-sans font-medium">
            <div className="step py-8 lg:pt-16 lg:pb-16 text-[#4294FF] w-full lg:w-1/3 flex flex-row justify-center text-center">
              <div className="flex flex-col items-center gap-4 w-full max-w-[270px] px-4">
                <TrophyIcon size={48} />
                <span className="text-lg">Earn Karma</span>
                <hr className="w-4" />
                <p className="text-sm sm:text-base">
                  Display ads on your site and earn karma based on genuine
                  clicks. Higher CTR = more karma rewards.
                </p>
              </div>
            </div>
            <div className="step py-8 lg:pt-16 lg:pb-16 w-full lg:w-1/3 flex flex-row justify-center text-center lg:scale-110 items-center bg-[#FFE4E9] text-[#ED3C5A] border-1 border-solid border-[#ED3C5A]">
              <div className="flex flex-col items-center gap-4 w-full max-w-[270px] px-4">
                <ChartLineUpIcon size={48} />
                <span className="text-lg">Spend Karma</span>
                <hr className="w-4" />
                <p className="text-sm sm:text-base">
                  Use your earned karma to promote your own products across the
                  entire network of indie maker sites.
                </p>
              </div>
            </div>
            <div className="step py-8 lg:pt-16 lg:pb-16 w-full lg:w-1/3 flex flex-row justify-center text-center">
              <div className="flex flex-col items-center gap-4 w-full max-w-[270px] px-4">
                <LockIcon size={48} />
                <span className="text-lg">Fraud Detection</span>
                <hr className="w-4" />
                <p className="text-sm sm:text-base">
                  Advanced click validation with IP geolocation and behavioral
                  analysis. Only genuine clicks count.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Targeting Section */}
      <section className="targeting pb-10 sm:pb-20">
        <div className="px-4 sm:px-10">
          <div className="mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[128px] leading-tight lg:leading-[154px] text-slate-700 mb-6">
                Smart
                <br />
                <span className="text-primary-500">Targeting</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 font-sans max-w-3xl mx-auto">
                Your ads only appear on relevant sites. Our category-based
                matching ensures a developer tool reaches developers, not
                designers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Visual Demonstration */}
              <div className="space-y-6">
                <div className="bg-white p-6 border-2 border-slate-200 ">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500  flex items-center justify-center">
                      <Code size={24} className="text-white" />
                    </div>
                    <span className="font-sans font-semibold text-slate-800">
                      Developer Tools Site
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3  border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm font-medium text-blue-800">
                          API Monitoring Tool
                        </span>
                        <Target size={16} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3  border border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm font-medium text-green-800">
                          Code Editor Extension
                        </span>
                        <Target size={16} className="text-green-600" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-3  border border-purple-200">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm font-medium text-purple-800">
                          Testing Framework
                        </span>
                        <Target size={16} className="text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 border-2 border-slate-200 ">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-500  flex items-center justify-center">
                      <PaintBrush size={24} className="text-white" />
                    </div>
                    <span className="font-sans font-semibold text-slate-800">
                      Design Tools Site
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3  border border-pink-200">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm font-medium text-pink-800">
                          Icon Library
                        </span>
                        <Target size={16} className="text-pink-600" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3  border border-orange-200">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm font-medium text-orange-800">
                          Color Palette Generator
                        </span>
                        <Target size={16} className="text-orange-600" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3  border border-teal-200">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-sm font-medium text-teal-800">
                          UI Component Kit
                        </span>
                        <Target size={16} className="text-teal-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8  border-2 border-primary-200 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-500  flex items-center justify-center">
                      <ChartBar size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-sans">
                      Higher CTR
                    </h3>
                  </div>
                  <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed">
                    When your ads appear on relevant sites, they perform 3-5x
                    better than random placement.
                  </p>
                </div>

                <div className="bg-white p-6 sm:p-8  border-2 border-accent-200 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent-500  flex items-center justify-center">
                      <Target size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-sans">
                      Better Audience
                    </h3>
                  </div>
                  <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed">
                    Reach users who are already interested in your category of
                    product.
                  </p>
                </div>

                <div className="bg-white p-6 sm:p-8  border-2 border-green-200 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-500  flex items-center justify-center">
                      <CheckCircle size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-sans">
                      Easy Setup
                    </h3>
                  </div>
                  <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed">
                    Just choose your category during signup and ad creation. We
                    handle the rest automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Category Examples */}
            <div className="mt-12 sm:mt-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-8 font-sans">
                20+ Categories Available
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  "Developer Tools",
                  "SaaS & Web Apps",
                  "Design & Creative",
                  "Mobile Apps",
                  "AI & ML Tools",
                  "Marketing Tools",
                  "Analytics & Data",
                  "E-commerce",
                ].map((category) => (
                  <div
                    key={category}
                    className="bg-white p-3 sm:p-4  border border-slate-200 text-center"
                  >
                    <span className="font-sans text-sm sm:text-base font-medium text-slate-700">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-500 font-sans text-sm mt-4">
                + 12 more categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Karma System Explanation */}
      <div className="px-4 sm:px-10 mb-10 sm:mb-20">
        <div className="">
          <div className="">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[128px] leading-tight lg:leading-[164px] text-primary-500">
              Fair & Balanced
            </h2>
          </div>
          <div className="flex flex-col xl:flex-row">
            <div>
              <p className="text-slate-700 text-4xl sm:text-6xl md:text-8xl lg:text-[128px] leading-tight lg:leading-[164px]">
                Karma
                <br />
                System
              </p>
            </div>
            <div className="flex-grow xl:pl-10 pt-4">
              <div className="font-sans grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                  <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">
                    1 Karma
                  </div>
                  <div className="font-sans text-sm font-medium text-red-700 mb-3">
                    1% CTR
                  </div>
                  <p className="font-sans text-sm text-red-600">
                    Base reward for legitimate clicks
                  </p>
                </div>

                <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
                    10 Karma
                  </div>
                  <div className="font-sans text-sm font-medium text-primary-700 mb-3">
                    5% CTR
                  </div>
                  <p className="font-sans text-sm text-primary-600">
                    Good quality traffic
                  </p>
                </div>

                <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                    40 Karma
                  </div>
                  <div className="font-sans text-sm font-medium text-green-700 mb-3">
                    20% CTR
                  </div>
                  <p className="font-sans text-sm text-green-600">
                    Excellent engagement
                  </p>
                </div>
              </div>

              <div className="font-sans mt-8 p-4 sm:p-6 bg-accent-50 border border-accent-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckIcon size={20} className="text-accent-600" />
                  <span className="font-semibold text-accent-900">
                    Bonus for Smaller Sites
                  </span>
                </div>
                <p className="text-sm text-accent-700">
                  Sites with less than 1,000 karma earn 50% bonus rewards to
                  help level the playing field
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-24 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-14">
            Ready to Join the Community?
          </h2>
          <form
            onSubmit={handleInviteRequest}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-5 text-lg bg-white text-black w-full sm:w-80"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#5C6657] text-white font-serif text-lg sm:text-xl lg:text-2xl px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#4a523f] transition-colors flex items-center gap-4 disabled:opacity-50"
            >
              {isSubmitting ? "Requesting..." : "Request Invite"}
              <MailboxIcon size={24} className="sm:w-8 sm:h-8" />
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-sm ${
                message.includes("successfully")
                  ? "text-gray-200"
                  : "text-red-200"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
