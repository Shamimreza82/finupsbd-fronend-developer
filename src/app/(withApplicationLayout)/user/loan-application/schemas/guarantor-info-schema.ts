import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic E.164 phone number regex

// Schema for individual guarantor details (shared by Personal and Business)
// Fields are marked as required here as per UI asterisks
const guarantorSectionSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  fatherOrHusbandName: z
    .string()
    .min(1, "Father's/Husband's name is required."),
  motherName: z.string().min(1, "Mother's name is required."),
  dateOfBirth: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Date of joining must be a valid date.",
    }),
  nationality: z.string().min(1, "Nationality is required."),
  nationalIdNumber: z.string().min(1, "National ID Number (NID) is required."),
  mobileNumber: z
    .string()
    .regex(phoneRegex, "Invalid mobile number format.")
    .min(1, "Mobile number is required."),
  emailAddress: z
    .string()
    .email("Invalid email address.")
    .optional()
    .or(z.literal("")), // Optional as per UI (no asterisk)
  relationWithApplicant: z
    .string()
    .min(1, "Relation with applicant is required."),
  presentAddress: z.string().min(1, "Present address is required."),
  permanentAddress: z
    .string()
    .min(1, "Permanent & Mailing address is required."),
  workAddress: z.string().min(1, "Work address is required."),
});
// Export the inferred type for GuarantorSectionValues
export type GuarantorSectionValues = z.infer<typeof guarantorSectionSchema>;

// Specific schema for Personal Guarantor, extending the base
const personalGuarantorSchema = guarantorSectionSchema.extend({});

// Specific schema for Business Guarantor (currently same as base, can be extended)
const businessGuarantorSchema = guarantorSectionSchema.extend({});

// Main schema for the Guarantor Information step
export const guarantorInfoSchema = z
  .object({
    personalGuarantor: personalGuarantorSchema.optional(),
    businessGuarantor: businessGuarantorSchema.optional(),
  })
  .superRefine((data, ctx) => {
    const hasPersonalGuarantorInput =
      data.personalGuarantor &&
      Object.values(data.personalGuarantor).some(
        (val) => val !== undefined && val !== "",
      );
    const hasBusinessGuarantorInput =
      data.businessGuarantor &&
      Object.values(data.businessGuarantor).some(
        (val) => val !== undefined && val !== "",
      );

    if (hasPersonalGuarantorInput) {
      const personalResult = personalGuarantorSchema.safeParse(
        data.personalGuarantor,
      );
      if (!personalResult.success) {
        personalResult.error.errors.forEach((error) => {
          ctx.addIssue({
            ...error,
            path: ["personalGuarantor", ...error.path],
          });
        });
      }
    }

    if (hasBusinessGuarantorInput) {
      const businessResult = businessGuarantorSchema.safeParse(
        data.businessGuarantor,
      );
      if (!businessResult.success) {
        businessResult.error.errors.forEach((error) => {
          ctx.addIssue({
            ...error,
            path: ["businessGuarantor", ...error.path],
          });
        });
      }
    }
  });

export type GuarantorInfoValues = z.infer<typeof guarantorInfoSchema>;
