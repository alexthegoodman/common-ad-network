'use client'

import { useState, useEffect } from 'react'
import { 
  Eye, 
  MousePointer, 
  TrendUp, 
  Trophy, 
  Calendar,
  Globe
} from '@phosphor-icons/react'

interface AnalyticsData {
  overview: {
    totalAds: number
    totalImpressions: number
    totalClicks: number
    totalCTR: string
    karma: number
  }
  dailyData: {
    date: string
    clicks: number
  }[]
  topAds: {
    id: string
    headline: string
    clicks: number
    impressions: number
    ctr: string
  }[]
  countryData: {
    country: string
    clicks: number
  }[]
}

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/analytics')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      
      const data = await response.json()
      setAnalytics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-200 animate-pulse rounded-xl h-80" />
          <div className="bg-gray-200 animate-pulse rounded-xl h-80" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">{error}</div>
        <button
          onClick={fetchAnalytics}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Try again
        </button>
      </div>
    )
  }

  if (!analytics) return null

  const { overview, dailyData, topAds, countryData } = analytics

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-600 text-sm font-medium">Karma</p>
              <p className="text-2xl font-bold text-primary-900">{overview.karma.toLocaleString()}</p>
            </div>
            <Trophy size={32} className="text-primary-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Ads</p>
              <p className="text-2xl font-bold text-gray-900">{overview.totalAds}</p>
            </div>
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
              <span className="text-accent-600 font-bold">A</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Impressions</p>
              <p className="text-2xl font-bold text-gray-900">{overview.totalImpressions.toLocaleString()}</p>
            </div>
            <Eye size={32} className="text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Clicks</p>
              <p className="text-2xl font-bold text-gray-900">{overview.totalClicks.toLocaleString()}</p>
            </div>
            <MousePointer size={32} className="text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">CTR</p>
              <p className="text-2xl font-bold text-gray-900">{overview.totalCTR}%</p>
            </div>
            <TrendUp size={32} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Clicks Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Calendar size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Last 7 Days</h2>
          </div>
          
          <div className="space-y-3">
            {dailyData.map((day, index) => {
              const maxClicks = Math.max(...dailyData.map(d => d.clicks))
              const width = maxClicks > 0 ? (day.clicks / maxClicks) * 100 : 0
              const date = new Date(day.date)
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
              
              return (
                <div key={day.date} className="flex items-center gap-3">
                  <span className="w-8 text-sm text-gray-600 font-medium">{dayName}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-900 font-medium">{day.clicks}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Performing Ads */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Ads</h2>
          </div>
          
          {topAds.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No ads with impressions yet
            </div>
          ) : (
            <div className="space-y-4">
              {topAds.map((ad, index) => (
                <div key={ad.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{ad.headline}</p>
                    <p className="text-sm text-gray-600">
                      {ad.clicks} clicks • {ad.impressions} views
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{ad.ctr}%</p>
                    <p className="text-xs text-gray-500">CTR</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Country Breakdown */}
      {countryData.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Globe size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Clicks by Country</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {countryData.map((country) => (
              <div key={country.country} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">{country.country}</p>
                <p className="text-sm text-gray-600">{country.clicks} clicks</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}