import { Card } from "@repo/ui/card"

interface p2pTransferProp {
    transfer: {
        amount: number,
        timestamp: Date,
        // from_userId: string,
        // toUserId: string
    }[]
}
// 
export const P2PTransfer = ({ transfer }: p2pTransferProp) => {
    if (!transfer.length) {
        return <Card title="Recent Transfers">
            <div>
                No Recent transfer
            </div>
        </Card>
    }
    return (<Card title="Recent Transfers">
        <div>
            {transfer.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div>
                        {t.timestamp.toDateString()}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    +Rs {t.amount / 100}
                </div>
            </div>)
            }
        </div>
    </Card>

    )
}