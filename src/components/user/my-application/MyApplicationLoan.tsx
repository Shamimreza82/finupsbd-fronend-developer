
import { getAllApplicationFromUser } from '@/services/applications/userApplication';
import { getCurrentUser } from '@/services/AuthService';






import React from 'react'
import LoanApplicationTable from './LoanApplicationTable';

const MyApplicationLoan = async () => {


  const user = await getCurrentUser()
  const data = await getAllApplicationFromUser(user?.userId ?? "")


  console.log(data)

  return (
    <div>
      <LoanApplicationTable data={data} />
    </div>
  )
}

export default MyApplicationLoan
