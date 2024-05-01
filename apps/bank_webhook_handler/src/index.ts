import express from "express";
import db from "@repo/db/client";
import { z } from "zod";
const schema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.number()
})

interface paymentInformationInterface {
    token: string;
    userId: string;
    amount: number;
}

const app = express();
app.post("/hdfcWebtool", async (req, res) => {
    const { success, error } = schema.safeParse(req.body)
    if (success) {
        const paymentInformation: paymentInformationInterface = {
            token: req.body.token,
            userId: req.body.userId,
            amount: req.body.amount
        }
        try {
            await db.$transaction([
                db.balance.update({
                    where: {
                        userId: paymentInformation.userId
                    },
                    data: {
                        amount: {
                            increment: paymentInformation.amount
                        }
                    }
                }),
                db.onRampTransaction.update({
                    where: {
                        token: paymentInformation.token
                    },
                    data: {
                        status: "Success",
                    }
                })
            ]);
            res.json({
                message: "Captured"
            })
        } catch (error) {
            console.error(error);
            res.status(411).json({
                message: "Error while processing webhook"
            })
        }
    }
    else {
        return res.status(567).json({
            error: error,
        })
    }
})

app.listen(3003);