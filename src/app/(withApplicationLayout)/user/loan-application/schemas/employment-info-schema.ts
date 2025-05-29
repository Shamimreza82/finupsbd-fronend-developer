import { z } from "zod";

// Base schema for employment info
const baseSchema = z.object({
  employmentStatus: z.enum(
    [
      "SALARIED",
      "BUSINESS_OWNER",
      "SELF_EMPLOYED",
      "RETIRED",
      "HOUSEWIFE",
      "UNEMPLOYED",
    ],
    {
      required_error: "Please select your employment status.",
    },
  ),
});

// Schema for salaried professionals
const salariedSchema = z.object({
  employmentStatus: z.literal("SALARIED"),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  designation: z.string().min(2, {
    message: "Designation must be at least 2 characters.",
  }),
  department: z.string().min(2, {
    message: "Department must be at least 2 characters.",
  }),
  employeeId: z.string().min(1, {
    message: "Employee ID is required.",
  }),
  employmentType: z.enum(
    ["PERMANENT", "CONTRACTUAL", "PARTTIME", "PROBATION"],
    {
      required_error: "Please select your employment type.",
    },
  ),
  // dateOfJoining: z.string().min(1, {
  //   message: "Date of joining is required.",
  // }),
  dateOfJoining: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Date of joining must be a valid date.",
    }),

  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  organizationAddress: z.string().min(2, {
    message: "Organization address must be at least 2 characters.",
  }),
  serviceYears: z.string().min(1, {
    message: "Years of service is required.",
  }),
  serviceMonths: z.string().min(1, {
    message: "Months of service is required.",
  }),
  eTin: z.string().min(1, {
    message: "E-TIN is required.",
  }),
  officialContact: z.string().optional(),
  hasPreviousOrganization: z.boolean().default(false),
  previousOrganizationName: z.string().optional(),
  previousDesignation: z.string().optional(),
  previousServiceYears: z.string().optional(),
  previousServiceMonths: z.string().optional(),
  totalExperienceYears: z.string().min(1, {
    message: "Total experience years is required.",
  }),
  totalExperienceMonths: z.string().min(1, {
    message: "Total experience months is required.",
  }),
});

// Schema for business owners
const businessOwnerSchema = z.object({
  employmentStatus: z.literal("BUSINESS_OWNER"),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessAddress: z.string().min(2, {
    message: "Business address must be at least 2 characters.",
  }),
  businessOwnerType: z.enum(
    ["PROPRIETORSHIP", "PARTNERSHIP", "PUBLIC_LIMITED_COMPANY"],
    {
      required_error: "Please select your business owner type.",
    },
  ),
  businessType: z.enum(["RETAIL", "WHOLESALE", "MANUFACTURING"], {
    required_error: "Please select your business type.",
  }),
  sharePortion: z.string().min(1, {
    message: "Share portion is required.",
  }),
  businessRegistrationNumber: z.string().min(1, {
    message: "Business registration/trade license number is required.",
  }),
  tradeLicenseAge: z.string({
    required_error: "Please select trade license age.",
  }),
});

// Schema for other employment types
const otherEmploymentSchema = z.object({
  employmentStatus: z.enum([
    "SELF_EMPLOYED",
    "RETIRED",
    "HOUSEWIFE",
    "UNEMPLOYED",
  ]),
});

// Property details schema
const propertyDetailsSchema = z.object({
  propertyType: z.string({
    required_error: "Please select property type.",
  }),
  propertyValue: z.string().min(1, {
    message: "Property value is required.",
  }),
});

// Income details schema
const incomeDetailsSchema = z.object({
  grossMonthlyIncome: z.string().min(1, {
    message: "Gross monthly income is required.",
  }),
  rentIncome: z.string().optional(),
  otherIncome: z.string().optional(),
  totalIncome: z.string().min(1, {
    message: "Total income is required.",
  }),
});

// Combined schema with discriminated union for employment status
const employmentInfoSchema = z
  .discriminatedUnion("employmentStatus", [
    salariedSchema,
    businessOwnerSchema,
    otherEmploymentSchema,
  ])
  .and(propertyDetailsSchema)
  .and(incomeDetailsSchema);

// Add validation for previous organization fields when hasPreviousOrganization is true
const refinedSchema = employmentInfoSchema.refine(
  (data) => {
    if (data.employmentStatus === "SALARIED" && data.hasPreviousOrganization) {
      return (
        !!data.previousOrganizationName &&
        !!data.previousDesignation &&
        !!data.previousServiceYears &&
        !!data.previousServiceMonths
      );
    }
    return true;
  },
  {
    message:
      "Previous organization details are required when you have a previous organization",
    path: ["previousOrganizationName"],
  },
);

export { refinedSchema as employmentInfoSchema };
export type EmploymentInfoValues = z.infer<typeof refinedSchema>;
