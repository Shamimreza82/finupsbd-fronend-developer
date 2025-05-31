"use client";

import { DatePickerInput } from "@/components/form/FormInputs";
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from "@/components/loan-application/form-inputs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  guarantorInfoSchema,
  type GuarantorInfoValues,
  type GuarantorSectionValues,
} from "../schemas/guarantor-info-schema";

const nationalityOptions = [
  { label: "Bangladeshi", value: "Bangladeshi" },
  { label: "Other", value: "Other" },
];

const relationOptions = [
  { label: "Spouse", value: "Spouse" },
  { label: "Parent", value: "Parent" },
  { label: "Sibling", value: "Sibling" },
  { label: "Friend", value: "Friend" },
  { label: "Colleague", value: "Colleague" },
  { label: "Other", value: "Other" },
];

// Helper to get default values for a guarantor section
const getDefaultGuarantorSectionValues = (): GuarantorSectionValues => ({
  fullName: "",
  fatherOrHusbandName: "",
  motherName: "",
  dateOfBirth: new Date(), // Initialize with current date or a valid default
  nationality: "",
  nationalIdNumber: "",
  mobileNumber: "+880",
  emailAddress: "",
  relationWithApplicant: "",
  presentAddress: "",
  permanentAddress: "",
  workAddress: "",
});

