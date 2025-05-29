import { z } from "zod"

// Schema for existing loan
const existingLoanSchema = z.object({
  loanType: z.string({
    required_error: "Loan type is required.",
  }),
  otherLoanType: z.string().optional(),
  lenderName: z.string({
    required_error: "Lender name is required.",
  }),
  disbursedAmount: z.string().min(1, {
    message: "Disbursed amount is required.",
  }),
  outstanding: z.string().min(1, {
    message: "Outstanding amount is required.",
  }),
  emi: z.string().min(1, {
    message: "EMI is required.",
  }),
  adjustmentPlan: z.string({
    required_error: "Adjustment plan is required.",
  }),
})

// Schema for credit card
const creditCardSchema = z.object({
  issuerName: z.string({
    required_error: "Issuer name is required.",
  }),
  cardLimit: z.string().min(1, {
    message: "Card limit is required.",
  }),
  toBeClosedBeforeDisbursement: z.boolean().default(false),
})

// Main loan info schema
export const loanInfoSchema = z
  .object({
    hasExistingLoan: z.boolean().default(false),
    existingLoans: z
      .array(existingLoanSchema)
      .max(3, {
        message: "You can add a maximum of 3 existing loans.",
      })
      .optional(),
    hasCreditCard: z.boolean().default(false),
    creditCards: z
      .array(creditCardSchema)
      .max(5, {
        message: "You can add a maximum of 5 credit cards.",
      })
      .optional(),
    bankName: z.string().min(2, {
      message: "Bank name is required.",
    }),
    accountNumber: z.string().min(5, {
      message: "Account number is required.",
    }),
  })
  .refine(
    (data) => {
      // If hasExistingLoan is true, existingLoans must be provided and not empty
      if (data.hasExistingLoan) {
        return data.existingLoans && data.existingLoans.length > 0
      }
      return true
    },
    {
      message: "Please add at least one existing loan",
      path: ["existingLoans"],
    },
  )
  .refine(
    (data) => {
      // If hasCreditCard is true, creditCards must be provided and not empty
      if (data.hasCreditCard) {
        return data.creditCards && data.creditCards.length > 0
      }
      return true
    },
    {
      message: "Please add at least one credit card",
      path: ["creditCards"],
    },
  )
  .refine(
    (data) => {
      // Check if otherLoanType is provided when loanType is "OTHER_LOAN"
      if (data.hasExistingLoan && data.existingLoans) {
        return data.existingLoans.every(
          (loan) =>
            loan.loanType !== "OTHER_LOAN" ||
            (loan.loanType === "OTHER_LOAN" && loan.otherLoanType && loan.otherLoanType.trim() !== ""),
        )
      }
      return true
    },
    {
      message: "Please specify the other loan type",
      path: ["existingLoans"],
    },
  )

export type LoanInfoValues = z.infer<typeof loanInfoSchema>
export type ExistingLoanValues = z.infer<typeof existingLoanSchema>
export type CreditCardValues = z.infer<typeof creditCardSchema>
