import { z } from "zod"

export const residentialInfoSchema = z
  .object({
    // Present Address
    presentAddress: z.string().min(2, {
      message: "Address must be at least 2 characters.",
    }),
    presentDivision: z.string({
      required_error: "Please select a division.",
    }),
    presentDistrict: z.string({
      required_error: "Please select a district.",
    }),
    presentThana: z.string({
      required_error: "Please select a thana.",
    }),
    presentPostalCode: z.string().min(2, {
      message: "Postal code must be at least 2 characters.",
    }),
    presentLengthOfStay: z.string().min(1, {
      message: "Length of stay is required.",
    }),
    presentOwnershipStatus: z.string({
      required_error: "Please select an ownership status.",
    }),

    // Permanent Address
    isPermanentSameAsPresent: z.boolean().default(false),
    permanentAddress: z.string().optional(),
    permanentDivision: z.string().optional(),
    permanentDistrict: z.string().optional(),
    permanentThana: z.string().optional(),
    permanentPostalCode: z.string().optional(),
    permanentLengthOfStay: z.string().optional(),
    permanentOwnershipStatus: z.string().optional(),
  })
  .refine(
    (data) => {
      // If isPermanentSameAsPresent is false, then permanent address fields are required
      if (!data.isPermanentSameAsPresent) {
        return (
          !!data.permanentAddress &&
          !!data.permanentDivision &&
          !!data.permanentDistrict &&
          !!data.permanentThana &&
          !!data.permanentPostalCode &&
          !!data.permanentLengthOfStay &&
          !!data.permanentOwnershipStatus
        )
      }
      return true
    },
    {
      message: "Permanent address fields are required when different from present address",
      path: ["permanentAddress"],
    },
  )

export type ResidentialInfoValues = z.infer<typeof residentialInfoSchema>
