"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  RocketIcon,
  LinkIcon,
} from "@phosphor-icons/react";
import { createAdSlug, createCompanySlug } from "@/app/lib/slugs";

export default function Home() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("survey");
  const [networkAds, setNetworkAds] = useState([]);
  const [networkUsers, setNetworkUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageDisplay, setMessageDisplay] = useState(false);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const [adsResponse, usersResponse] = await Promise.all([
          fetch("/api/ads?random=true&limit=40"),
          fetch("/api/users?random=true&limit=20"),
        ]);

        if (adsResponse.ok) {
          const adsData = await adsResponse.json();
          setNetworkAds(adsData.ads || []);
        }

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setNetworkUsers(usersData.users || []);
        }
      } catch (error) {
        console.error("Error fetching network data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, []);

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
            {/* <h1 className="block text-4xl sm:text-6xl md:text-8xl lg:text-[164px] leading-tight lg:leading-[188px] text-white mb-6">
              <span className="text-[#F1FF89]">Give</span> clicks,{" "}
              <span className="text-[#F1FF89]">Get</span> clicks
            </h1> */}
            <h1 className="block text-4xl sm:text-6xl md:text-8xl lg:text-[164px] leading-tight lg:leading-[188px] text-white mb-6">
              <span className="text-[#F1FF89]">Golden rule</span> Give first
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed lg:leading-[46px] text-white font-sans">
              With Common Ad Network, indie makers support each other through
              ads, surveys, and launch promotions. Earn karma by engaging with
              content and spend it to promote your products across the network.
            </p>
            <div className="relative">
              <form
                onSubmit={handleInviteRequest}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-4"
              >
                {/* <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-4 py-5 bg-white text-black w-full sm:w-60"
                /> */}
                {/* <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#5C6657] text-white font-serif text-lg sm:text-xl lg:text-2xl px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#4a523f] transition-colors flex items-center gap-4 disabled:opacity-50"
                >
                  {isSubmitting ? "Requesting..." : "Request Invite"}
                  <MailboxIcon size={24} className="sm:w-8 sm:h-8" />
                </button> */}
                <Link
                  href={"/register"}
                  className="bg-[#5C6657] text-white font-serif text-lg sm:text-xl lg:text-2xl px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#4a523f] transition-colors flex items-center gap-4 disabled:opacity-50"
                >
                  Sign Up for Free
                  <RocketIcon size={24} className="sm:w-8 sm:h-8" />
                </Link>
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
                  Earn karma by clicking ads, responding to surveys, and
                  engaging with the community. Optional: embed ads for
                  additional rewards.
                </p>
              </div>
            </div>
            <div className="step py-8 lg:pt-16 lg:pb-16 w-full lg:w-1/3 flex flex-row justify-center text-center lg:scale-110 items-center bg-[#FFE4E9] text-[#ED3C5A] border-1 border-solid border-[#ED3C5A]">
              <div className="flex flex-col items-center gap-4 w-full max-w-[270px] px-4">
                <ChartLineUpIcon size={48} />
                <span className="text-lg">Spend Karma</span>
                <hr className="w-4" />
                <p className="text-sm sm:text-base">
                  Use karma to promote ads, launch surveys for customer
                  research, or showcase new products on our launch leaderboard.
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

      {/* Special Content Types Section */}
      <section className="special-content pt-8 sm:pt-16 pb-10 sm:pb-20 bg-slate-50">
        <div className="px-4 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[128px] leading-tight lg:leading-[154px] text-slate-700 mb-6">
                Beyond
                <br />
                <span className="text-primary-500">Just Ads</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 font-sans max-w-3xl mx-auto">
                Engage with the indie maker community through surveys for
                customer research and launch showcases for maximum visibility.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-1 bg-white p-2 border border-slate-200 max-w-2xl mx-auto">
                <button
                  onClick={() => setActiveTab("survey")}
                  className={`px-6 py-3 font-sans font-medium transition-all ${
                    activeTab === "survey"
                      ? "bg-primary-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Customer Surveys
                </button>
                <button
                  onClick={() => setActiveTab("launches")}
                  className={`px-6 py-3 font-sans font-medium transition-all ${
                    activeTab === "launches"
                      ? "bg-primary-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Launch Showcase
                </button>
                <button
                  onClick={() => setActiveTab("engagement")}
                  className={`px-6 py-3 font-sans font-medium transition-all ${
                    activeTab === "engagement"
                      ? "bg-primary-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Engagement Rewards
                </button>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 shadow-lg min-h-[400px]">
              {activeTab === "survey" && (
                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 font-sans">
                        Customer Research Surveys
                      </h3>
                      <p className="text-slate-600 font-sans text-lg leading-relaxed mb-6">
                        Get valuable feedback directly from the indie maker
                        community. Create surveys to validate ideas, test
                        concepts, and understand your target market better.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-sans">
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Target specific maker demographics
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Real-time response analytics
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          High-quality indie maker insights
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 border border-blue-200">
                      <div className="bg-white p-4 border border-blue-300 mb-4">
                        <h4 className="font-sans font-bold text-slate-800 mb-3">
                          What's your biggest challenge as an indie maker?
                        </h4>
                        <div className="space-y-2">
                          {[
                            {
                              option: "Finding customers",
                              votes: 45,
                              color: "bg-blue-500",
                            },
                            {
                              option: "Building the product",
                              votes: 23,
                              color: "bg-green-500",
                            },
                            {
                              option: "Marketing & promotion",
                              votes: 32,
                              color: "bg-purple-500",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="cursor-pointer hover:bg-slate-50 p-2 border border-slate-200 transition-colors"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-sans text-sm text-slate-700">
                                  {item.option}
                                </span>
                                <span className="font-sans text-xs text-slate-500">
                                  {item.votes}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 h-2">
                                <div
                                  className={`${item.color} h-2`}
                                  style={{ width: `${item.votes}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="w-full mt-3 bg-blue-500 text-white py-2 font-sans text-sm hover:bg-blue-600 transition-colors">
                          Vote & See Results
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "launches" && (
                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 font-sans">
                        Launch Showcase Leaderboard
                      </h3>
                      <p className="text-slate-600 font-sans text-lg leading-relaxed mb-6">
                        Promote your new products and launches to the entire
                        indie maker community. Get maximum visibility on our
                        shuffled daily leaderboard.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-sans">
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Featured on homepage leaderboard
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Daily shuffled positioning
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Direct maker-to-maker engagement
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 border border-purple-200">
                      <div className="bg-white p-6 border border-purple-300">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-purple-500 mx-auto mb-3 flex items-center justify-center">
                            <RocketIcon size={28} className="text-white" />
                          </div>
                          <h4 className="font-sans font-bold text-slate-800 text-xl mb-2">
                            🚀 Today's Launch Leaderboard
                          </h4>
                          <p className="font-sans text-sm text-slate-600 mb-4">
                            Fresh indie products launching this week
                          </p>
                        </div>
                        <div className="space-y-3">
                          {[
                            { rank: 1, name: "TaskFlow Pro", votes: 47 },
                            { rank: 2, name: "CodeSnap", votes: 32 },
                            { rank: 3, name: "MakerMetrics", votes: 28 },
                          ].map((launch, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-purple-600">
                                  #{launch.rank}
                                </span>
                                <span className="font-sans text-sm font-medium">
                                  {launch.name}
                                </span>
                              </div>
                              <span className="font-sans text-xs text-slate-500">
                                {launch.votes} clicks
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "engagement" && (
                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 font-sans">
                        Earn Karma Through Engagement
                      </h3>
                      <p className="text-slate-600 font-sans text-lg leading-relaxed mb-6">
                        No need to embed ads on your site! Earn karma by
                        actively participating in the community through clicks
                        and survey responses.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-sans">
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Click ads to earn karma points
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Complete surveys for bonus rewards
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Optional: embed ads for extra karma
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 border border-green-200">
                      <div className="bg-white p-6 border border-green-300">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-green-500 mx-auto mb-3 flex items-center justify-center">
                            <TrophyIcon size={28} className="text-white" />
                          </div>
                          <h4 className="font-sans font-bold text-slate-800 text-xl mb-2">
                            Ways to Earn Karma
                          </h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200">
                            <span className="font-sans text-sm font-medium">
                              Click on ads
                            </span>
                            <span className="font-sans text-xs text-green-600 font-bold">
                              +5 karma
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200">
                            <span className="font-sans text-sm font-medium">
                              Complete survey
                            </span>
                            <span className="font-sans text-xs text-blue-600 font-bold">
                              +15 karma
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200">
                            <span className="font-sans text-sm font-medium">
                              Embed ads (optional)
                            </span>
                            <span className="font-sans text-xs text-purple-600 font-bold">
                              1 to 40 Karma (per click)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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

      {/* Ads in Network Section */}
      <section className="ads-network py-12 sm:py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="px-4 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[128px] leading-tight lg:leading-[154px] text-slate-700 mb-6">
                Live
                <br />
                <span className="text-primary-500">Network</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 font-sans max-w-3xl mx-auto">
                Real ads from indie makers currently in our network. Join to add
                your own!
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin  h-12 w-12 border-b-2 border-primary-500"></div>
                <p className="mt-4 text-slate-600 font-sans">
                  Loading network ads...
                </p>
              </div>
            ) : (
              <>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                  {networkAds.slice(0, 8).map((ad: any) => (
                    <div
                      key={ad.id}
                      className="bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group break-inside-avoid mb-4 sm:mb-6"
                    >
                      {ad.imageUrl ? (
                        <div
                          className="relative h-32 overflow-hidden cursor-pointer"
                          onClick={() =>
                            ad.type === "regular" && ad.linkUrl
                              ? window.open(ad.linkUrl, "_blank")
                              : window.open(
                                  `/ads/${createAdSlug(ad.headline, ad.id)}`,
                                  "_blank"
                                )
                          }
                        >
                          <img
                            src={ad.imageUrl}
                            alt={ad.headline}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />

                          <div className="absolute opacity-0 hover:opacity-80 top-0 left-0 right-0 bottom-0 bg-gray-500">
                            <span className="text-white text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              {ad.type === "survey"
                                ? "Take Survey"
                                : `Visit ${ad.user.companyName}`}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="relative h-32 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center cursor-pointer"
                          onClick={() =>
                            ad.type === "regular" && ad.linkUrl
                              ? window.open(ad.linkUrl, "_blank")
                              : window.open(
                                  `/ads/${createAdSlug(ad.headline, ad.id)}`,
                                  "_blank"
                                )
                          }
                        >
                          <div className="w-16 h-16 bg-white/80  flex items-center justify-center">
                            <span className="text-2xl">
                              {ad.type === "survey" ? "📊" : "🚀"}
                            </span>
                          </div>

                          <div className="absolute opacity-0 hover:opacity-80 top-0 left-0 right-0 bottom-0 bg-gray-500">
                            <span className="text-white text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              {ad.type === "survey"
                                ? "Take Survey"
                                : `Visit ${ad.user.companyName}`}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-sans font-bold text-slate-800 text-sm mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {ad.headline}
                          </h3>
                          <span className="font-sans text-xs text-slate-500">
                            {ad.user.companyName}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-slate-600 mb-3 line-clamp-2">
                          {ad.description}
                        </p>

                        {ad.type === "survey" && ad.survey && (
                          <div className="mb-3 p-2 bg-slate-50 border border-slate-200">
                            <p className="font-sans text-xs font-medium text-slate-700 mb-2">
                              📊 {ad.survey.question}
                            </p>
                            <div className="space-y-1">
                              {ad.survey.options
                                .slice(0, 2)
                                .map((option: string, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-2 h-2 border border-slate-400 rounded-full"></div>
                                    <span className="font-sans text-xs text-slate-600">
                                      {option}
                                    </span>
                                  </div>
                                ))}
                              {ad.survey.options.length > 2 && (
                                <div className="font-sans text-xs text-slate-500 pl-4">
                                  +{ad.survey.options.length - 2} more options
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {ad.type !== "survey" && (
                          <>
                            <div className="flex flex-row items-center gap-2 mt-1 mb-1 ">
                              {ad.user.profilePic ? (
                                <img
                                  src={ad.user.profilePic}
                                  alt={ad.user.companyName}
                                  className="w-6 h-6  object-cover"
                                />
                              ) : (
                                <></>
                              )}

                              <p className="font-sans text-xs text-slate-500 truncate">
                                Message the founder of{" "}
                                <Link
                                  href={`/companies/${createCompanySlug(
                                    ad.user.companyName,
                                    ad.user.id
                                  )}`}
                                  className="text-primary-600 hover:text-primary-700 font-medium"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {ad.user.companyName}
                                </Link>{" "}
                                ({ad.user.karma} karma)
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              {messageDisplay ? (
                                <div className="flex flex-col mt-2 w-full">
                                  <input
                                    type="email"
                                    placeholder="Your email"
                                    className="mb-2 px-3 py-2 border border-slate-300 focus:border-primary-500 focus:outline-none text-sm font-sans"
                                  />
                                  <textarea
                                    placeholder="Your message"
                                    className="mb-2 px-3 py-2 border border-slate-300 focus:border-primary-500 focus:outline-none text-sm font-sans"
                                    rows={2}
                                  ></textarea>
                                  <button
                                    className="self-end bg-primary-500 text-white px-4 py-2 text-sm font-sans hover:bg-primary-600 transition-colors"
                                    // onClick, will send the message to the ad owner email
                                  >
                                    Send
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <textarea
                                    className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-sans w-full resize-none border border-slate-200
                            focus:outline-none focus:border-primary-300
                          "
                                    rows={1}
                                    readOnly
                                    // onClick, will open an email input and message textarea 2 rows
                                    // onClick={() =>
                                    //   setMessageDisplay(!messageDisplay)
                                    // }
                                    defaultValue={
                                      "I saw your ad and would like to connect..."
                                    }
                                  ></textarea>
                                  <ArrowRight
                                    size={14}
                                    className="text-slate-400 group-hover:text-primary-500 transition-colors"
                                  />
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {networkAds.length > 8 && (
                  <div className="text-center mt-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary-200 text-primary-700 font-sans font-medium">
                      <span>
                        + {networkAds.length - 8} more ads in the network
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Network Members Section */}
      <section className="network-members py-12 sm:py-20 bg-white">
        <div className="px-4 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[128px] leading-tight lg:leading-[154px] text-slate-700 mb-6">
                Network
                <br />
                <span className="text-accent-500">Members</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 font-sans max-w-3xl mx-auto">
                Indie makers supporting each other through mutual advertising
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin  h-12 w-12 border-b-2 border-accent-500"></div>
                <p className="mt-4 text-slate-600 font-sans">
                  Loading network members...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {networkUsers
                    .slice(0, 12)
                    .map((member: any, index: number) => (
                      <Link
                        key={member.id}
                        href={`/companies/${createCompanySlug(
                          member.companyName,
                          member.id
                        )}`}
                        className="text-center group cursor-pointer block"
                      >
                        <div className="relative mb-4 mx-auto w-20 h-20 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {member.profilePic ? (
                            <img
                              src={member.profilePic}
                              alt={member.companyName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                              <span className="text-lg font-bold text-slate-600">
                                {member.companyName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-sans font-bold text-slate-800 text-sm group-hover:text-accent-600 transition-colors line-clamp-1">
                          {member.companyName}
                        </h3>
                        <p className="font-sans text-xs text-slate-500 mt-1">
                          {member.karma} karma
                        </p>
                      </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                  <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-gradient-to-r from-accent-50 to-primary-50 border-2 border-accent-200">
                    <Users size={32} className="text-accent-600" />
                    <div className="text-center sm:text-left">
                      <div className="font-sans font-bold text-accent-900 text-lg">
                        Join {networkUsers.length}+ Indie Makers
                      </div>
                      <div className="font-sans text-sm text-accent-700">
                        Supporting each other through the network
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SEO Benefits Section */}
      <section className="seo-benefits py-16 sm:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(241,255,137,0.15),transparent_40%)]"></div>
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-[radial-gradient(circle_at_70%_30%,rgba(60,255,102,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[radial-gradient(circle_at_50%_50%,rgba(241,255,137,0.08),transparent_50%)]"></div>
        </div>

        <div className="relative px-4 sm:px-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] leading-tight font-bold text-white mb-6">
              SEO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1FF89] via-[#3CFF66] to-[#F1FF89]">
                Superpower
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 font-sans max-w-4xl mx-auto leading-relaxed">
              Every ad and company gets a dedicated page that boosts your search
              engine visibility and creates valuable backlinks
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Dedicated Pages Feature */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm  border-2 border-[#F1FF89]/30 p-8 h-full shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F1FF89] to-[#3CFF66] rounded-full flex items-center justify-center shadow-lg">
                    <LinkIcon size={28} className="text-primary-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-800">
                    Dedicated Pages
                  </h3>
                </div>
                <p className="font-sans text-primary-700 text-lg mb-6 leading-relaxed">
                  Your ads and company profile get their own unique URLs that
                  search engines can index and rank.
                </p>

                {/* Example URLs */}
                <div className="sfont-sans pace-y-3">
                  <div className="bg-primary-50  p-4 border border-[#F1FF89]/50">
                    <div className="text-primary-600 text-sm font-mono mb-1 font-semibold">
                      Ad Page Example:
                    </div>
                    <div className="text-primary-800 font-mono text-sm break-all font-medium">
                      commonadnetwork.com/ads/api-monitoring-tool-cm1x2y3z
                    </div>
                  </div>
                  <div className="bg-accent-50  p-4 border border-[#3CFF66]/50">
                    <div className="text-accent-600 text-sm font-mono mb-1 font-semibold">
                      Company Page Example:
                    </div>
                    <div className="text-primary-800 font-mono text-sm break-all font-medium">
                      commonadnetwork.com/companies/stunts-inc-cm1x2y3z
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Benefits Feature */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm  border-2 border-[#3CFF66]/30 p-8 h-full shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3CFF66] to-[#F1FF89] rounded-full flex items-center justify-center shadow-lg">
                    <TrendUp size={28} className="text-primary-800" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-800">
                    SEO Benefits
                  </h3>
                </div>
                <div className="font-sans space-y-4">
                  {[
                    { icon: "🔍", text: "Better search engine rankings" },
                    { icon: "🔗", text: "High-quality backlinks to your site" },
                    { icon: "📈", text: "Increased organic traffic" },
                    { icon: "🌐", text: "Professional online presence" },
                    {
                      icon: "⚡",
                      text: "Fast-loading, mobile-optimized pages",
                    },
                    { icon: "🎯", text: "Targeted keyword optimization" },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-primary-700"
                    >
                      <span className="text-xl">{benefit.icon}</span>
                      <span className="text-lg font-medium">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Demonstration */}
          {/* <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm  border-2 border-white/50 p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-primary-800 text-center mb-8">
              See the Power in Action
            </h3>

            <div className="flex flex-row items-center justify-between gap-6">
              <div className="text-center">
                <div className="bg-red-100 border-2 border-red-300  p-4 mb-4">
                  <div className="text-red-700 font-bold mb-2">
                    Without Dedicated Pages
                  </div>
                  <div className="text-red-600 text-sm space-y-1 font-medium">
                    <div>❌ No search visibility</div>
                    <div>❌ No backlinks</div>
                    <div>❌ Limited discoverability</div>
                  </div>
                </div>
                <div className="text-primary-600 text-sm font-medium">
                  Traditional ad networks
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight
                  size={32}
                  className="text-primary-400 hidden md:block"
                />
                <div className="text-primary-400 md:hidden text-2xl">↓</div>
              </div>

              <div className="text-center">
                <div className="bg-green-100 border-2 border-[#3CFF66]  p-4 mb-4">
                  <div className="text-green-700 font-bold mb-2">
                    With Common Ad Network
                  </div>
                  <div className="text-green-600 text-sm space-y-1 font-medium">
                    <div>✅ Google indexable pages</div>
                    <div>✅ Quality backlinks</div>
                    <div>✅ SEO-optimized content</div>
                  </div>
                </div>
                <div className="text-primary-600 text-sm font-medium">
                  Our approach
                </div>
              </div>
            </div>
          </div> */}

          {/* Call to Action */}
          {/* <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-[#F1FF89] to-[#3CFF66]  p-8 shadow-2xl border-2 border-white/30">
              <div className="text-center sm:text-left">
                <h4 className="text-2xl font-bold text-primary-800 mb-2">
                  Ready to Boost Your SEO?
                </h4>
                <p className="text-primary-700 font-medium">
                  Join hundreds of indie makers already benefiting from
                  dedicated SEO pages
                </p>
              </div>
              <Link
                href="/register"
                className="bg-primary-600 text-white px-8 py-4  font-bold text-lg hover:bg-primary-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-primary-500"
              >
                Get SEO Benefits
                <RocketIcon size={24} />
              </Link>
            </div>
          </div> */}
        </div>
      </section>

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
            {/* <input
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
            </button> */}
            <Link
              href={"/register"}
              className="bg-[#5C6657] text-white font-serif text-lg sm:text-xl lg:text-2xl px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#4a523f] transition-colors flex items-center gap-4 disabled:opacity-50"
            >
              Sign Up for Free
              <RocketIcon size={24} className="sm:w-8 sm:h-8" />
            </Link>
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
