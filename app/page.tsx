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
} from "@phosphor-icons/react";

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

      {/* Special Ad Types Section */}
      {/* <section className="special-ads pt-8 sm:pt-16 pb-10 sm:pb-20 bg-slate-50">
        <div className="px-4 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[128px] leading-tight lg:leading-[154px] text-slate-700 mb-6">
                Special
                <br />
                <span className="text-primary-500">Ad Types</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 font-sans max-w-3xl mx-auto">
                In addition to image ads and text ads, engage your audience with
                interactive experiences that drive real results.
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
                  Surveys & Polls
                </button>
                <button
                  onClick={() => setActiveTab("email")}
                  className={`px-6 py-3 font-sans font-medium transition-all ${
                    activeTab === "email"
                      ? "bg-primary-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Email Collection
                </button>
                <button
                  onClick={() => setActiveTab("download")}
                  className={`px-6 py-3 font-sans font-medium transition-all ${
                    activeTab === "download"
                      ? "bg-primary-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Downloadable Incentives
                </button>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 shadow-lg min-h-[400px]">
              {activeTab === "survey" && (
                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 font-sans">
                        Engage with Surveys & Polls
                      </h3>
                      <p className="text-slate-600 font-sans text-lg leading-relaxed mb-6">
                        Collect valuable insights from your audience while
                        providing an interactive experience that drives
                        engagement.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-sans">
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Real-time poll results
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Multiple choice questions
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Audience insights dashboard
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

              {activeTab === "email" && (
                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 font-sans">
                        Build Your Email List
                      </h3>
                      <p className="text-slate-600 font-sans text-lg leading-relaxed mb-6">
                        Convert visitors into subscribers with compelling email
                        capture forms that offer real value.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-sans">
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Custom form designs
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Double opt-in compliance
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Integration with email tools
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 border border-green-200">
                      <div className="bg-white p-6 border border-green-300">
                        <div className="text-center mb-4">
                          <h4 className="font-sans font-bold text-slate-800 text-xl mb-2">
                            Get Weekly Indie Maker Tips
                          </h4>
                          <p className="font-sans text-sm text-slate-600">
                            Join 2,500+ makers getting actionable insights every
                            Tuesday
                          </p>
                        </div>
                        <form className="space-y-3">
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-slate-300 font-sans text-sm focus:border-green-500 focus:outline-none"
                          />
                          <button className="w-full bg-green-500 text-white py-3 font-sans font-medium hover:bg-green-600 transition-colors">
                            Subscribe Now
                          </button>
                        </form>
                        <p className="font-sans text-xs text-slate-500 text-center mt-3">
                          No spam. Unsubscribe anytime.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "download" && (
                <div className="p-8 sm:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 font-sans">
                        Offer Valuable Downloads
                      </h3>
                      <p className="text-slate-600 font-sans text-lg leading-relaxed mb-6">
                        Provide immediate value with downloadable resources that
                        capture leads and showcase your expertise.
                      </p>
                      <ul className="space-y-3 text-slate-600 font-sans">
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          PDF guides & checklists
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Code templates & tools
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          Exclusive content access
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 border border-purple-200">
                      <div className="bg-white p-6 border border-purple-300">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-purple-500 mx-auto mb-3 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              PDF
                            </span>
                          </div>
                          <h4 className="font-sans font-bold text-slate-800 text-xl mb-2">
                            The Complete SaaS Launch Checklist
                          </h4>
                          <p className="font-sans text-sm text-slate-600 mb-4">
                            47-point checklist used by successful indie makers
                            to launch their products
                          </p>
                        </div>
                        <form className="space-y-3">
                          <input
                            type="email"
                            placeholder="Enter your email for instant download"
                            className="w-full px-4 py-3 border border-slate-300 font-sans text-sm focus:border-purple-500 focus:outline-none"
                          />
                          <button className="w-full bg-purple-500 text-white py-3 font-sans font-medium hover:bg-purple-600 transition-colors">
                            Download Free Checklist
                          </button>
                        </form>
                        <div className="flex items-center justify-center gap-2 mt-3 text-slate-500 text-xs">
                          <span>✓ Instant download</span>
                          <span>•</span>
                          <span>✓ No spam</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section> */}

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
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p className="mt-4 text-slate-600 font-sans">
                  Loading network ads...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {networkAds.slice(0, 8).map((ad: any) => (
                    <div
                      key={ad.id}
                      className="bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group "
                    >
                      {ad.imageUrl ? (
                        <div
                          className="relative h-32 overflow-hidden cursor-pointer"
                          onClick={() => window.open(ad.linkUrl, "_blank")}
                        >
                          <img
                            src={ad.imageUrl}
                            alt={ad.headline}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />

                          <div className="absolute opacity-0 hover:opacity-80 top-0 left-0 right-0 bottom-0 bg-gray-500">
                            <span className="text-white text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              Visit {ad.user.companyName}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="relative h-32 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center cursor-pointer"
                          onClick={() => window.open(ad.linkUrl, "_blank")}
                        >
                          <div className="w-16 h-16 bg-white/80 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🚀</span>
                          </div>

                          <div className="absolute opacity-0 hover:opacity-80 top-0 left-0 right-0 bottom-0 bg-gray-500">
                            <span className="text-white text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              Visit {ad.user.companyName}
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

                        <div className="flex flex-row items-center gap-2 mt-1 mb-1 ">
                          {ad.user.profilePic ? (
                            <img
                              src={ad.user.profilePic}
                              alt={ad.user.companyName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <></>
                          )}

                          <p className="font-sans text-xs text-slate-500 truncate">
                            Message the founder of {ad.user.companyName} (
                            {ad.user.karma} karma)
                            {/** Add Info Hyperlink for explanation */}
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
                                onClick={() =>
                                  setMessageDisplay(!messageDisplay)
                                }
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
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
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
                      <div
                        key={member.id}
                        className="text-center group cursor-pointer"
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
                      </div>
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
