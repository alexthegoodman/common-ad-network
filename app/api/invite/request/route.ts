import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const existingRequest = await prisma.inviteRequest.findUnique({
      where: { email },
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "Email already requested an invite" },
        { status: 409 }
      );
    }

    await prisma.inviteRequest.create({
      data: { email },
    });

    return NextResponse.json(
      { message: "Invite request submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating invite request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}