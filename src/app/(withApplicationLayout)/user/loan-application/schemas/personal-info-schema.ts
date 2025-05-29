import { calculateAge } from "@/utils";
import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  fatherOrHusbandName: z.string().min(2, {
    message: "Father's/Husband's name must be at least 2 characters.",
  }),
  motherName: z.string().min(2, {
    message: "Mother's name must be at least 2 characters.",
  }),
  gender: z.string({
    required_error: "Please select your gender.",
  }),

  dateOfBirth: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine(
      (dob) => {
        const age = calculateAge(dob);
        return age >= 22 && age <= 65;
      },
      { message: "Your age must be between 22 and 65 years old." },
    ),
  ),

  placeOfBirth: z.string().min(2, {
    message: "Place of birth must be at least 2 characters.",
  }),
  nationality: z.string().min(2, {
    message: "Nationality must be at least 2 characters.",
  }),
  educationalLevel: z.string().optional(),
  identificationType: z.string({
    required_error: "Please select your identification type.",
  }),
  identificationNumber: z.string().min(2, {
    message: "Identification number must be at least 2 characters.",
  }),
  maritalStatus: z.string({
    required_error: "Please select your marital status.",
  }),
  spouseName: z.string().default(""),
  residentialStatus: z.string({
    required_error: "Please select your residential status.",
  }),
  religion: z.string({
    required_error: "Please select your religion.",
  }),
  mobileNumber: z.string().min(5, {
    message: "Mobile number must be at least 5 characters.",
  }),
  alternateMobileNumber: z.string().optional(),
  emailAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),
  socialMediaProfiles: z.array(z.string()).default([]),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
