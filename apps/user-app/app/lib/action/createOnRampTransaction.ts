"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";
import { Tilt_Prism } from "next/font/google";

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString()
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: session?.user?.id,
            amount: amount * 100
        }
    });
    return {
        message: "Done"
    }
}