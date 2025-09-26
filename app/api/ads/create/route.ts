import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { headline, description, imageUrl, linkUrl } = await request.json();

    if (!headline || !description || !linkUrl) {
      return NextResponse.json(
        { error: "Headline, description, and link URL are required" },
        { status: 400 }
      );
    }

    const ad = await prisma.ad.create({
      data: {
        userId: payload.userId,
        headline,
        description,
        imageUrl,
        linkUrl,
      },
      include: {
        user: {
          select: {
            companyName: true,
            profilePic: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Ad created successfully",
        ad,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ad creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
