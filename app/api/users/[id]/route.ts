import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        ads: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
