"use client";

import {
  employmentInfoSchema,
  type EmploymentInfoValues,
} from "@/app/(withApplicationLayout)/user/loan-application/schemas/employment-info-schema";
import { DatePickerInput } from "@/components/form/FormInputs";

import { CheckboxInput } from "@/components/loan-application/checkbox-input";
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
import { Separator } from "@/components/ui/separator";
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EmploymentInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable } = useFormContext();
  const [employmentStatus, setEmploymentStatus] = useState<string>("");
  const [hasPreviousOrganization, setHasPreviousOrganization] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<EmploymentInfoValues>({
    resolver: zodResolver(employmentInfoSchema) as any,
    defaultValues: {
      employmentStatus: undefined,
      // Salaried fields
      jobTitle: "",
      designation: "",
      department: "",
      employeeId: "",
      employmentType: undefined,
      dateOfJoining: undefined,
      organizationName: "",
      organizationAddress: "",
      serviceYears: "",
      serviceMonths: "",
      eTin: "",
      officialContact: "",
      hasPreviousOrganization: false,
      previousOrganizationName: "",
      previousDesignation: "",
      previousServiceYears: "",
      previousServiceMonths: "",
      totalExperienceYears: "",
      totalExperienceMonths: "",
      // Business owner fields
      businessName: "",
      businessAddress: "",
      businessOwnerType: undefined,
      businessType: undefined,
      sharePortion: "",
      businessRegistrationNumber: "",
      tradeLicenseAge: "",
      // Property details
      propertyType: "",
      propertyValue: "",
      // Income details
      grossMonthlyIncome: "",
      rentIncome: "",
      otherIncome: "",
      totalIncome: "",
    },
  });

  // Watch employment status and previous organization checkbox
  const watchEmploymentStatus = form.watch("employmentStatus");
  const watchHasPreviousOrganization = form.watch("hasPreviousOrganization");

  // Update state when watched values change
  useEffect(() => {
    setEmploymentStatus(watchEmploymentStatus || "");
  }, [watchEmploymentStatus]);

  useEffect(() => {
    setHasPreviousOrganization(watchHasPreviousOrganization || false);
  }, [watchHasPreviousOrganization]);

  // Calculate total experience when service period changes
  useEffect(() => {
    if (employmentStatus === "SALARIED") {
      const currentYears = Number.parseInt(
        form.getValues("serviceYears") || "0",
        10,
      );
      const currentMonths = Number.parseInt(
        form.getValues("serviceMonths") || "0",
        10,
      );

      let totalYears = currentYears;
      let totalMonths = currentMonths;

      if (hasPreviousOrganization) {
        const prevYears = Number.parseInt(
          form.getValues("previousServiceYears") || "0",
          10,
        );
        const prevMonths = Number.parseInt(
          form.getValues("previousServiceMonths") || "0",
          10,
        );

        totalYears += prevYears;
        totalMonths += prevMonths;
      }

      // Adjust months if they exceed 12
      if (totalMonths >= 12) {
        totalYears += Math.floor(totalMonths / 12);
        totalMonths = totalMonths % 12;
      }

      form.setValue("totalExperienceYears", totalYears.toString());
      form.setValue("totalExperienceMonths", totalMonths.toString());
    }
  }, [
    form.watch("serviceYears"),
    form.watch("serviceMonths"),
    form.watch("previousServiceYears"),
    form.watch("previousServiceMonths"),
    hasPreviousOrganization,
    employmentStatus,
    form,
  ]);

  // Load saved data if available
  useEffect(() => {
    if (formData.employmentInfo) {
      form.reset(formData.employmentInfo);
      setEmploymentStatus(formData.employmentInfo.employmentStatus);
      setHasPreviousOrganization(
        (formData.employmentInfo as any).hasPreviousOrganization || false,
      );
    }
  }, [formData.employmentInfo, form]);

  // Redirect if step is not editable
  useEffect(() => {
    if (!isStepEditable("employmentInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  // Handle form submission
  function onSubmit(data: EmploymentInfoValues) {
    updateFormData("employmentInfo", data);
    router.push("/user/loan-application/step-4");
  }

  // Employment status options
  const employmentStatusOptions = [
    { label: "Salaried", value: "SALARIED" },
    { label: "Business Owner", value: "BUSINESS_OWNER" },
    { label: "Self Employed", value: "SELF_EMPLOYED" },
  ];

  // Employment type options
  const employmentTypeOptions = [
    { label: "Permanent", value: "PERMANENT" },
    { label: "Contractual", value: "CONTRACTUAL" },
    { label: "Parttime", value: "PARTTIME" },
    { label: "Probation", value: "PROBATION" },
  ];

  // Business owner type options
  const businessOwnerOptions = [
    { label: "Proprietorship", value: "PROPRIETORSHIP" },
    { label: "Partnership", value: "PARTNERSHIP" },
    { label: "Public Limited Company", value: "PUBLIC_LIMITED_COMPANY" },
  ];

  // Business type options
  const businessTypeOptions = [
    { label: "Retail", value: "RETAIL" },
    { label: "Wholesale", value: "WHOLESALE" },
    { label: "Manufacturing", value: "MANUFACTURING" },
  ];

  // Trade license age options
  const tradeLicenseExperienceOptions = [
    { label: "1 Year", value: "1" },
    { label: "2 Years", value: "2" },
    { label: "3 Years", value: "3" },
    { label: "4 Years", value: "4" },
    { label: "5 Years", value: "5" },
    { label: "6 Years", value: "6" },
    { label: "7 Years", value: "7" },
    { label: "8 Years", value: "8" },
    { label: "9 Years", value: "9" },
    { label: "10 Years", value: "10" },
  ];

  // Property type options
  const propertyTypeOptions = [
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
    { label: "Land", value: "land" },
    { label: "Apartment", value: "apartment" },
    { label: "House", value: "house" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment & Financial Information</CardTitle>
        <CardDescription>
          Provide details about your employment and financial status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Employment Details</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <SelectInput
                    form={form}
                    name="employmentStatus"
                    label="Employment Status"
                    options={employmentStatusOptions}
                    placeholder="Select employment status"
                    required
                  />
                </div>

                {employmentStatus === "SALARIED" && (
                  <>
                    <TextInput
                      form={form}
                      name="jobTitle"
                      label="Job Title"
                      placeholder="Enter job title"
                      required
                    />
                    <TextInput
                      form={form}
                      name="designation"
                      label="Designation"
                      placeholder="Enter designation"
                      required
                    />
                    <TextInput
                      form={form}
                      name="department"
                      label="Department"
                      placeholder="Enter department"
                      required
                    />
                    <TextInput
                      form={form}
                      name="employeeId"
                      label="Employee ID"
                      placeholder="Enter employee ID"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="employmentType"
                      label="Employment Type"
                      options={employmentTypeOptions}
                      placeholder="Select employment type"
                      required
                    />
                    {/* <DatePicker
                      form={form}
                      name="dateOfJoining"
                      label="Date of Joining"
                      placeholder="Select date"
                      required
                    /> */}
                    <DatePickerInput
                      form={form}
                      label="Date of Joining"
                      name="dateOfJoining"
                      placeholder="Select date of joining"
                      required
                    />

                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="organizationName"
                        label="Organization Name"
                        placeholder="Enter organization name"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="organizationAddress"
                        label="Organization Address"
                        placeholder="Enter organization address"
                        required
                      />
                    </div>

                    <TextInput
                      form={form}
                      name="eTin"
                      label="E-TIN"
                      placeholder="Enter E-TIN"
                      required
                    />
                    <TextInput
                      form={form}
                      name="officialContact"
                      label="Official Contact (if any)"
                      placeholder="Enter official contact"
                    />

                    <div>
                      <h4 className="text-md mb-2 font-medium">
                        Length of Service Period
                      </h4>
                      <div className="flex items-end gap-4">
                        <div className="flex-1">
                          <TextInput
                            form={form}
                            name="serviceYears"
                            label="Years"
                            placeholder="Years"
                            type="number"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <TextInput
                            form={form}
                            name="serviceMonths"
                            label="Months"
                            placeholder="Months"
                            type="number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <CheckboxInput
                        form={form}
                        name="hasPreviousOrganization"
                        label="Previous Organization"
                      />
                    </div>

                    {hasPreviousOrganization && (
                      <>
                        <TextInput
                          form={form}
                          name="previousOrganizationName"
                          label="Name of Organization"
                          placeholder="Enter previous organization name"
                          required
                        />
                        <TextInput
                          form={form}
                          name="previousDesignation"
                          label="Designation"
                          placeholder="Enter previous designation"
                          required
                        />
                        <div>
                          <h4 className="text-md mb-2 font-medium">
                            Length of Previous Service Period
                          </h4>
                          <div className="flex items-end gap-4">
                            <div className="flex-1">
                              <TextInput
                                form={form}
                                name="previousServiceYears"
                                label="Years"
                                placeholder="Years"
                                type="number"
                                required
                              />
                            </div>
                            <div className="flex-1">
                              <TextInput
                                form={form}
                                name="previousServiceMonths"
                                label="Months"
                                placeholder="Months"
                                type="number"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="md:col-span-2">
                      <h4 className="text-md mb-2 font-medium">
                        Total Experience
                      </h4>
                      <div className="flex items-end gap-4">
                        <div className="flex-1">
                          <TextInput
                            form={form}
                            name="totalExperienceYears"
                            label="Years"
                            placeholder="Years"
                            type="number"
                            required
                            disabled
                          />
                        </div>
                        <div className="flex-1">
                          <TextInput
                            form={form}
                            name="totalExperienceMonths"
                            label="Months"
                            placeholder="Months"
                            type="number"
                            required
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {["BUSINESS_OWNER", "SELF_EMPLOYED"].includes(
                  employmentStatus,
                ) && (
                  <>
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="businessName"
                        label="Business Name"
                        placeholder="Enter business name"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="businessAddress"
                        label="Business Address"
                        placeholder="Enter business address"
                        required
                      />
                    </div>
                    <SelectInput
                      form={form}
                      name="businessOwnerType"
                      label="Business Owner Type"
                      options={businessOwnerOptions}
                      placeholder="Select business owner type"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="businessType"
                      label="Business Type"
                      options={businessTypeOptions}
                      placeholder="Select business type"
                      required
                    />
                    <TextInput
                      form={form}
                      name="sharePortion"
                      label="Share Portion (%)"
                      placeholder="Enter share portion"
                      type="number"
                      required
                    />
                    <TextInput
                      form={form}
                      name="businessRegistrationNumber"
                      label="Business Registration/Trade License Number"
                      placeholder="Enter registration number"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="tradeLicenseAge"
                      label="Trade License Age"
                      options={tradeLicenseExperienceOptions}
                      placeholder="Select trade license age"
                      required
                    />
                  </>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Property Details</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <SelectInput
                  form={form}
                  name="propertyType"
                  label="Type of Property"
                  options={propertyTypeOptions}
                  placeholder="Select property type"
                  required
                />
                <TextInput
                  form={form}
                  name="propertyValue"
                  label="Approximate Value (in BDT)"
                  placeholder="Enter property value"
                  required
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Income Details</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextInput
                  form={form}
                  name="grossMonthlyIncome"
                  label="Gross Monthly Salary/Income"
                  placeholder="Enter gross monthly income"
                  required
                />
                <TextInput
                  form={form}
                  name="rentIncome"
                  label="Rent Income"
                  placeholder="Enter rent income (if any)"
                />
                <TextInput
                  form={form}
                  name="otherIncome"
                  label="Other Income"
                  placeholder="Enter other income (if any)"
                />
                <TextInput
                  form={form}
                  name="totalIncome"
                  label="Total Income"
                  placeholder="Enter total income"
                  required
                />
              </div>
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/loan-application/step-2")}
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
