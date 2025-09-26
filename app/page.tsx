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
} from "@phosphor-icons/react";

export default function Home() {
  const { user } = useAuth();

  // Redirect authenticated users to dashboard
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="bg-accent-50">
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
          <div className="w-[300px] text-center ml-10 bg-primary-600">
            <h1 className="text-7xl text-accent-300">How?</h1>
          </div>
          <div className="flex flex-row bg-linear-to-r from=[#F9F92F] to-[#68FF42] font-sans font-medium">
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
    </div>
  );
}
