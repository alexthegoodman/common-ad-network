'use client'

import { useState, useEffect } from 'react'
import { Plus, MagnifyingGlass } from '@phosphor-icons/react'
import AdCard from './AdCard'
import AddAdForm from './AddAdForm'
import { useAuth } from '@/app/contexts/AuthContext'

interface Ad {
  id: string
  headline: string
  description: string
  imageUrl: string
  linkUrl: string
  impressions: number
  clicks: number
  createdAt: string
  userId: string
  user: {
    companyName: string
    profilePic?: string
  }
}

interface BrowseAdsProps {
  showMyAds?: boolean
  showAddButton?: boolean
}

export default function BrowseAds({ showMyAds = false, showAddButton = true }: BrowseAdsProps) {
  const [ads, setAds] = useState<Ad[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuth()

  const fetchAds = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (showMyAds) {
        // We'll need to get the current user ID from context/auth
        // For now, we'll fetch all ads
      }

      const response = await fetch(`/api/ads?${params}`)
      if (!response.ok) throw new Error('Failed to fetch ads')
      
      const data = await response.json()
      setAds(data.ads)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ads')
    } finally {
      setIsLoading(false)
    }
  }

  const removeAd = async (adId: string) => {
    try {
      const response = await fetch(`/api/ads/${adId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to remove ad')
      
      // Remove the ad from the local state
      setAds(prevAds => prevAds.filter(ad => ad.id !== adId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove ad')
    }
  }

  useEffect(() => {
    fetchAds()
  }, [showMyAds])

  const filteredAds = ads.filter(ad =>
    ad.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.user.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-xl aspect-[4/3]" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">{error}</div>
        <button
          onClick={fetchAds}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search ads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {showAddButton && (
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={20} />
            Add Ad
          </button>
        )}
      </div>

      {filteredAds.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchQuery ? 'No ads match your search' : showMyAds ? 'You haven\'t created any ads yet' : 'No ads available'}
          </div>
          {showAddButton && !searchQuery && (
            <button
              onClick={() => setIsAddFormOpen(true)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Create your first ad
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <AdCard 
              key={ad.id} 
              ad={ad} 
              showStats={showMyAds} 
              currentUserId={user?.id}
              onRemoveAd={removeAd}
            />
          ))}
        </div>
      )}

      <AddAdForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSuccess={fetchAds}
      />
    </div>
  )
}