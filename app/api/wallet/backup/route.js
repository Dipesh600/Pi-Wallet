import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId: parseInt(session.user.id) },
      include: {
        sentTransactions: true,
        receivedTransactions: true
      }
    });

    const backupData = {
      timestamp: new Date().toISOString(),
      wallets
    };

    return new NextResponse(JSON.stringify(backupData), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="wallet-backup.json"'
      }
    });
  } catch (error) {
    console.error("Backup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
