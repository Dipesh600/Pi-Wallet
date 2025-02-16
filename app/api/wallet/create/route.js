import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

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
    const { address } = await request.json();
    
    // Validate input
    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Create new wallet
    const newWallet = await prisma.wallet.create({
      data: {
        address,
        user: {
          connect: { id: parseInt(session.user.id) }
        }
      }
    });

    return NextResponse.json(
      { message: "Wallet created successfully", wallet: newWallet },
      { status: 201 }
    );
  } catch (error) {
    console.error("Wallet creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
