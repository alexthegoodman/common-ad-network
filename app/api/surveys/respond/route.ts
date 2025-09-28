import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { surveyId, selectedOption } = await request.json();

    if (!surveyId || !selectedOption) {
      return NextResponse.json(
        { error: "Survey ID and selected option are required" },
        { status: 400 }
      );
    }

    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "127.0.0.1";

    // Get user agent
    const userAgent = request.headers.get("user-agent") || "";

    // Check if this IP has already responded to this survey
    const existingResponse = await prisma.surveyResponse.findUnique({
      where: {
        surveyId_ipAddress: {
          surveyId,
          ipAddress: ip,
        },
      },
    });

    if (existingResponse) {
      return NextResponse.json(
        { error: "You have already responded to this survey" },
        { status: 400 }
      );
    }

    // Verify the survey exists and the option is valid
    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
    });

    if (!survey) {
      return NextResponse.json(
        { error: "Survey not found" },
        { status: 404 }
      );
    }

    if (!survey.options.includes(selectedOption)) {
      return NextResponse.json(
        { error: "Invalid survey option" },
        { status: 400 }
      );
    }

    // Create the survey response
    await prisma.surveyResponse.create({
      data: {
        surveyId,
        selectedOption,
        ipAddress: ip,
        userAgent,
        // You can add country detection here if needed
        // country: getCountryFromIP(ip),
      },
    });

    // Increment the ad clicks count (treating survey responses as "clicks")
    await prisma.ad.update({
      where: { id: survey.adId },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "Response recorded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Survey response error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}