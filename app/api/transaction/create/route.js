import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { logActivity } from "@/app/api/activity/log/route";

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
    const { fromWalletId, toWalletId, amount } = await request.json();
    
    // Validate input
    if (!fromWalletId || !toWalletId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid transaction details" },
        { status: 400 }
      );
    }

    // Get wallets
    const fromWallet = await prisma.wallet.findUnique({
      where: { id: parseInt(fromWalletId) }
    });

    const toWallet = await prisma.wallet.findUnique({
      where: { id: parseInt(toWalletId) }
    });

    // Check if wallets exist
    if (!fromWallet || !toWallet) {
      return NextResponse.json(
        { error: "Invalid wallet(s)" },
        { status: 400 }
      );
    }

    // Check if sender has sufficient balance
    if (fromWallet.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Perform transaction
    await prisma.$transaction([
      prisma.wallet.update({
        where: { id: fromWallet.id },
        data: { balance: { decrement: amount } }
      }),
      prisma.wallet.update({
        where: { id: toWallet.id },
        data: { balance: { increment: amount } }
      }),
      prisma.transaction.create({
        data: {
          type: "send",
          amount,
          fromWalletId: fromWallet.id,
          toWalletId: toWallet.id,
          status: "completed"
        }
      })
    ]);

    // Log activity
    await logActivity({
      userId: parseInt(session.user.id),
      action: "TRANSACTION",
      details: `Sent ${amount} Pi from ${fromWallet.address} to ${toWallet.address}`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
