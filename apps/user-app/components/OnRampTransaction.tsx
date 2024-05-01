import { Card } from "@repo/ui/card"

interface OnRampTransactionProp {
    transactions: {
        time: Date,
        amount: number,
        status: 'Success' | 'Failure' | 'Processing',
        provider: string
    }[]
}
export const OnRampTransaction = ({ transactions }: OnRampTransactionProp) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div>
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="React Transactions">
        <div>
            {transactions.map(t => <div className=" flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div>
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    +Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}