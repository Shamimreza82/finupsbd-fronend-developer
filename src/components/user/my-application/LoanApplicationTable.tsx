"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function LoanApplicationTable({ data }: any) {
    const handleCheckStatus = (id: string) => {
        console.log("Checking status for Application ID:", id);
        // Replace with API call, modal open, etc.    
    };

    return (
        <>
            <h2>My applications</h2>
            <div className="border rounded-lg overflow-x-auto">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Application ID</TableHead>
                            <TableHead>Bank Name</TableHead>
                            <TableHead>Loan Type</TableHead>
                            <TableHead>Applayed Date</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.applicationId}</TableCell>
                                <TableCell>
                                    {item.eligibleLoanOffer?.bankName || "-"}
                                </TableCell>
                                <TableCell>
                                    {item.eligibleLoanOffer?.loanType || "-"}
                                </TableCell>
                                <TableCell>
                                    {new Date(item.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {item.isActive ? "Yes" : "No"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/user/my-application/application-status/${item.id}`}>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
