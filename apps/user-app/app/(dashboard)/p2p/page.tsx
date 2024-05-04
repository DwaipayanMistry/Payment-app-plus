import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { P2PTransfer } from "../../../components/P2PTransfer";
import { timeStamp } from "console";


const getBalance = async () => {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: session?.user?.id
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0,
    }
}
const getP2PTransfer= async ()=>{
    const session = await getServerSession(authOptions);
    const transfer= await prisma.p2pTransfer.findMany({
        where:{
            fromUserId: session?.user?.id,
        }
    });
    return transfer.map(t=>({
        amount:t.amount,
        timestamp: t.timestamp,
        // from_userId: t.fromUserId
    }))
}
export default async function () {
    const balance = await getBalance();
    const transfer= await getP2PTransfer()
    // return <div className="w-full">
    //     P2P Dashboard
    //     <SendCard></SendCard>
    // </div>
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <SendCard></SendCard>
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked}></BalanceCard>
                    <div className="pt-4">
                        <P2PTransfer transfer={transfer}></P2PTransfer>                        
                    </div>
                </div>

            </div>
        </div>
    )
}