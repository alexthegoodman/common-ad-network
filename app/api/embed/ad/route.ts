import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getClientIP } from "@/app/lib/geolocation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("site");
    const format = searchParams.get("format") || "card";
    const cluster = searchParams.get("cluster");
    const index = searchParams.get("index");

    if (!siteId) {
      return NextResponse.json(
        { error: "Site ID is required" },
        { status: 400 }
      );
    }

    // Find a user by siteId (we'll use their userId as siteId for now)
    // In production, you'd have a separate sites table
    const siteOwner = await prisma.user.findUnique({
      where: { id: siteId },
      select: { id: true, karma: true },
    });

    if (!siteOwner) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Get client IP for validation
    const clientIP = getClientIP(request);

    // Simple ad selection algorithm - could be much more sophisticated
    // For now, we'll randomly select from active ads, weighted by user karma
    const activeAds = await prisma.ad.findMany({
      where: {
        isActive: true,
        NOT: {
          userId: siteId, // Don't show own ads on own site
        },
      },
      include: {
        user: {
          select: {
            companyName: true,
            karma: true,
          },
        },
      },
    });

    if (activeAds.length === 0) {
      return NextResponse.json({ error: "No ads available" }, { status: 404 });
    }

    // For cluster requests, ensure we don't show the same ad multiple times
    // by using a deterministic selection based on cluster + index
    let selectedAd;
    
    if (cluster && index !== null) {
      // Use deterministic selection for clusters to avoid duplicate ads
      const seed = cluster + index;
      const hash = Array.from(seed).reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      const adIndex = Math.abs(hash) % activeAds.length;
      selectedAd = activeAds[adIndex];
    } else {
      // Weighted random selection based on advertiser karma (more karma = higher chance)
      const totalKarma = activeAds.reduce(
        (sum: any, ad: any) => sum + Math.max(ad.user.karma, 1),
        0
      );
      let random = Math.random() * totalKarma;

      selectedAd = activeAds[0];
      for (const ad of activeAds) {
        random -= Math.max(ad.user.karma, 1);
        if (random <= 0) {
          selectedAd = ad;
          break;
        }
      }
    }

    // Increment impression count
    await prisma.ad.update({
      where: { id: selectedAd.id },
      data: {
        impressions: {
          increment: 1,
        },
      },
    });

    // Return ad data
    return NextResponse.json({
      id: selectedAd.id,
      headline: selectedAd.headline,
      description: selectedAd.description,
      imageUrl: selectedAd.imageUrl,
      linkUrl: selectedAd.linkUrl,
      companyName: selectedAd.user.companyName,
      clickUrl: `${
        process.env.NEXTAUTH_URL || "https://common-ad-network.vercel.app"
      }/api/embed/click/${selectedAd.id}?site=${siteId}`,
    });
  } catch (error) {
    console.error("Ad serving error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
