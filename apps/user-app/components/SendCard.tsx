"use client"
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/action/p2pTransfer";
export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput placeholder={"Number"} label="Number" onChange={(value) => { setNumber(value) }}></TextInput>
                        <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => { setAmount(value) }}></TextInput>
                        <div className="flex justify-center pt-4">
                            <Button children={"Send"} onClick={async () => { await p2pTransfer(number, Number(amount)*100) }}></Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    )
}