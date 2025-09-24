import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken, generateInviteCode } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const code = generateInviteCode()

    const inviteCode = await prisma.inviteCode.create({
      data: {
        code,
        createdBy: payload.userId
      }
    })

    return NextResponse.json(
      { 
        inviteCode: inviteCode.code,
        inviteUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/register?invite=${inviteCode.code}`
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Invite creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}