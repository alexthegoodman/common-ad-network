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
} from "@phosphor-icons/react";

export default function Home() {
  const { user } = useAuth();

  // Redirect authenticated users to dashboard
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Ad Network for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                Indie Makers
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
              Join the invite-only community where indie makers support each
              other. Earn karma by displaying ads, spend karma to promote your
              projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <p className="text-sm text-gray-500">
                Invite code required • Free to join
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Common Ad Network Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A fair, transparent ad exchange designed by indie makers, for
              indie makers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy size={24} className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Earn Karma
              </h3>
              <p className="text-gray-600 text-sm">
                Display ads on your site and earn karma based on genuine clicks.
                Higher CTR = more karma rewards.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendUp size={24} className="text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Spend Karma
              </h3>
              <p className="text-gray-600 text-sm">
                Use your earned karma to promote your own products across the
                entire network of indie maker sites.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fraud Protection
              </h3>
              <p className="text-gray-600 text-sm">
                Advanced click validation with IP geolocation and behavioral
                analysis. Only genuine clicks count.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600 text-sm">
                Connect with fellow indie makers in our social feed. Share
                ideas, collaborate, and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Karma System Explanation */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fair Karma Rewards System
            </h2>
            <p className="text-lg text-gray-600">
              Rewards scale with your site's performance, encouraging quality
              traffic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100">
              <div className="text-3xl font-bold text-red-600 mb-2">
                1 Karma
              </div>
              <div className="text-sm font-medium text-red-700 mb-3">
                1% CTR
              </div>
              <p className="text-sm text-red-600">
                Base reward for legitimate clicks
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                10 Karma
              </div>
              <div className="text-sm font-medium text-primary-700 mb-3">
                5% CTR
              </div>
              <p className="text-sm text-primary-600">Good quality traffic</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                40 Karma
              </div>
              <div className="text-sm font-medium text-green-700 mb-3">
                20% CTR
              </div>
              <p className="text-sm text-green-600">Excellent engagement</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-accent-50 rounded-xl border border-accent-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-accent-600" />
              <span className="font-semibold text-accent-900">
                Bonus for Smaller Sites
              </span>
            </div>
            <p className="text-sm text-accent-700">
              Sites with less than 1,000 karma earn 50% bonus rewards to help
              level the playing field
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get your invite code from an existing member and start earning karma
            today
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
          >
            Get Started <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Trophy size={20} className="text-white" weight="bold" />
            </div>
            <span className="text-xl font-bold">Common Ad Network</span>
          </div>
          <p className="text-gray-400 text-sm">
            Built by indie makers, for indie makers. Support the community that
            supports you.
          </p>
        </div>
      </footer>
    </div>
  );
}
