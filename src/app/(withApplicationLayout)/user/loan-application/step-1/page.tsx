"use client";

import { DatePickerInput } from "@/components/form/FormInputs";
import {
  SelectInput,
  TextInput,
} from "@/components/loan-application/form-inputs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  personalInfoSchema,
  type PersonalInfoValues,
} from "../schemas/personal-info-schema";

export default function PersonalInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable } = useFormContext();
  const [showSpouseField, setShowSpouseField] = useState(false);
  // Initialize form with react-hook-form
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema) as any,
    defaultValues: {
      fullName: "",
      fatherOrHusbandName: "",
      motherName: "",
      gender: "",
      dateOfBirth: undefined,
      placeOfBirth: "",
      nationality: "Bangladeshi",
      educationalLevel: undefined,
      identificationType: "",
      identificationNumber: "",
      maritalStatus: "",
      spouseName: "",
      residentialStatus: "",
      religion: "",
      mobileNumber: "+880",
      alternateMobileNumber: "+880",
      emailAddress: "",
      socialMediaProfiles: [""],
    },
  });

  // Watch marital status to show/hide spouse field
  const maritalStatus = form.watch("maritalStatus");
  const socialMediaProfiles = form.watch("socialMediaProfiles");

  useEffect(() => {
    setShowSpouseField(maritalStatus === "MARRIED");
  }, [maritalStatus]);

  // Load saved data if available
  useEffect(() => {
    if (formData.personalInfo) {
      // Make sure spouseName is never null
      const formattedData = {
        ...formData.personalInfo,
        spouseName: formData.personalInfo.spouseName || "",
        socialMediaProfiles: Array.isArray(
          formData.personalInfo.socialMediaProfiles,
        )
          ? formData.personalInfo.socialMediaProfiles
          : formData.personalInfo.socialMediaProfiles
            ? [formData.personalInfo.socialMediaProfiles]
            : [""],
      };
      form.reset(formattedData);
      setShowSpouseField(formData.personalInfo.maritalStatus === "MARRIED");
    }
  }, [formData.personalInfo, form]);

  // Redirect if step is not editable
  useEffect(() => {
    if (!isStepEditable("personalInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  // Handle form submission
  const onSubmit: SubmitHandler<z.infer<typeof personalInfoSchema>> = (
    data,
  ) => {
    // Filter out empty social media links
    data.socialMediaProfiles = data.socialMediaProfiles.filter(
      (link) => link.trim() !== "",
    );

    // If all social media links are removed, set to empty array
    if (data.socialMediaProfiles.length === 0) {
      data.socialMediaProfiles = [];
    }

    updateFormData("personalInfo", data);
    router.push("/user/loan-application/step-2");
  };

  // Add a new social media input field
  const addSocialMediaField = () => {
    const currentLinks = form.getValues("socialMediaProfiles") || [];
    form.setValue("socialMediaProfiles", [...currentLinks, ""]);
  };

  // Remove a social media input field
  const removeSocialMediaField = (index: number) => {
    const currentLinks = form.getValues("socialMediaProfiles") || [];
    if (currentLinks.length > 1) {
      const newLinks = [...currentLinks];
      newLinks.splice(index, 1);
      form.setValue("socialMediaProfiles", newLinks);
    }
  };

  // Gender options
  const genderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];

  // Educational level options
  const educationOptions = [
    { label: "High School", value: "HIGHSCHOOL" },
    { label: "Bachelor's Degree", value: "BACHELOR" },
    { label: "Master's Degree", value: "MASTER" },
    { label: "PhD", value: "PHD" },
    { label: "Other", value: "OTHER" },
  ];

  // Identification type options
  const idTypeOptions = [
    { label: "National ID", value: "NID" },
    { label: "Passport", value: "PASSPORT" },
  ];

  // Marital status options
  const maritalStatusOptions = [
    { label: "Single", value: "SINGLE" },
    { label: "Married", value: "MARRIED" },
    { label: "Divorced", value: "DIVORCED" },
    { label: "Widowed", value: "WIDOWED" },
  ];

  // Residential status options
  const residentialStatusOptions = [
    { label: "Resident", value: "RESIDENT" },
    { label: "Non-Resident", value: "NONRESIDENT" },
    { label: "Temporary Resident", value: "TEMPORARYRESIDENT" },
  ];

  // Religion options
  const religionOptions = [
    { label: "Islam", value: "ISLAM" },
    { label: "Hinduism", value: "HINDUISM" },
    { label: "Christianity", value: "CHRISTIANITY" },
    { label: "Buddhism", value: "BUDDHISM" },
    { label: "Other", value: "OTHER" },
  ];

  // Social media platform labels
  const socialMediaLabels = [
    "Facebook",
    "Twitter",
    "Instagram",
    "LinkedIn",
    "Other",
  ];

  return (
    <Card className="border-[#E9EFF6] text-tertiary-primary">
      <CardHeader>
        <CardTitle className="text-xl">Personal Information</CardTitle>
        <CardDescription>
          Update your photo and personal details here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                form={form}
                name="fullName"
                label="Full Name (as per National ID)"
                placeholder="Enter your full name"
                required
              />

              <TextInput
                form={form}
                name="fatherOrHusbandName"
                label="Father's/Husband's Name"
                placeholder="Enter your father's name"
                required
              />

              <TextInput
                form={form}
                name="motherName"
                label="Mother's Name"
                placeholder="Enter your mother's name"
                required
              />

              <SelectInput
                form={form}
                name="gender"
                label="Gender"
                options={genderOptions}
                required
              />

              <DatePickerInput
                form={form}
                label="Date of Birth"
                name="dateOfBirth"
                required
              />

              <TextInput
                form={form}
                name="placeOfBirth"
                label="Place of Birth"
                placeholder="Enter your Place of Birth"
                required
              />

              <TextInput
                form={form}
                name="nationality"
                label="Applicant Nationality"
                placeholder="Enter your nationality"
                required
              />

              <SelectInput
                form={form}
                name="educationalLevel"
                label="Educational Level"
                options={educationOptions}
                required
              />

              <SelectInput
                form={form}
                name="identificationType"
                label="Identification Type"
                options={idTypeOptions}
                required
              />

              <TextInput
                form={form}
                name="identificationNumber"
                label="Identification Number"
                placeholder="Enter your Identification Number"
                required
              />

              <SelectInput
                form={form}
                name="maritalStatus"
                label="Marital Status"
                options={maritalStatusOptions}
                required
              />

              {showSpouseField && (
                <TextInput
                  form={form}
                  name="spouseName"
                  label="Spouse's Name (if applicable)"
                  placeholder="Enter your spouse's name"
                />
              )}

              <SelectInput
                form={form}
                name="residentialStatus"
                label="Residential Status"
                options={residentialStatusOptions}
                required
              />

              <SelectInput
                form={form}
                name="religion"
                label="Religion"
                options={religionOptions}
                required
              />

              <TextInput
                form={form}
                name="mobileNumber"
                label="Mobile Number"
                type="tel"
                required
              />

              <TextInput
                form={form}
                name="alternateMobileNumber"
                label="Alternate Mobile Number"
                type="tel"
              />

              <TextInput
                form={form}
                name="emailAddress"
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
            <div className="w-full">
              <div className="mb-2">
                <label className="text-sm font-medium">
                  Social Media Profiles (optional)
                </label>
              </div>

              {socialMediaProfiles.map((link, index) => (
                <div
                  key={index}
                  className="mb-2 flex w-full items-center gap-2"
                >
                  <div className="w-11/12">
                    <TextInput
                      form={form}
                      name={`socialMediaProfiles.${index}`}
                      label=""
                      placeholder={`Enter your ${socialMediaLabels[index % socialMediaLabels.length]} profile link`}
                    />
                  </div>

                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-1"
                      onClick={() => removeSocialMediaField(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addSocialMediaField}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Social Media Profile
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              All identity information is encrypted in transit and at rest,
              accessible only to authorized personnel for verification
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/loan-application")}
              >
                Back
              </Button>
              <Button type="submit">Save and Continue</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
