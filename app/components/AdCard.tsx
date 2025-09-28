"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, HandPointingIcon, Trash, Info } from "@phosphor-icons/react";
import { createAdSlug } from "@/app/lib/slugs";
import SurveyAdModal from "./SurveyAdModal";

interface Ad {
  id: string;
  headline: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  type: string;
  impressions: number;
  clicks: number;
  createdAt: string;
  userId: string;
  user: {
    companyName: string;
    profilePic?: string;
  };
  survey?: {
    id: string;
    question: string;
    options: string[];
  };
}

interface AdCardProps {
  ad: Ad;
  showStats?: boolean;
  onAdClick?: (adId: string) => void;
  currentUserId?: string;
  onRemoveAd?: (adId: string) => void;
}

export default function AdCard({
  ad,
  showStats = false,
  onAdClick,
  currentUserId,
  onRemoveAd,
}: AdCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  const handleClick = () => {
    if (onAdClick) {
      onAdClick(ad.id);
    } else if (ad.type === "regular" && ad.linkUrl) {
      window.open(ad.linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveAd) {
      onRemoveAd(ad.id);
    }
  };

  const isOwnAd = currentUserId && ad.userId === currentUserId;

  const ctr =
    ad.impressions > 0
      ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden  relative">
      {isOwnAd && (
        <button
          onClick={handleRemoveClick}
          className="absolute top-2 right-2 z-10 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
          title="Remove ad"
        >
          <Trash size={16} />
        </button>
      )}
      {ad.imageUrl && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={
              imageError
                ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4="
                : ad.imageUrl
            }
            alt={ad.headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          {ad.user.profilePic && (
            <img
              src={ad.user.profilePic}
              // alt={ad.user.companyName}
              className="w-8 h-8 rounded-full"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 cursor-pointer"
              onClick={handleClick}
            >
              {ad.headline}
            </h3>
            {/* <p className="text-sm text-gray-500 mt-1">{ad.user.companyName}</p> */}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {ad.description}
        </p>

        {ad.type === "survey" && ad.survey && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-800 mb-2">
              {ad.survey.question}
            </p>
            <div className="space-y-1">
              {ad.survey.options.slice(0, 2).map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-600">{option}</span>
                </div>
              ))}
              {ad.survey.options.length > 2 && (
                <div className="text-xs text-gray-500 pl-5">
                  +{ad.survey.options.length - 2} more options
                </div>
              )}
            </div>
            <div className="mt-2">
              <button
                className="text-xs bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSurveyModal(true);
                }}
              >
                Participate in Survey
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {showStats && (
            <div className="flex gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Eye size={12} />
                <span>{ad.impressions.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-1">
                <HandPointingIcon size={12} />
                <span>{ad.clicks} clicks</span>
              </div>
              <div>
                <span className="font-medium">{ctr}% CTR</span>
              </div>
            </div>
          )}
          <Link
            href={`/ads/${createAdSlug(ad.headline, ad.id)}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium"
          >
            <Info size={12} />
            View Details
          </Link>
        </div>
      </div>

      {ad.type === "survey" && ad.survey && (
        <SurveyAdModal
          ad={{
            id: ad.id,
            headline: ad.headline,
            description: ad.description,
            imageUrl: ad.imageUrl,
            survey: ad.survey,
            user: ad.user,
          }}
          isOpen={showSurveyModal}
          onClose={() => setShowSurveyModal(false)}
        />
      )}
    </div>
  );
}
