import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user's ads performance
    const userAds = await prisma.ad.findMany({
      where: { userId: payload.userId },
      select: {
        id: true,
        headline: true,
        impressions: true,
        clicks: true,
        createdAt: true,
        clickLogs: {
          select: {
            createdAt: true,
            country: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    // Calculate totals
    const totalImpressions = userAds.reduce((sum, ad) => sum + ad.impressions, 0)
    const totalClicks = userAds.reduce((sum, ad) => sum + ad.clicks, 0)
    const totalCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

    // Get user's current karma
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { karma: true }
    })

    // Calculate daily stats for the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const dailyStats = await prisma.click.groupBy({
      by: ['createdAt'],
      where: {
        ad: {
          userId: payload.userId
        },
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      _count: {
        id: true
      }
    })

    // Format daily stats
    const dailyData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      
      const clicksForDay = await prisma.click.count({
        where: {
          ad: {
            userId: payload.userId
          },
          createdAt: {
            gte: dayStart,
            lt: dayEnd
          }
        }
      })

      dailyData.push({
        date: dayStart.toISOString().split('T')[0],
        clicks: clicksForDay
      })
    }

    // Top performing ads
    const topAds = userAds
      .filter(ad => ad.impressions > 0)
      .sort((a, b) => {
        const aCTR = (a.clicks / a.impressions) * 100
        const bCTR = (b.clicks / b.impressions) * 100
        return bCTR - aCTR
      })
      .slice(0, 5)
      .map(ad => ({
        id: ad.id,
        headline: ad.headline,
        clicks: ad.clicks,
        impressions: ad.impressions,
        ctr: ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00'
      }))

    // Country breakdown
    const countryStats = await prisma.click.groupBy({
      by: ['country'],
      where: {
        ad: {
          userId: payload.userId
        },
        country: {
          not: null
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    })

    const countryData = countryStats.map(stat => ({
      country: stat.country,
      clicks: stat._count.id
    }))

    return NextResponse.json({
      overview: {
        totalAds: userAds.length,
        totalImpressions,
        totalClicks,
        totalCTR: totalCTR.toFixed(2),
        karma: user?.karma || 0
      },
      dailyData,
      topAds,
      countryData
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}