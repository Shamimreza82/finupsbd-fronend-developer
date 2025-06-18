import PersonalGuarantorForm from '@/components/guarantor-info/PersonalGuarantorForm'
import Footer from '@/components/sheared/Footer'
import Header from '@/components/sheared/Header'
import React from 'react'

const PersonalGuarantorPage = () => {
    return (
        <div>
            <Header />
            <div className='py-5 px-2'> 
                <PersonalGuarantorForm />
            </div>
            <Footer />
        </div>
    )
}

export default PersonalGuarantorPage
