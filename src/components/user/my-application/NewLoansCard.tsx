// components/LoanCard.tsx

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


type LoanCardProps = {
    loanId: string;
    loanAmount: number;
    remainingAmount?: number;
    disbursedDate?: string;
    emiDueDate?: string;
    status: string;
};

export const NewLoanCards = ({
    loanId,
    loanAmount,
    remainingAmount,
    disbursedDate,
    emiDueDate,
    status,
}: LoanCardProps) => {
    return (
        <Card className="max-w-sm mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Finups BD</CardTitle>
                    <Badge variant="destructive" className="bg-green-500 text-white">
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p><strong>Loan ID:</strong> {loanId}</p>
                    <p><strong>Loan Amount:</strong> BDT {loanAmount.toLocaleString()}</p>
                    <p><strong>Remaining Amount:</strong> BDT {remainingAmount?.toLocaleString()}</p>
                    <p><strong>Disbursed on:</strong> {disbursedDate}</p>
                    <p><strong>Next EMI Due:</strong> {emiDueDate}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
        </Card>
    );
};
