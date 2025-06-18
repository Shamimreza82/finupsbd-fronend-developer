import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic E.164 phone number regex
const nidRegex = /^[0-9]{10,17}$/; // NID format for Bangladesh

// Base schema for common guarantor fields
const baseGuarantorSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  fatherOrHusbandName: z
    .string()
    .min(1, "Father's/Husband's name is required."),
  motherName: z.string().min(1, "Mother's name is required."),
  dateOfBirth: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Date of birth must be a valid date.",
    })
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 18;
    }, "Guarantor must be at least 18 years old."),
  nationality: z.string().min(1, "Nationality is required."),
  nationalIdNumber: z
    .string()
    .regex(nidRegex, "Invalid NID format. Must be 10-17 digits.")
    .min(1, "National ID Number (NID) is required."),
  mobileNumber: z
    .string()
    .regex(phoneRegex, "Invalid mobile number format.")
    .min(1, "Mobile number is required."),
  emailAddress: z
    .string()
    .email("Invalid email address.")
    .optional()
    .or(z.literal("")),
  relationWithApplicant: z
    .string()
    .min(1, "Relation with applicant is required."),
  presentAddress: z.string().min(1, "Present address is required."),
  permanentAddress: z
    .string()
    .min(1, "Permanent & Mailing address is required."),
  workAddress: z.string().min(1, "Work address is required."),
});

// Additional fields specific to business guarantor
const businessGuarantorSchema = baseGuarantorSchema.extend({
  businessName: z.string().min(1, "Business name is required."),
  businessType: z.string().min(1, "Business type is required."),
  businessRegistrationNumber: z.string().min(1, "Business registration number is required."),
  businessAddress: z.string().min(1, "Business address is required."),
  businessPhone: z
    .string()
    .regex(phoneRegex, "Invalid business phone number format.")
    .min(1, "Business phone number is required."),
  businessEmail: z
    .string()
    .email("Invalid business email address.")
    .optional()
    .or(z.literal("")),
  businessWebsite: z
    .string()
    .url("Invalid website URL.")
    .optional()
    .or(z.literal("")),
  annualRevenue: z
    .number()
    .min(0, "Annual revenue must be a positive number.")
    .optional(),
  yearsInBusiness: z
    .number()
    .min(0, "Years in business must be a positive number.")
    .optional(),
});

// Export the inferred types
export type BaseGuarantorValues = z.infer<typeof baseGuarantorSchema>;
export type BusinessGuarantorValues = z.infer<typeof businessGuarantorSchema>;

// Main schema for the Guarantor Information step
export const guarantorInfoSchema = z
  .object({
    personalGuarantor: baseGuarantorSchema.optional(),
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

    // At least one guarantor type must be provided
    if (!hasPersonalGuarantorInput && !hasBusinessGuarantorInput) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one guarantor type must be provided.",
        path: [],
      });
    }

    if (hasPersonalGuarantorInput) {
      const personalResult = baseGuarantorSchema.safeParse(
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
