'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import EmbedModal from '@/components/EmbedModal'
import Link from 'next/link'
import { Code, Copy, CheckCircle } from '@phosphor-icons/react'

export default function EmbedPage() {
  const { user, isLoading } = useAuth()
  const [copied, setCopied] = useState('')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view this page.</p>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://common-ad-network.vercel.app'

  const embedCode = `<!-- Common Ad Network -->
<div id="common-ad-container" data-common-ad data-site-id="${user.id}"></div>
<script src="${baseUrl}/embed.js"></script>`

  const jsCode = `// Load Common Ad Network
CommonAdNetwork.loadAd('your-ad-container', '${user.id}', {
  width: '400px' // optional
});`

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Code size={32} className="text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Embed Ads on Your Site</h1>
          </div>
          <p className="text-gray-600">
            Add our embed code to your website and start earning karma from genuine clicks.
          </p>
        </div>

        <div className="space-y-8">
          {/* How it Works */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How it works</h2>
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <ul className="space-y-3 text-primary-800">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Add the embed code to your website where you want ads to appear</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Earn karma when visitors click on ads (CTR-based rewards: 1-40 karma per click)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Get bonus karma (50%) if you're a smaller site (&lt;1000 karma)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Only 1 valid click per visitor per day (spam protection)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use your karma to promote your own ads on other sites</span>
                </li>
              </ul>
            </div>
          </div>

          {/* HTML Embed Code */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">HTML Embed Code</h2>
            <p className="text-gray-600 mb-4">
              Copy and paste this code where you want the ad to appear on your website:
            </p>
            
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
              <button
                onClick={() => handleCopy(embedCode, 'html')}
                className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {copied === 'html' ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* JavaScript API */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">JavaScript API</h2>
            <p className="text-gray-600 mb-4">
              For more control, use the JavaScript API after including our script:
            </p>
            
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto">
                <code>{jsCode}</code>
              </pre>
              <button
                onClick={() => handleCopy(jsCode, 'js')}
                className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {copied === 'js' ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Your Site ID */}
          <div className="bg-accent-50 border border-accent-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-accent-900 mb-4">Your Site ID</h2>
            <div className="flex items-center gap-4">
              <code className="bg-white px-4 py-2 rounded-lg border text-lg font-mono flex-1">
                {user.id}
              </code>
              <button
                onClick={() => handleCopy(user.id, 'id')}
                className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                {copied === 'id' ? <CheckCircle size={20} /> : <Copy size={20} />}
                Copy
              </button>
            </div>
            <p className="text-sm text-accent-700 mt-3">
              This is your unique site identifier. Keep it safe and don't share it publicly.
            </p>
          </div>

          {/* Performance Tips */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Better Performance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ad Placement</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Place ads where users naturally look</li>
                  <li>• Above the fold for better visibility</li>
                  <li>• Within content for better engagement</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Site Quality</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Target relevant audiences</li>
                  <li>• Maintain good site performance</li>
                  <li>• Create engaging content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}