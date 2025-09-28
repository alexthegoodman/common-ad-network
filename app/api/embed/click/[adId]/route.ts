import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getLocationFromIP, getClientIP } from "@/app/lib/geolocation";
import {
  detectSuspiciousActivity,
  isIPBlacklisted,
  calculateTrustScore,
} from "@/app/lib/fraud-detection";

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("site");
    const clientIP = getClientIP(request);

    if (!siteId) {
      return NextResponse.redirect("https://example.com"); // Fallback redirect
    }

    const ad = await prisma.ad.findUnique({
      where: { id: params.adId },
      include: {
        user: {
          select: { id: true, karma: true },
        },
      },
    });

    if (!ad) {
      return NextResponse.redirect("https://example.com"); // Fallback redirect
    }

    // Check if this IP has already clicked this ad today (spam prevention)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingClick = await prisma.click.findFirst({
      where: {
        adId: params.adId,
        ipAddress: clientIP,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (!existingClick) {
      const userAgent = request.headers.get("user-agent") || undefined;

      // Check for suspicious activity
      const fraudCheck = await detectSuspiciousActivity(clientIP, userAgent);
      const isBlacklisted = await isIPBlacklisted(clientIP);

      // Block suspicious clicks
      if (fraudCheck.isSuspicious || isBlacklisted) {
        console.warn("Suspicious click blocked:", {
          ip: clientIP,
          userAgent,
          reasons: fraudCheck.reasons,
          blacklisted: isBlacklisted,
          adId: params.adId,
        });
        // Still redirect to the ad but don't count the click
        const redirectUrl = ad.linkUrl || `${process.env.NEXTAUTH_URL || "https://common-ad-network.vercel.app"}/ads/${ad.id}`;
        return NextResponse.redirect(redirectUrl);
      }

      // Get location data from IP
      const locationData = await getLocationFromIP(clientIP);
      const trustScore = calculateTrustScore(
        clientIP,
        userAgent,
        locationData.country as string
      );

      // Only process clicks with decent trust score (above 50)
      if (trustScore < 50) {
        console.warn("Low trust score click blocked:", {
          ip: clientIP,
          userAgent,
          country: locationData.country,
          trustScore,
          adId: params.adId,
        });
        const redirectUrl = ad.linkUrl || `${process.env.NEXTAUTH_URL || "https://common-ad-network.vercel.app"}/ads/${ad.id}`;
        return NextResponse.redirect(redirectUrl);
      }

      // Record the valid click
      await prisma.click.create({
        data: {
          adId: params.adId,
          ipAddress: clientIP,
          userAgent,
          country: locationData.country,
        },
      });

      // Update ad click count
      await prisma.ad.update({
        where: { id: params.adId },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });

      // Deduct karma from advertiser (10 karma per click)
      await prisma.user.update({
        where: { id: ad.userId },
        data: {
          karma: {
            decrement: 10,
          },
        },
      });

      // Calculate karma bonus for site owner based on CTR
      const siteOwner = await prisma.user.findUnique({
        where: { id: siteId },
      });

      if (siteOwner) {
        // Get recent performance to calculate CTR bonus
        const recentImpressions = await prisma.ad.aggregate({
          where: {
            userId: siteId,
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
          _sum: {
            impressions: true,
          },
        });

        const recentClicks = await prisma.click.count({
          where: {
            ad: {
              userId: siteId,
            },
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        });

        const ctr = recentImpressions._sum.impressions
          ? (recentClicks / recentImpressions._sum.impressions) * 100
          : 0;

        // Karma calculation based on CTR (as specified in CLAUDE.md)
        // 10 Karma at 5% CTR, 1 Karma at 1% CTR, 40 Karma at 20% CTR
        let karmaEarned = 1; // Base karma
        if (ctr >= 20) {
          karmaEarned = 40;
        } else if (ctr >= 5) {
          // Linear interpolation between 10 and 40 karma
          karmaEarned = 10 + ((ctr - 5) / 15) * 30;
        } else if (ctr >= 1) {
          // Linear interpolation between 1 and 10 karma
          karmaEarned = 1 + ((ctr - 1) / 4) * 9;
        }

        // Bonus 50% karma for smaller sites (less than 1000 karma)
        if (siteOwner.karma < 1000) {
          karmaEarned *= 1.5;
        }

        // Award karma to site owner
        await prisma.user.update({
          where: { id: siteId },
          data: {
            karma: {
              increment: Math.round(karmaEarned),
            },
          },
        });
      }
    }

    // Redirect to the actual ad URL or survey page
    const redirectUrl = ad.linkUrl || `${process.env.NEXTAUTH_URL || "https://common-ad-network.vercel.app"}/ads/${ad.id}`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Click tracking error:", error);
    return NextResponse.redirect("https://example.com"); // Fallback redirect
  }
}
