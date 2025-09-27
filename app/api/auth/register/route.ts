import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { hashPassword, createToken } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      companyName,
      companyLink,
      companyDescription,
      profilePic,
      inviteCode,
      category,
    } = await request.json();

    if (!email || !password || !companyName || !companyLink || !inviteCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const inviteCodeRecord = await prisma.inviteCode.findUnique({
      where: { code: inviteCode },
    });

    if (!inviteCodeRecord || inviteCodeRecord.isUsed) {
      return NextResponse.json(
        { error: "Invalid or used invite code" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        companyName,
        companyLink,
        companyDescription,
        profilePic,
        category,
        invitedBy: inviteCodeRecord.createdBy,
        isApproved: true,
        karma: 30,
      },
    });

    await prisma.inviteCode.update({
      where: { code: inviteCode },
      data: {
        isUsed: true,
        usedBy: user.id,
        usedAt: new Date(),
      },
    });

    // Auto-create an ad for the new user
    await prisma.ad.create({
      data: {
        userId: user.id,
        headline: companyName,
        description: companyDescription || `Check out ${companyName}`,
        linkUrl: companyLink,
        category,
        isActive: true,
      },
    });

    const token = await createToken({ userId: user.id, email: user.email });

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          companyName: user.companyName,
          karma: user.karma,
        },
      },
      { status: 201 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
