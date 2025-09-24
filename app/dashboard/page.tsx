"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Dashboard from "@/app/components/Dashboard";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
      <h4>Dashboard coming soon!</h4>
    </div>
  );

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-gray-900 mb-4">
  //           Access Denied
  //         </h1>
  //         <p className="text-gray-600 mb-6">
  //           You need to be logged in to view this page.
  //         </p>
  //         <Link
  //           href="/login"
  //           className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
  //         >
  //           Sign In
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="min-h-screen bg-gray-50 py-8">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       {/* Header */}
  //       <div className="mb-8">
  //         <div className="flex items-center justify-between">
  //           <div>
  //             <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
  //             <p className="text-gray-600 mt-1">
  //               Welcome back, {user.companyName}! Here's how your ads are
  //               performing.
  //             </p>
  //           </div>
  //           <Link
  //             href="/ads/new"
  //             className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
  //           >
  //             <Plus size={20} />
  //             Create Ad
  //           </Link>
  //         </div>
  //       </div>

  //       {/* Dashboard Component */}
  //       <Dashboard />
  //     </div>
  //   </div>
  // );
}
