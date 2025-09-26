"use client";

import Link from "next/link";
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
} from "@phosphor-icons/react";

export default function Home() {
  const { user } = useAuth();

  // Redirect authenticated users to dashboard
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="bg-[#EBF1EC]">
      {/* Hero Section */}
      <section className="hero w-full">
        <div className="flex flex-row">
          <div className="left w-1/2 bg-primary-500 p-20">
            <h1 className="block text-[164px] leading-[188px] text-white mb-6">
              <span className="text-[#F1FF89]">Give</span> clicks,{" "}
              <span className="text-[#F1FF89]">Get</span> clicks
            </h1>
            <p className="text-[24px] leading-[46px] text-white font-sans">
              With Common Ad Network, indie makers can support each other
              through mutual advertising. By allowing ads to display on your
              site, you will earn a place on others.
            </p>
            <div className="relative">
              {/** TODO: Enable Request Invite button */}

              <button className="absolute top-4 bg-[#5C6657] text-white font-serif text-2xl px-8 py-4 mt-4 hover:bg-[#4a523f] transition-colors flex items-center gap-4">
                Request Invite <MailboxIcon size={32} />
              </button>
            </div>
          </div>
          <div className="right w-1/2">
            <div className="ad w-full">
              <img className="block " src="/stunts-ad-common.png" />
              <div className="flex flex-row justify-between font-sans bg-[#5C6657] p-6 text-white text-balance">
                <div>
                  <span className="block">Stunts - Make Videos Easily</span>
                  <span className="block text-sm text-gray-300">
                    Stunts enables anyone to generate animation keyframes for
                    engaging videos
                  </span>
                </div>
                <div>
                  <ArrowRightIcon size={32} />
                </div>
              </div>
            </div>
            <div className="ad w-[408px]">
              <img className="block " src="/ov-ad-common.png" />
              <div className="flex flex-row justify-between font-sans bg-[#5C6657] p-6 text-white text-balance">
                <div>
                  <span className="block">Try Our Virtue</span>
                  <span className="block text-sm text-gray-300">
                    Our Virtue is a book of poems covering various godly beliefs
                  </span>
                </div>
                <div>
                  <ArrowRightIcon size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="how mt-20 mb-20">
        <div>
          <div className="w-[300px] text-center ml-10 p-4 bg-primary-500">
            <h1 className="text-7xl text-[#F1FF89]">How?</h1>
          </div>
          <div className="flex flex-row bg-linear-65 from-[rgba(249,249,47,0.5)] to-[rgba(104,255,66,0.5)] font-sans font-medium">
            <div className="step pt-16 pb-16 text-[#4294FF] w-1/3 flex flex-row justify-center text-center">
              <div className="flex flex-col items-center gap-4 w-full max-w-[270px]">
                <TrophyIcon size={48} />
                <span className="text-lg">Earn Karma</span>
                <hr className="w-4" />
                <p>
                  Display ads on your site and earn karma based on genuine
                  clicks. Higher CTR = more karma rewards.
                </p>
              </div>
            </div>
            <div className="step pt-16 pb-16 w-1/3 flex flex-row justify-center text-center scale-110 items-center bg-[#FFE4E9] text-[#ED3C5A] border-1 border-solid border-[#ED3C5A]">
              <div className="flex flex-col items-center gap-4 w-full max-w-[270px]">
                <ChartLineUpIcon size={48} />
                <span className="text-lg">Spend Karma</span>
                <hr className="w-4" />
                <p>
                  Use your earned karma to promote your own products across the
                  entire network of indie maker sites.
                </p>
              </div>
            </div>
            <div className="step pt-16 pb-16 w-1/3 flex flex-row justify-center text-center">
              <div className="flex flex-col items-center gap-4 w-full max-w-[270px]">
                <LockIcon size={48} />
                <span className="text-lg">Fraud Detection</span>
                <hr className="w-4" />
                <p>
                  Advanced click validation with IP geolocation and behavioral
                  analysis. Only genuine clicks count.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Karma System Explanation */}
      <div className="px-10 mb-20">
        <div className="">
          <div className="">
            <h2 className="text-[128px] leading-[164px] text-primary-500">
              Fair & Balanced
            </h2>
          </div>
          <div className="flex flex-row">
            <div>
              <p className="text-[128px] leading-[164px]">
                Karma
                <br />
                System
              </p>
            </div>
            <div className="flex-grow pl-10 pt-4">
              <div className="font-sans grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    1 Karma
                  </div>
                  <div className="font-sans text-sm font-medium text-red-700 mb-3">
                    1% CTR
                  </div>
                  <p className="font-sans text-sm text-red-600">
                    Base reward for legitimate clicks
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    10 Karma
                  </div>
                  <div className="font-sans text-sm font-medium text-primary-700 mb-3">
                    5% CTR
                  </div>
                  <p className="font-sans text-sm text-primary-600">
                    Good quality traffic
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
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

              <div className="font-sans mt-8 p-6 bg-accent-50 border border-accent-200">
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
      <div className="py-24 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-14">
            Ready to Join the Community?
          </h2>
          {/** TODO: Enable Request Invite button */}
          <button className="mx-auto bg-[#5C6657] text-white font-serif text-2xl px-8 py-4 mt-4 hover:bg-[#4a523f] transition-colors flex items-center gap-4">
            Request Invite <MailboxIcon size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
