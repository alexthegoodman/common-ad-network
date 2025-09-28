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

    const { headline, description, imageUrl, linkUrl, category, type, question, options } = await request.json();

    if (!headline || !description || !category || !type) {
      return NextResponse.json(
        { error: "Headline, description, category, and type are required" },
        { status: 400 }
      );
    }

    if (type === "regular" && !linkUrl) {
      return NextResponse.json(
        { error: "Link URL is required for regular ads" },
        { status: 400 }
      );
    }

    if (type === "survey") {
      if (!question || !options || !Array.isArray(options) || options.length < 2) {
        return NextResponse.json(
          { error: "Survey ads require a question and at least 2 options" },
          { status: 400 }
        );
      }
    }

    const ad = await prisma.ad.create({
      data: {
        userId: payload.userId,
        headline,
        description,
        imageUrl,
        linkUrl: type === "regular" ? linkUrl : null,
        category,
        type,
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

    if (type === "survey") {
      await prisma.survey.create({
        data: {
          adId: ad.id,
          question,
          options: options.filter((opt: string) => opt.trim()),
        },
      });
    }

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
