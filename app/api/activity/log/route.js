import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function logActivity({ userId, action, details }) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        details: details || null
      }
    });
  } catch (error) {
    console.error("Activity log error:", error);
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { action, details } = await request.json();
    
    await prisma.activityLog.create({
      data: {
        userId: parseInt(session.user.id),
        action,
        details: details || null
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Activity log error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
