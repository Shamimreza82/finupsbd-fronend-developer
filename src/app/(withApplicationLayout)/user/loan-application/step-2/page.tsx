"use client";

import {
  residentialInfoSchema,
  type ResidentialInfoValues,
} from "@/app/(withApplicationLayout)/user/loan-application/schemas/residential-info-schema";
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

export default function ResidentialInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable } = useFormContext();
  const [isPermanentSameAsPresent, setIsPermanentSameAsPresent] =
    useState(false);

  // Initialize form with react-hook-form
  const form = useForm<ResidentialInfoValues>({
    resolver: zodResolver(residentialInfoSchema) as any,
    defaultValues: {
      presentAddress: "",
      presentDivision: "",
      presentDistrict: "",
      presentThana: "",
      presentPostalCode: "",
      presentLengthOfStay: "",
      presentOwnershipStatus: "",
      isPermanentSameAsPresent: false,
      permanentAddress: "",
      permanentDivision: "",
      permanentDistrict: "",
      permanentThana: "",
      permanentPostalCode: "",
      permanentLengthOfStay: "",
      permanentOwnershipStatus: "",
    },
  });

  // Watch isPermanentSameAsPresent to show/hide permanent address fields
  const watchIsPermanentSameAsPresent = form.watch("isPermanentSameAsPresent");

  useEffect(() => {
    setIsPermanentSameAsPresent(watchIsPermanentSameAsPresent);

    // If same as present, copy present address values to permanent address
    if (watchIsPermanentSameAsPresent) {
      const presentValues = form.getValues();
      form.setValue("permanentAddress", presentValues.presentAddress);
      form.setValue("permanentDivision", presentValues.presentDivision);
      form.setValue("permanentDistrict", presentValues.presentDistrict);
      form.setValue("permanentThana", presentValues.presentThana);
      form.setValue("permanentPostalCode", presentValues.presentPostalCode);
      form.setValue("permanentLengthOfStay", presentValues.presentLengthOfStay);
      form.setValue(
        "permanentOwnershipStatus",
        presentValues.presentOwnershipStatus,
      );
    }
  }, [watchIsPermanentSameAsPresent, form]);

  // Load saved data if available
  useEffect(() => {
    if (formData.residentialInfo) {
      // Create a new object without propertyType and propertyValue
      const { propertyType, propertyValue, ...restData } =
        formData.residentialInfo as any;
      form.reset(restData);
      setIsPermanentSameAsPresent(restData.isPermanentSameAsPresent);
    }
  }, [formData.residentialInfo, form]);

  // Redirect if step is not editable
  useEffect(() => {
    if (!isStepEditable("residentialInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  // Handle form submission
  function onSubmit(data: ResidentialInfoValues) {
    updateFormData("residentialInfo", data);
    router.push("/user/loan-application/step-3");
  }

  // Division options
  const divisionOptions = [
    { label: "Dhaka", value: "dhaka" },
    { label: "Chittagong", value: "chittagong" },
    { label: "Rajshahi", value: "rajshahi" },
    { label: "Khulna", value: "khulna" },
    { label: "Barisal", value: "barisal" },
    { label: "Sylhet", value: "sylhet" },
    { label: "Rangpur", value: "rangpur" },
    { label: "Mymensingh", value: "mymensingh" },
  ];

  // District options (simplified)
  const districtOptions = [
    { label: "Dhaka", value: "dhaka" },
    { label: "Gazipur", value: "gazipur" },
    { label: "Narayanganj", value: "narayanganj" },
    { label: "Tangail", value: "tangail" },
  ];

  // Thana options (simplified)
  const thanaOptions = [
    { label: "Mirpur", value: "mirpur" },
    { label: "Uttara", value: "uttara" },
    { label: "Gulshan", value: "gulshan" },
    { label: "Mohammadpur", value: "mohammadpur" },
    { label: "Dhanmondi", value: "dhanmondi" },
    { label: "Sadar", value: "sadar" },
  ];

  // Ownership status options
  const ownershipStatusOptions = [
    { label: "Owned", value: "owned" },
    { label: "Rented", value: "rented" },
    { label: "Family Owned", value: "familyOwned" },
    { label: "Company Provided", value: "companyProvided" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Residential Information</CardTitle>
        <CardDescription>Update your residential details here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Present Address</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <TextInput
                    form={form}
                    name="presentAddress"
                    label="Address"
                    placeholder="559/A..."
                    required
                  />
                </div>

                <SelectInput
                  form={form}
                  name="presentDivision"
                  label="Division"
                  options={divisionOptions}
                  required
                />

                <SelectInput
                  form={form}
                  name="presentDistrict"
                  label="District"
                  options={districtOptions}
                  required
                />

                <SelectInput
                  form={form}
                  name="presentThana"
                  label="Thana"
                  options={thanaOptions}
                  required
                />

                <TextInput
                  form={form}
                  name="presentPostalCode"
                  label="Postal Code"
                  placeholder="1206"
                  required
                />

                <TextInput
                  form={form}
                  name="presentLengthOfStay"
                  label="Length of Stay at Current Address"
                  placeholder="2 Years"
                  required
                />

                <SelectInput
                  form={form}
                  name="presentOwnershipStatus"
                  label="Ownership Status"
                  options={ownershipStatusOptions}
                  required
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Present Residential Address(if different)
              </h3>

              <CheckboxInput
                form={form}
                name="isPermanentSameAsPresent"
                label="Permanent address is the same as Present"
              />

              {!isPermanentSameAsPresent && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium">Permanent Address</h3>

                  <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="permanentAddress"
                        label="Address"
                        placeholder="559/A..."
                        required
                      />
                    </div>

                    <SelectInput
                      form={form}
                      name="permanentDivision"
                      label="Division"
                      options={divisionOptions}
                      required
                    />

                    <SelectInput
                      form={form}
                      name="permanentDistrict"
                      label="District"
                      options={districtOptions}
                      required
                    />

                    <SelectInput
                      form={form}
                      name="permanentThana"
                      label="Thana"
                      options={thanaOptions}
                      required
                    />

                    <TextInput
                      form={form}
                      name="permanentPostalCode"
                      label="Postal Code"
                      placeholder="1206"
                      required
                    />

                    <TextInput
                      form={form}
                      name="permanentLengthOfStay"
                      label="Length of Stay at Current Address"
                      placeholder="2 Years"
                      required
                    />

                    <SelectInput
                      form={form}
                      name="permanentOwnershipStatus"
                      label="Ownership Status"
                      options={ownershipStatusOptions}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/loan-application/step-1")}
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
