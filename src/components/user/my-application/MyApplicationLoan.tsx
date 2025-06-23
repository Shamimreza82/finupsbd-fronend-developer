'use client'

import { useUserInfo } from '@/hooks/useUserInfo'
import React from 'react'

const MyApplicationLoan = () => {

    const {user} = useUserInfo()

    console.log(user)

  return (
    <div>
       
    </div>
  )
}

export default MyApplicationLoan
