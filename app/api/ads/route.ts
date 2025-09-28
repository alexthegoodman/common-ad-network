import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const userId = searchParams.get("userId");
    const random = searchParams.get("random") === "true";

    const skip = (page - 1) * limit;

    const where = userId
      ? { userId, isDeleted: false }
      : { isActive: true, isDeleted: false };

    let ads;
    let total;

    if (random) {
      // For homepage random display
      ads = await prisma.ad.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              companyName: true,
              profilePic: true,
              karma: true,
            },
          },
          survey: {
            select: {
              id: true,
              question: true,
              options: true,
            },
          },
        },
        take: limit,
      });

      // Shuffle the results for randomness
      ads = ads.sort(() => Math.random() - 0.5);
      total = ads.length;

      return NextResponse.json({ ads });
    } else {
      // Regular pagination
      [ads, total] = await Promise.all([
        prisma.ad.findMany({
          where,
          include: {
            user: {
              select: {
                companyName: true,
                profilePic: true,
              },
            },
            survey: {
              select: {
                id: true,
                question: true,
                options: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip,
          take: limit,
        }),
        prisma.ad.count({ where }),
      ]);

      return NextResponse.json({
        ads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    }
  } catch (error) {
    console.error("Ads fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
