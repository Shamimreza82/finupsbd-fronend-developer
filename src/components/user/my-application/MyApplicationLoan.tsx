
import { getAllNewLoans } from '@/services/applications/userApplication';
import { getCurrentUser } from '@/services/AuthService';






import React from 'react'
import LoanApplicationTable from './LoanApplicationTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoanStatus } from '@/contants';
import { NewLoanCards } from './NewLoansCard';
import { TNewLoanTypes } from '@/types/applications';

const MyApplicationLoan = async () => {


  const user = await getCurrentUser()
  const data = await getAllNewLoans(user?.userId ?? "")

  console.log(data)



  return (
    <div>
      <Tabs defaultValue="newLoan" >
        <TabsList className='w-[70%]'>
          <TabsTrigger className='w-1/2' value="newLoan">New Loans</TabsTrigger>
          <TabsTrigger className='w-1/2' value="existingLoan">Existing Loan</TabsTrigger>
        </TabsList>
        <TabsContent value="newLoan">
          <div className='grid grid-cols-3 gap-5'>
            {
              data.data?.map((loan: TNewLoanTypes) => (
                <NewLoanCards
                  key={loan.id}
                  id={loan.id}
                  applicationId={loan.applicationId}
                  image={loan.eligibleLoanOffer.bankImage}
                  loanAmount={Number(loan.loanRequest.loanAmount)}
                  interestRate={loan.eligibleLoanOffer.interestRate}
                  tenure={loan.loanRequest.loanTenure}
                  applicationOn={loan.createdAt}
                  status={loan?.status}
                />
              ))
            }
          </div>
          <LoanApplicationTable data={data} />
        </TabsContent>
        <TabsContent value="existingLoan">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}

export default MyApplicationLoan
