import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { id: adId } = await params;

    // Check if the ad exists and belongs to the current user
    const ad = await prisma.ad.findUnique({
      where: { id: adId },
      select: { userId: true }
    });

    if (!ad) {
      return NextResponse.json(
        { error: "Ad not found" },
        { status: 404 }
      );
    }

    if (ad.userId !== payload.userId) {
      return NextResponse.json(
        { error: "Forbidden - You can only delete your own ads" },
        { status: 403 }
      );
    }

    // Mark the ad as deleted
    await prisma.ad.update({
      where: { id: adId },
      data: { isDeleted: true }
    });

    return NextResponse.json(
      { message: "Ad deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ad deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}