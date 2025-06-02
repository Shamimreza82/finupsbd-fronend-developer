"use client";

import type { documentInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/document-info-schema";
import type { employmentInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/employment-info-schema";
import type { guarantorInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/guarantor-info-schema"; // Import new schema
import type { loanInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-info-schema";
import type { loanRequestSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-request-schema";
import type { personalInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/personal-info-schema";
import type { residentialInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/residential-info-schema";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { z } from "zod";

// Define the form data structure
export type FormData = {
  personalInfo: z.infer<typeof personalInfoSchema> | null;
  residentialInfo: z.infer<typeof residentialInfoSchema> | null;
  employmentInfo: z.infer<typeof employmentInfoSchema> | null;
  loanInfo: z.infer<typeof loanInfoSchema> | null;
  loanRequest: z.infer<typeof loanRequestSchema> | null;
  documentInfo: z.infer<typeof documentInfoSchema> | null;
  guarantorInfo: z.infer<typeof guarantorInfoSchema> | null; // Add guarantorInfo
  draftMode: {
    personalInfo: boolean;
    residentialInfo: boolean;
    employmentInfo: boolean;
    loanInfo: boolean;
    loanRequest: boolean;
    documentInfo: boolean;
    guarantorInfo: boolean; // Add guarantorInfo
  };
};

// Define the form context type
interface FormContextType {
  formData: FormData;
  updateFormData: (step: keyof Omit<FormData, "draftMode">, data: any) => void;
  resetForm: () => void;
  isStepCompleted: (step: keyof Omit<FormData, "draftMode">) => boolean;
  isFormSubmitted: boolean;
  setIsFormSubmitted: (value: boolean) => void;
  submittedData: FormData | null;
  setSubmittedData: (data: FormData | null) => void;
  isStepEditable: (step: keyof Omit<FormData, "draftMode">) => boolean;
  setAllStepsToNonDraft: () => void;
  enableDocumentEditing: () => void;
}

// Create the form context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Initial form data
const initialFormData: FormData = {
  personalInfo: null,
  residentialInfo: null,
  employmentInfo: null,
  loanInfo: null,
  loanRequest: null,
  documentInfo: null,
  guarantorInfo: null,
  draftMode: {
    personalInfo: true,
    residentialInfo: true,
    employmentInfo: true,
    loanInfo: true,
    loanRequest: true,
    documentInfo: true,
    guarantorInfo: true,
  },
};

// Form provider component
export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // Load form data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("loan-application-form-data"); // Updated key
    const LoanRequest = localStorage.getItem("loanRequest");
    if (savedData && LoanRequest) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  // Update form data for a specific step
  const updateFormData = (
    step: keyof Omit<FormData, "draftMode">,
    data: any,
  ) => {
    const updatedFormData = {
      ...formData,
      [step]: data,
    };
    setFormData(updatedFormData);

    // Save to localStorage
    localStorage.setItem(
      "loan-application-form-data",
      JSON.stringify(updatedFormData),
    ); // Updated key
  };

  // Reset the form data
  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem("loan-application-form-data"); // Updated key
  };

  // Check if a step is completed
  const isStepCompleted = (step: keyof Omit<FormData, "draftMode">) => {
    return formData[step] !== null;
  };

  // Set all steps to non-draft mode
  const setAllStepsToNonDraft = () => {
    const updatedFormData = {
      ...formData,
      draftMode: {
        personalInfo: false,
        residentialInfo: false,
        employmentInfo: false,
        loanInfo: false,
        loanRequest: false,
        documentInfo: false,
        guarantorInfo: false, // Add guarantorInfo
      },
    };
    setFormData(updatedFormData);
    localStorage.setItem(
      "loan-application-form-data",
      JSON.stringify(updatedFormData),
    ); // Updated key
  };

  // Enable document editing only
  const enableDocumentEditing = () => {
    const updatedFormData = {
      ...formData,
      draftMode: {
        ...formData.draftMode,
        documentInfo: true,
        // If guarantor info also needs to be editable post-submission, add it here
        // guarantorInfo: true,
      },
    };
    setFormData(updatedFormData);
    localStorage.setItem(
      "loan-application-form-data",
      JSON.stringify(updatedFormData),
    ); // Updated key
  };

  // Check if a step is editable
  const isStepEditable = (step: keyof Omit<FormData, "draftMode">) => {
    if (!isFormSubmitted) return true;
    return formData.draftMode[step];
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        isStepCompleted,
        isFormSubmitted,
        setIsFormSubmitted,
        submittedData,
        setSubmittedData,
        isStepEditable,
        setAllStepsToNonDraft,
        enableDocumentEditing,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

// Custom hook to use the form context
export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
