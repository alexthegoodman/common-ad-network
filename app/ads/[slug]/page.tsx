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
} from "@phosphor-icons/react";
import { parseAdSlug, createAdSlug, createCompanySlug } from "@/app/lib/slugs";

interface Ad {
  id: string;
  headline: string;
  description: string;
  imageUrl?: string;
  linkUrl: string;
  category?: string;
  impressions: number;
  clicks: number;
  createdAt: string;
  user: {
    id: string;
    companyName: string;
    companyLink: string;
    companyDescription?: string;
    profilePic?: string;
    karma: number;
  };
}

export default function AdDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { id } = parseAdSlug(params.slug as string);
        const response = await fetch(`/api/ads/${id}`);
        if (!response.ok) {
          throw new Error("Ad not found");
        }
        const data = await response.json();
        setAd(data.ad);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load ad");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchAd();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Ad Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The ad you're looking for doesn't exist."}
          </p>
          <Link
            href="/ads"
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Browse All Ads
          </Link>
        </div>
      </div>
    );
  }

  const ctr =
    ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : 0;

  return (
    <>
      <Head>
        <title>
          {ad.headline} - {ad.user.companyName} | Common Ad Network
        </title>
        <meta
          name="description"
          content={`${ad.description} - Discover ${ad.user.companyName} on Common Ad Network, the platform for indie makers to promote their products through mutual advertising.`}
        />
        <meta
          property="og:title"
          content={`${ad.headline} - ${ad.user.companyName}`}
        />
        <meta property="og:description" content={ad.description} />
        {ad.imageUrl && <meta property="og:image" content={ad.imageUrl} />}
        <meta
          property="og:url"
          content={`${window.location.origin}/ads/${createAdSlug(ad.headline, ad.id)}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${window.location.origin}/ads/${createAdSlug(ad.headline, ad.id)}`} />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Link
              href="/ads"
              className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              All Ads
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {ad.headline}
            </span>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Ad Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Ad Preview */}
                <div className="p-8">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar size={16} />
                      Published {new Date(ad.createdAt).toLocaleDateString()}
                      {ad.category && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                            {ad.category}
                          </span>
                        </>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {ad.headline}
                    </h1>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {ad.description}
                    </p>
                  </div>

                  {/* Ad Visual */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Ad Preview
                    </h2>
                    <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                      {ad.imageUrl ? (
                        <img
                          src={ad.imageUrl}
                          alt={ad.headline}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                          <Target size={48} className="text-primary-600" />
                        </div>
                      )}
                      <div className="p-4 bg-white">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {ad.headline}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {ad.description}
                        </p>
                        <a
                          href={ad.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          Visit Website
                          <LinkIcon size={16} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Performance
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                          <Eye size={24} className="text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {ad.impressions}
                        </div>
                        <div className="text-sm text-gray-600">Impressions</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                          <Target size={24} className="text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {ad.clicks}
                        </div>
                        <div className="text-sm text-gray-600">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                          <ChartBarIcon size={24} className="text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {ctr}%
                        </div>
                        <div className="text-sm text-gray-600">CTR</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Company
                </h3>
                <div className="flex items-start gap-4">
                  {ad.user.profilePic ? (
                    <img
                      src={ad.user.profilePic}
                      alt={ad.user.companyName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <User size={24} className="text-primary-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Link
                      href={`/companies/${createCompanySlug(ad.user.companyName, ad.user.id)}`}
                      className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {ad.user.companyName}
                    </Link>
                    <div className="text-sm text-gray-600 mb-2">
                      {ad.user.karma} karma
                    </div>
                    {ad.user.companyDescription && (
                      <p className="text-sm text-gray-700 mb-3">
                        {ad.user.companyDescription}
                      </p>
                    )}
                    <a
                      href={ad.user.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                    >
                      Visit Website
                      <LinkIcon size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Ad Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <a
                    href={ad.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Visit {ad.user.companyName}
                    <LinkIcon size={18} />
                  </a>
                  <Link
                    href={`/companies/${createCompanySlug(ad.user.companyName, ad.user.id)}`}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    View Company Profile
                    <User size={18} />
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Share
                </h3>
                <div className="text-sm text-gray-600">
                  Help promote this ad by sharing with other indie makers:
                </div>
                <input
                  type="text"
                  value={`${window.location.origin}/ads/${createAdSlug(ad.headline, ad.id)}`}
                  readOnly
                  className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                  onClick={(e) => e.currentTarget.select()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
