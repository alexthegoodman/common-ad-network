'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMark, Copy, CheckCircle } from '@phosphor-icons/react'

interface EmbedModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export default function EmbedModal({ isOpen, onClose, userId }: EmbedModalProps) {
  const [copied, setCopied] = useState('')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://common-ad-network.vercel.app'

  const embedCode = `<!-- Common Ad Network -->
<div id="common-ad-container" data-common-ad data-site-id="${userId}"></div>
<script src="${baseUrl}/embed.js"></script>`

  const jsCode = `// Load Common Ad Network
CommonAdNetwork.loadAd('your-ad-container', '${userId}', {
  width: '400px' // optional
});`

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    })
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25" />
      
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Embed Ads on Your Site
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMark size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                How it works
              </h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-primary-800">
                  <li>• Add the embed code to your website</li>
                  <li>• Earn karma when visitors click on ads (CTR-based rewards)</li>
                  <li>• Get bonus karma (50%) if you're a smaller site (&lt;1000 karma)</li>
                  <li>• Only 1 valid click per visitor per day (spam protection)</li>
                  <li>• Use your karma to promote your own ads on other sites</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                HTML Embed Code
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Copy and paste this code where you want the ad to appear on your website:
              </p>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{embedCode}</code>
                </pre>
                <button
                  onClick={() => handleCopy(embedCode, 'html')}
                  className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  {copied === 'html' ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                JavaScript API
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                For more control, use the JavaScript API:
              </p>
              
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{jsCode}</code>
                </pre>
                <button
                  onClick={() => handleCopy(jsCode, 'js')}
                  className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  {copied === 'js' ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <h4 className="font-medium text-accent-900 mb-2">Your Site ID</h4>
              <div className="flex items-center gap-3">
                <code className="bg-white px-3 py-1 rounded border text-sm font-mono">
                  {userId}
                </code>
                <button
                  onClick={() => handleCopy(userId, 'id')}
                  className="text-accent-600 hover:text-accent-700 transition-colors"
                >
                  {copied === 'id' ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-sm text-accent-700 mt-2">
                This is your unique site identifier. Keep it safe and don't share it publicly.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}