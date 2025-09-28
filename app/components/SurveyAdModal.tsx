"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@phosphor-icons/react";

interface Survey {
  id: string;
  question: string;
  options: string[];
}

interface Ad {
  id: string;
  headline: string;
  description: string;
  imageUrl?: string;
  survey: Survey;
  user: {
    companyName: string;
    profilePic?: string;
  };
}

interface SurveyAdModalProps {
  ad: Ad;
  isOpen: boolean;
  onClose: () => void;
}

export default function SurveyAdModal({ ad, isOpen, onClose }: SurveyAdModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) {
      setError("Please select an option");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/surveys/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          surveyId: ad.survey.id,
          selectedOption,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit response");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedOption("");
    setIsSubmitted(false);
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="font-sans mx-auto max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Survey
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>

          <div className="mb-6">
            {ad.imageUrl && (
              <img
                src={ad.imageUrl}
                alt={ad.headline}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex items-center gap-3 mb-3">
              {ad.user.profilePic && (
                <img
                  src={ad.user.profilePic}
                  alt={ad.user.companyName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{ad.headline}</h3>
                <p className="text-sm text-gray-500">{ad.user.companyName}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{ad.description}</p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600 mb-6">Your response has been recorded.</p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">{ad.survey.question}</h4>
                <div className="space-y-3">
                  {ad.survey.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="survey-option"
                        value={option}
                        checked={selectedOption === option}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedOption}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Response"}
                </button>
              </div>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}