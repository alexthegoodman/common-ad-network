import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const random = searchParams.get("random") === "true";

    let users;

    if (random) {
      // Get random users for homepage display
      users = await prisma.user.findMany({
        where: {
          isApproved: true,
        },
        select: {
          id: true,
          companyName: true,
          profilePic: true,
          karma: true,
          createdAt: true,
        },
        take: limit,
        orderBy: {
          karma: "desc", // Show top karma users first
        },
      });

      // Shuffle the results for randomness
      users = users.sort(() => Math.random() - 0.5);
    } else {
      // Regular pagination for other uses
      const page = parseInt(searchParams.get("page") || "1");
      const skip = (page - 1) * limit;

      const [userList, total] = await Promise.all([
        prisma.user.findMany({
          where: {
            isApproved: true,
          },
          select: {
            id: true,
            companyName: true,
            profilePic: true,
            karma: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip,
          take: limit,
        }),
        prisma.user.count({
          where: {
            isApproved: true,
          },
        }),
      ]);

      return NextResponse.json({
        users: userList,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Users fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}