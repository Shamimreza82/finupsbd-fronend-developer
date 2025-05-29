"use client";

import type { documentInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/document-info-schema";
import type { employmentInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/employment-info-schema";
import type { loanInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-info-schema";
import type { loanRequestSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-request-schema";
import { personalInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/personal-info-schema";
import type { residentialInfoSchema } from "@/app/(withApplicationLayout)/user/loan-application/schemas/residential-info-schema";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { z } from "zod";

// Define the form data structure
// Update the FormData type to include loanRequest
export type FormData = {
  personalInfo: z.infer<typeof personalInfoSchema> | null;
  residentialInfo: z.infer<typeof residentialInfoSchema> | null;
  employmentInfo: z.infer<typeof employmentInfoSchema> | null;
  loanInfo: z.infer<typeof loanInfoSchema> | null;
  loanRequest: z.infer<typeof loanRequestSchema> | null;
  documentInfo: z.infer<typeof documentInfoSchema> | null;
  draftMode: {
    personalInfo: boolean;
    residentialInfo: boolean;
    employmentInfo: boolean;
    loanInfo: boolean;
    loanRequest: boolean;
    documentInfo: boolean;
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
// Update the initial form data to include loanRequest
const initialFormData: FormData = {
  personalInfo: null,
  residentialInfo: null,
  employmentInfo: null,
  loanInfo: null,
  loanRequest: null,
  documentInfo: null,
  draftMode: {
    personalInfo: true,
    residentialInfo: true,
    employmentInfo: true,
    loanInfo: true,
    loanRequest: true,
    documentInfo: true,
  },
};

// Form provider component
export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // Load form data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("customer-loan-application-data");
    if (savedData) {
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
      "customer-loan-application-data",
      JSON.stringify(updatedFormData),
    );
  };

  // Reset the form data
  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem("customer-loan-application-data");
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
      },
    };
    setFormData(updatedFormData);
    localStorage.setItem(
      "customer-loan-application-data",
      JSON.stringify(updatedFormData),
    );
  };

  // Enable document editing only
  const enableDocumentEditing = () => {
    const updatedFormData = {
      ...formData,
      draftMode: {
        ...formData.draftMode,
        documentInfo: true,
      },
    };
    setFormData(updatedFormData);
    localStorage.setItem(
      "customer-loan-application-data",
      JSON.stringify(updatedFormData),
    );
  };

  // Check if a step is editable
  const isStepEditable = (step: keyof Omit<FormData, "draftMode">) => {
    // If form is not submitted, all steps are editable
    if (!isFormSubmitted) return true;

    // After submission, only check the draftMode for the specific step
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
