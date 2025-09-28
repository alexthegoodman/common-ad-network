"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import {
  ArrowLeft,
  LinkIcon,
  User,
  Calendar,
  ChartBarIcon,
  Eye,
  Target,
  Trophy,
  MapPin,
  Users,
} from "@phosphor-icons/react";
import { parseCompanySlug, createCompanySlug, createAdSlug } from "@/app/lib/slugs";

interface Company {
  id: string;
  companyName: string;
  companyLink: string;
  companyDescription?: string;
  profilePic?: string;
  karma: number;
  category?: string;
  createdAt: string;
  ads: Array<{
    id: string;
    headline: string;
    description: string;
    imageUrl?: string;
    linkUrl: string;
    category?: string;
    impressions: number;
    clicks: number;
    createdAt: string;
    isActive: boolean;
  }>;
}

export default function CompanyProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { id } = parseCompanySlug(params.slug as string);
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Company not found");
        }
        const data = await response.json();
        setCompany(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load company");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchCompany();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Company Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The company you're looking for doesn't exist."}
          </p>
          <Link
            href="/"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const activeAds = company.ads.filter((ad) => ad.isActive);
  const totalImpressions = company.ads.reduce(
    (sum, ad) => sum + ad.impressions,
    0
  );
  const totalClicks = company.ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const averageCTR =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(2)
      : 0;

  return (
    <>
      <Head>
        <title>
          {company.companyName} - Company Profile | Common Ad Network
        </title>
        <meta
          name="description"
          content={`${
            company.companyDescription ||
            `Discover ${company.companyName} on Common Ad Network`
          } - ${
            company.karma
          } karma points. Join the indie maker community for mutual advertising and SEO benefits.`}
        />
        <meta
          property="og:title"
          content={`${company.companyName} - Company Profile`}
        />
        <meta
          property="og:description"
          content={
            company.companyDescription ||
            `Discover ${company.companyName} on Common Ad Network`
          }
        />
        {company.profilePic && (
          <meta property="og:image" content={company.profilePic} />
        )}
        <meta
          property="og:url"
          content={`${window.location.origin}/companies/${createCompanySlug(company.companyName, company.id)}`}
        />
        <meta name="twitter:card" content="summary" />
        <link
          rel="canonical"
          href={`${window.location.origin}/companies/${createCompanySlug(company.companyName, company.id)}`}
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {company.companyName}
            </span>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Company Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0">
                {company.profilePic ? (
                  <img
                    src={company.profilePic}
                    alt={company.companyName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                  />
                ) : (
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center border-4 border-primary-200">
                    <User size={40} className="text-primary-600" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {company.companyName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Trophy size={16} className="text-primary-500" />
                        {company.karma} karma
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        Member since{" "}
                        {new Date(company.createdAt).toLocaleDateString()}
                      </div>
                      {company.category && (
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                          {company.category}
                        </span>
                      )}
                    </div>
                    {company.companyDescription && (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {company.companyDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <a
                      href={company.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
                    >
                      Visit Website
                      <LinkIcon size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Performance Overview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Performance Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                      <Target size={20} className="text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {activeAds.length}
                    </div>
                    <div className="text-sm text-gray-600">Active Ads</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                      <Eye size={20} className="text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalImpressions}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Impressions
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                      <ChartBarIcon size={20} className="text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalClicks}
                    </div>
                    <div className="text-sm text-gray-600">Total Clicks</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
                      <Trophy size={20} className="text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {averageCTR}%
                    </div>
                    <div className="text-sm text-gray-600">Avg CTR</div>
                  </div>
                </div>
              </div>

              {/* Active Ads */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Active Ads ({activeAds.length})
                </h2>
                {activeAds.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeAds.map((ad) => (
                      <Link
                        key={ad.id}
                        href={`/ads/${createAdSlug(ad.headline, ad.id)}`}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                      >
                        {ad.imageUrl ? (
                          <img
                            src={ad.imageUrl}
                            alt={ad.headline}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                            <Target size={32} className="text-primary-600" />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {ad.headline}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {ad.description}
                          </p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{ad.impressions} impressions</span>
                            <span>{ad.clicks} clicks</span>
                            <span>
                              {ad.impressions > 0
                                ? ((ad.clicks / ad.impressions) * 100).toFixed(
                                    1
                                  )
                                : 0}
                              % CTR
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Target size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No active ads at the moment</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Company Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Ads</span>
                    <span className="font-semibold text-gray-900">
                      {company.ads.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Ads</span>
                    <span className="font-semibold text-gray-900">
                      {activeAds.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Karma Score</span>
                    <span className="font-semibold text-primary-600">
                      {company.karma}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(company.createdAt).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <a
                    href={company.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Visit Website
                    <LinkIcon size={18} />
                  </a>
                  <Link
                    href="/feed"
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    View Social Feed
                    <Users size={18} />
                  </Link>
                </div>
              </div>

              {/* Share Profile */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Share Profile
                </h3>
                <div className="text-sm text-gray-600 mb-3">
                  Share this company profile with other indie makers:
                </div>
                <input
                  type="text"
                  value={`${window.location.origin}/companies/${createCompanySlug(company.companyName, company.id)}`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                  onClick={(e) => e.currentTarget.select()}
                />
              </div>

              {/* SEO Benefits Info */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border border-primary-200 p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">
                  SEO Benefits
                </h3>
                <div className="text-sm text-primary-700 space-y-2">
                  <p>✓ Dedicated company page with unique URL</p>
                  <p>✓ Improved search engine visibility</p>
                  <p>✓ Backlinks to your website</p>
                  <p>✓ Professional online presence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
