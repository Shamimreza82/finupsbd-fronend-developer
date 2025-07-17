export interface EligibleLoanOffer {
  id: string;
  bankName: string;
  bankImage: string;
  loanType: string;
  eligibleLoan: string;
  amount: string;
  interestRate: string;
  periodMonths: number;
  processingFee: string;
  loanApplicationFormId: string;
}

export interface LoanRequest {
  id: string;
  loanAmount: string;
  loanTenure: number;
  loanPurpose: string;
  emiStartDate: number;
  loanApplicationFormId: string;
}

export interface TNewLoanTypes {
  id: string;
  applicationId: string;
  userId: string;
  status: string;
  adminNotes: string | null;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  eligibleLoanOffer: EligibleLoanOffer;
  loanRequest: LoanRequest;
}
