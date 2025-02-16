import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Generate a new wallet address
    const walletAddress = crypto.randomBytes(20).toString('hex');
    
    // Create wallet in database
    const wallet = await prisma.wallet.create({
      data: {
        address: walletAddress,
        balance: 0.0,
        userId: parseInt(session.user.id)
      }
    });

    return NextResponse.json({ 
      success: true,
      wallet
    });
  } catch (error) {
    console.error("Wallet generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
