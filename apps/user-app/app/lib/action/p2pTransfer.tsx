"use server"

import prisma from "@repo/db/client";
import { authOptions } from "../auth"
import { getServerSession } from "next-auth"

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from_userId = session?.user?.id;
    if (!from_userId) {
        return { message: "Error while sending money" };
    }
    const toUser = await prisma.user.findUnique({
        where: {
            number: to,
        }
    });
    if (!toUser) {
        return {
            message: "User not found",
        }
    }
    await prisma.$transaction(
        async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"= ${from_userId} FOR UPDATE`
            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: from_userId
                }
            })
            // console.log("pre promise");
            // await new Promise(resolve => { setTimeout(resolve, 4000) });
            // console.log("post promise")
            if (!fromBalance || fromBalance.amount <= amount) {
                throw new Error("Insufficient fund");
            }
            await tx.balance.update({
                where: {
                    userId: from_userId
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })
            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            });
            await tx.p2pTransfer.create({
                data:{
                    amount: Number(amount),
                    timestamp: new Date(),
                    fromUserId:from_userId,
                    toUserId:toUser.id

                }
            })
            // tx.$queryRaw`COMMIT`
        }
    );
}