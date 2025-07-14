
import { getAllApplicationFromUser } from '@/services/applications/userApplication';
import { getCurrentUser } from '@/services/AuthService';






import React from 'react'
import LoanApplicationTable from './LoanApplicationTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoanStatus } from '@/contants';
import { NewLoanCards } from './NewLoansCard';

const MyApplicationLoan = async () => {


  const user = await getCurrentUser()
  const data = await getAllApplicationFromUser(user?.userId ?? "")

  console.log(data)

  const newLoans = data?.data.filter((loan: any) => loan.status !== LoanStatus.COMPLETED
  );
  const existingLoans = data?.data.filter((loan: any) => loan.status == LoanStatus.COMPLETED)
  console.log(newLoans, existingLoans)


  return (
    <div>
      <Tabs defaultValue="newLoan" >
        <TabsList className='w-[100%]'>
          <TabsTrigger className='w-1/2' value="newLoan">New Loans</TabsTrigger>
          <TabsTrigger className='w-1/2' value="existingLoan">Existing Loan</TabsTrigger>
        </TabsList>
        <TabsContent value="newLoan">
          {
            newLoans?.map((loan: any) => (
              <NewLoanCards
                key={loan.id}
                loanId={loan.applicationId}
                loanAmount={1200000}
                status={loan.status}

              />
            ))
          }
          <LoanApplicationTable data={data} />
        </TabsContent>
        <TabsContent value="existingLoan">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}

export default MyApplicationLoan