export default function Step7Page() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable } = useFormContext();

  const form = useForm<GuarantorInfoValues>({
    resolver: zodResolver(guarantorInfoSchema),
    defaultValues: {
      // Initialize with undefined or full empty structure.
      // If using undefined, ensure schema handles it gracefully or form.reset populates fully.
      // For consistency with step-1 which initializes all fields, let's provide a base structure.
      // However, since personalGuarantor and businessGuarantor are optional objects in the schema,
      // starting with them as undefined and letting form.reset populate them if they exist in formData
      // is also a valid approach. Let's stick to the pattern of initializing fields if they are part of the form.
      // The schema makes the *objects* optional, but if the object exists, its fields are required.
      // So, if we intend for the form to always have these sections available for input,
      // providing default empty structures is better for react-hook-form.
      personalGuarantor: getDefaultGuarantorSectionValues(),
      businessGuarantor: getDefaultGuarantorSectionValues(),
    },
  });

  // Load saved data
  useEffect(() => {
    if (formData.guarantorInfo) {
      const dataToLoad: GuarantorInfoValues = {
        personalGuarantor:
          formData.guarantorInfo.personalGuarantor ||
          getDefaultGuarantorSectionValues(),
        businessGuarantor:
          formData.guarantorInfo.businessGuarantor ||
          getDefaultGuarantorSectionValues(),
      };
      form.reset(dataToLoad);
    }
  }, [formData.guarantorInfo, form]); // form included as form.reset is a dependency

  // Handle editability
  useEffect(() => {
    if (!isStepEditable("guarantorInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  function onSubmit(data: GuarantorInfoValues) {
    // Clean data: if a guarantor section's fields are all still default/empty, treat it as undefined.
    const isSectionEffectivelyEmpty = (
      section: GuarantorSectionValues | undefined,
    ) => {
      if (!section) return true;
      const defaultSection = getDefaultGuarantorSectionValues();
      return Object.keys(section).every((key) => {
        const K = key as keyof GuarantorSectionValues;
        // Special check for mobile number due to +880 prefix
        if (K === "mobileNumber" && section[K] === "+880") return true;
        return (
          section[K] === defaultSection[K] ||
          section[K] === "" ||
          section[K] === undefined ||
          section[K] === null
        );
      });
    };

    const cleanedData: GuarantorInfoValues = {
      personalGuarantor: !isSectionEffectivelyEmpty(data.personalGuarantor)
        ? data.personalGuarantor
        : undefined,
      businessGuarantor: !isSectionEffectivelyEmpty(data.businessGuarantor)
        ? data.businessGuarantor
        : undefined,
    };
    updateFormData("guarantorInfo", cleanedData);
    router.push("/user/loan-application/preview");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Guarantor Section */}
        <div className="mt-4 space-y-6 rounded-md border p-4">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Guarantor Information</h2>
            <p className="text-sm text-muted-foreground">
              Provide details if you have a personal guarantor, business
              guarantor, or both. If a section is partially filled, all its
              required fields must be completed.
            </p>
          </div>
          <h3 className="text-lg font-medium">Personal Guarantor</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput
              form={form}
              name="personalGuarantor.fullName"
              label="Full Name (as per National ID)"
              required
              placeholder="Enter full name"
            />
            <TextInput
              form={form}
              name="personalGuarantor.fatherOrHusbandName"
              label="Father's/Husband's Name"
              required
              placeholder="Enter father's/husband's name"
            />
            <TextInput
              form={form}
              name="personalGuarantor.motherName"
              label="Mother's Name"
              required
              placeholder="Enter mother's name"
            />
            <DatePickerInput
              form={form}
              label="Date of Birth"
              name="personalGuarantor.dateOfBirth"
              required
            />
            <SelectInput
              form={form}
              name="personalGuarantor.nationality"
              label="Nationality"
              required
              options={nationalityOptions}
              placeholder="Select nationality"
            />
            <TextInput
              form={form}
              name="personalGuarantor.nationalIdNumber"
              label="National ID Number (NID)"
              required
              placeholder="Enter NID number"
            />
            <TextInput
              form={form}
              name="personalGuarantor.mobileNumber"
              label="Mobile Number"
              required
              placeholder="+880XXXXXXXXX"
              type="tel"
            />
            <TextInput
              form={form}
              name="personalGuarantor.emailAddress"
              label="Email Address"
              placeholder="Enter email address"
              type="email"
            />
            <SelectInput
              form={form}
              name="personalGuarantor.relationWithApplicant"
              label="Relation with Applicant"
              required
              options={relationOptions}
              placeholder="Select relation"
            />
          </div>
          <TextAreaInput
            form={form}
            name="personalGuarantor.presentAddress"
            label="Present Address"
            required
            placeholder="Enter present address"
          />
          <TextAreaInput
            form={form}
            name="personalGuarantor.permanentAddress"
            label="Permanent & Mailing Address"
            required
            placeholder="Enter permanent & mailing address"
          />
          <TextAreaInput
            form={form}
            name="personalGuarantor.workAddress"
            label="Work Address"
            required
            placeholder="Enter work address"
          />
        </div>

        <Separator />

        {/* Business Guarantor Section */}
        <div className="mt-4 space-y-6 rounded-md border p-4">
          <h3 className="text-lg font-medium">Business Guarantor</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput
              form={form}
              name="businessGuarantor.fullName"
              label="Full Name (as per National ID)"
              required
              placeholder="Enter full name"
            />
            <TextInput
              form={form}
              name="businessGuarantor.fatherOrHusbandName"
              label="Father's/Husband's Name"
              required
              placeholder="Enter father's/husband's name"
            />
            <TextInput
              form={form}
              name="businessGuarantor.motherName"
              label="Mother's Name"
              required
              placeholder="Enter mother's name"
            />

            <DatePickerInput
              form={form}
              label="Date of Birth"
              name="businessGuarantor.dateOfBirth"
              required
            />
            <SelectInput
              form={form}
              name="businessGuarantor.nationality"
              label="Nationality"
              required
              options={nationalityOptions}
              placeholder="Select nationality"
            />
            <TextInput
              form={form}
              name="businessGuarantor.nationalIdNumber"
              label="National ID Number (NID)"
              required
              placeholder="Enter NID number"
            />
            <TextInput
              form={form}
              name="businessGuarantor.mobileNumber"
              label="Mobile Number"
              required
              placeholder="+880XXXXXXXXX"
              type="tel"
            />
            <TextInput
              form={form}
              name="businessGuarantor.emailAddress"
              label="Email Address"
              placeholder="Enter email address"
              type="email"
            />
            <SelectInput
              form={form}
              name="businessGuarantor.relationWithApplicant"
              label="Relation with Applicant"
              required
              options={relationOptions}
              placeholder="Select relation"
            />
          </div>
          <h4 className="text-md pt-2 font-semibold">Address</h4>
          <TextAreaInput
            form={form}
            name="businessGuarantor.presentAddress"
            label="Present Address"
            required
            placeholder="Enter present address"
          />
          <TextAreaInput
            form={form}
            name="businessGuarantor.permanentAddress"
            label="Permanent & Mailing Address"
            required
            placeholder="Enter permanent & mailing address"
          />
          <TextAreaInput
            form={form}
            name="businessGuarantor.workAddress"
            label="Work Address"
            required
            placeholder="Enter work address"
          />
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/user/loan-application/step-6")}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
