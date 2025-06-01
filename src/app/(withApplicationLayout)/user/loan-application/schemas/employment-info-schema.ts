import { z } from "zod";

// Schema for a single property entry
const propertyDetailSchema = z.object({
  propertyType: z.string().min(1, { message: "Please select property type." }),
  propertyValue: z
    .string()
    .min(1, { message: "Approximate Value is required." })
    .regex(/^\d+$/, { message: "Approximate Value must be a number." }),
});

// Base schema for employment info (discriminator)
const baseEmploymentSchema = z.object({
  employmentStatus: z.enum([
    "SALARIED",
    "BUSINESS_OWNER",
    "SELF_EMPLOYED",
    "RETIRED",
    "HOUSEWIFE",
    "UNEMPLOYED",
  ]),
});

// Schema for salaried professionals
const salariedSchema = baseEmploymentSchema.extend({
  employmentStatus: z.literal("SALARIED"),
  jobTitle: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters." }),
  designation: z
    .string()
    .min(2, { message: "Designation must be at least 2 characters." }),
  department: z
    .string()
    .min(2, { message: "Department must be at least 2 characters." }),
  employeeId: z.string().min(1, { message: "Employee ID is required." }),
  employmentType: z.enum(
    ["PERMANENT", "CONTRACTUAL", "PARTTIME", "PROBATION"],
    {
      required_error: "Please select your employment type.",
    },
  ),
  dateOfJoining: z.date({
    required_error: "Date of joining is required.",
    invalid_type_error: "Date of joining must be a valid date.",
  }),
  organizationName: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters." }),
  organizationAddress: z
    .string()
    .min(2, { message: "Organization address must be at least 2 characters." }),
  serviceYears: z
    .string()
    .min(1, { message: "Years of service is required." })
    .regex(/^\d+$/, "Must be a number"),
  serviceMonths: z
    .string()
    .min(1, { message: "Months of service is required." })
    .regex(/^[0-9]$|^1[0-1]$/, "Must be between 0-11"), // 0-11
  eTin: z.string().min(1, { message: "E-TIN is required." }),
  officialContact: z.string().optional(),
  hasPreviousOrganization: z.boolean().default(false),
  previousOrganizationName: z.string().optional(),
  previousDesignation: z.string().optional(),
  previousServiceYears: z
    .string()
    .regex(/^\d*$/, "Must be a number if provided")
    .optional(),
  previousServiceMonths: z
    .string()
    .regex(/^([0-9]|1[0-1])?$/, "Must be between 0-11 if provided") // 0-11 or empty
    .optional(),
  totalExperienceYears: z
    .string()
    .min(1, { message: "Total experience years is required." }),
  totalExperienceMonths: z
    .string()
    .min(1, { message: "Total experience months is required." }),
});

// Schema for business owners
const businessOwnerSchema = baseEmploymentSchema.extend({
  employmentStatus: z.literal("BUSINESS_OWNER"),
  businessName: z
    .string()
    .min(2, { message: "Business name must be at least 2 characters." }),
  businessAddress: z
    .string()
    .min(2, { message: "Business address must be at least 2 characters." }),
  businessOwnerType: z.enum(
    ["PROPRIETORSHIP", "PARTNERSHIP", "PUBLIC_LIMITED_COMPANY"],
    {
      required_error: "Please select your business owner type.",
    },
  ),
  businessType: z.enum(["RETAIL", "WHOLESALE", "MANUFACTURING"], {
    required_error: "Please select your business type.",
  }),
  sharePortion: z
    .string()
    .min(1, { message: "Share portion is required." })
    .regex(/^\d+$/, "Must be a number"),
  businessRegistrationNumber: z.string().min(1, {
    message: "Business registration/trade license number is required.",
  }),
  tradeLicenseAge: z
    .string()
    .min(1, { message: "Please select trade license age." }),
});

// Schema for other employment types (no additional fields beyond status)
const otherEmploymentSchema = baseEmploymentSchema.extend({
  employmentStatus: z.enum([
    "SELF_EMPLOYED",
    "RETIRED",
    "HOUSEWIFE",
    "UNEMPLOYED",
  ]),
});

// Income details schema
const incomeDetailsSchema = z.object({
  grossMonthlyIncome: z
    .string()
    .min(1, { message: "Gross monthly income is required." })
    .regex(/^\d+$/, "Must be a number"),
  rentIncome: z
    .string()
    .regex(/^\d*$/, "Must be a number if provided")
    .optional(),
  otherIncome: z
    .string()
    .regex(/^\d*$/, "Must be a number if provided")
    .optional(),
  totalIncome: z
    .string()
    .min(1, { message: "Total income is required." })
    .regex(/^\d+$/, "Must be a number"),
});

// Combined schema with discriminated union for employment status
const employmentInfoBaseSchema = z
  .discriminatedUnion(
    "employmentStatus",
    [salariedSchema, businessOwnerSchema, otherEmploymentSchema],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
          return { message: "Please select your employment status." };
        }
        return { message: ctx.defaultError };
      },
    },
  )
  .and(
    z.object({
      properties: z
        .array(propertyDetailSchema)
        .optional()
        .default([])
        .refine((arr) => arr.length <= 3, {
          message: "You can add a maximum of 3 properties.",
        }),
    }),
  )
  .and(incomeDetailsSchema);

// Add refinement for previous organization fields when hasPreviousOrganization is true
const refinedEmploymentInfoSchema = employmentInfoBaseSchema.refine(
  (data) => {
    if (data.employmentStatus === "SALARIED" && data.hasPreviousOrganization) {
      return (
        data.previousOrganizationName &&
        data.previousOrganizationName.trim().length > 0 &&
        data.previousDesignation &&
        data.previousDesignation.trim().length > 0 &&
        data.previousServiceYears &&
        data.previousServiceYears.trim().length > 0 &&
        data.previousServiceMonths &&
        data.previousServiceMonths.trim().length > 0
      );
    }
    return true;
  },
  {
    message:
      "Previous organization details are required when you have a previous organization.",
    path: ["previousOrganizationName"],
  },
);

export { refinedEmploymentInfoSchema as employmentInfoSchema };
export type EmploymentInfoValues = z.infer<typeof refinedEmploymentInfoSchema>;
export type PropertyDetailValues = z.infer<typeof propertyDetailSchema>;
