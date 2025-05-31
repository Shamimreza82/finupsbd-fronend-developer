"use client";

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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  residentialInfoSchema,
  type ResidentialInfoValues,
} from "../schemas/residential-info-schema";
// Updated import: ComboBoxInput added, SelectOption is now exported from form-inputs
import { CheckboxInput } from "@/components/loan-application/checkbox-input";
import {
  ComboBoxInput,
  SelectInput,
  TextInput,
  type SelectOption,
} from "@/components/loan-application/form-inputs";
import { Separator } from "@/components/ui/separator";

import { district as allDistricts } from "@/_data/district";
import { division as allDivisions } from "@/_data/division";
import { thana as allThanas } from "@/_data/thana";

export default function ResidentialInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable } = useFormContext();
  const [isPermanentSameAsPresent, setIsPermanentSameAsPresent] =
    useState(false);

  const form = useForm<ResidentialInfoValues>({
    resolver: zodResolver(residentialInfoSchema),
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

  const [presentFilteredDistricts, setPresentFilteredDistricts] = useState<
    SelectOption[]
  >([]);
  const [presentFilteredThanas, setPresentFilteredThanas] = useState<
    SelectOption[]
  >([]);
  const [permanentFilteredDistricts, setPermanentFilteredDistricts] = useState<
    SelectOption[]
  >([]);
  const [permanentFilteredThanas, setPermanentFilteredThanas] = useState<
    SelectOption[]
  >([]);

  const divisionOptions: SelectOption[] = allDivisions.map((d) => ({
    label: d.name,
    value: d.id,
  }));
  const ownershipStatusOptions: SelectOption[] = [
    { label: "Owned", value: "owned" },
    { label: "Rented", value: "rented" },
    { label: "Family Owned", value: "familyOwned" },
    { label: "Company Provided", value: "companyProvided" },
  ];

  const watchPresentDivision = form.watch("presentDivision");
  const watchPresentDistrict = form.watch("presentDistrict");
  const watchPermanentDivision = form.watch("permanentDivision");
  const watchPermanentDistrict = form.watch("permanentDistrict");
  const watchIsPermanentSameAsPresent = form.watch("isPermanentSameAsPresent");

  useEffect(() => {
    if (watchPresentDivision) {
      const filtered = allDistricts
        .filter((district) => district.division_id === watchPresentDivision)
        .map((d) => ({ label: d.name, value: d.id }));
      setPresentFilteredDistricts(filtered);
      form.setValue("presentDistrict", "", { shouldValidate: true });
      form.setValue("presentThana", "", { shouldValidate: true });
      setPresentFilteredThanas([]);
    } else {
      setPresentFilteredDistricts([]);
      setPresentFilteredThanas([]);
      form.setValue("presentDistrict", "", { shouldValidate: true });
      form.setValue("presentThana", "", { shouldValidate: true });
    }
  }, [watchPresentDivision, form]);

  useEffect(() => {
    if (watchPresentDistrict) {
      const filtered = allThanas
        .filter((thana) => thana.district_id === watchPresentDistrict)
        .map((t) => ({ label: t.name, value: t.id }));
      setPresentFilteredThanas(filtered);
      form.setValue("presentThana", "", { shouldValidate: true });
    } else {
      setPresentFilteredThanas([]);
      form.setValue("presentThana", "", { shouldValidate: true });
    }
  }, [watchPresentDistrict, form]);

  useEffect(() => {
    if (!isPermanentSameAsPresent && watchPermanentDivision) {
      const filtered = allDistricts
        .filter((district) => district.division_id === watchPermanentDivision)
        .map((d) => ({ label: d.name, value: d.id }));
      setPermanentFilteredDistricts(filtered);
      form.setValue("permanentDistrict", "", { shouldValidate: true });
      form.setValue("permanentThana", "", { shouldValidate: true });
      setPermanentFilteredThanas([]);
    } else if (!isPermanentSameAsPresent) {
      setPermanentFilteredDistricts([]);
      setPermanentFilteredThanas([]);
      form.setValue("permanentDistrict", "", { shouldValidate: true });
      form.setValue("permanentThana", "", { shouldValidate: true });
    }
  }, [watchPermanentDivision, isPermanentSameAsPresent, form]);

  useEffect(() => {
    if (!isPermanentSameAsPresent && watchPermanentDistrict) {
      const filtered = allThanas
        .filter((thana) => thana.district_id === watchPermanentDistrict)
        .map((t) => ({ label: t.name, value: t.id }));
      setPermanentFilteredThanas(filtered);
      form.setValue("permanentThana", "", { shouldValidate: true });
    } else if (!isPermanentSameAsPresent) {
      setPermanentFilteredThanas([]);
      form.setValue("permanentThana", "", { shouldValidate: true });
    }
  }, [watchPermanentDistrict, isPermanentSameAsPresent, form]);

  useEffect(() => {
    setIsPermanentSameAsPresent(watchIsPermanentSameAsPresent);
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

      if (presentValues.presentDivision) {
        const filteredD = allDistricts
          .filter((d) => d.division_id === presentValues.presentDivision)
          .map((d) => ({ label: d.name, value: d.id }));
        setPermanentFilteredDistricts(filteredD);
      } else {
        setPermanentFilteredDistricts([]);
      }
      if (presentValues.presentDistrict) {
        const filteredT = allThanas
          .filter((t) => t.district_id === presentValues.presentDistrict)
          .map((t) => ({ label: t.name, value: t.id }));
        setPermanentFilteredThanas(filteredT);
      } else {
        setPermanentFilteredThanas([]);
      }
    } else {
      form.setValue("permanentAddress", "");
      form.setValue("permanentDivision", "");
      form.setValue("permanentDistrict", "");
      form.setValue("permanentThana", "");
      form.setValue("permanentPostalCode", "");
      form.setValue("permanentLengthOfStay", "");
      form.setValue("permanentOwnershipStatus", "");
      setPermanentFilteredDistricts([]);
      setPermanentFilteredThanas([]);
    }
  }, [watchIsPermanentSameAsPresent, form]);

  useEffect(() => {
    if (formData.residentialInfo) {
      const { propertyType, propertyValue, ...restData } =
        formData.residentialInfo as any;
      form.reset(restData);
      setIsPermanentSameAsPresent(restData.isPermanentSameAsPresent || false);

      if (restData.presentDivision) {
        const filteredD = allDistricts
          .filter((d) => d.division_id === restData.presentDivision)
          .map((d) => ({ label: d.name, value: d.id }));
        setPresentFilteredDistricts(filteredD);
        if (restData.presentDistrict) {
          const filteredT = allThanas
            .filter((t) => t.district_id === restData.presentDistrict)
            .map((t) => ({ label: t.name, value: t.id }));
          setPresentFilteredThanas(filteredT);
        }
      }

      if (restData.isPermanentSameAsPresent) {
        if (restData.presentDivision) {
          const filteredD = allDistricts
            .filter((d) => d.division_id === restData.presentDivision)
            .map((d) => ({ label: d.name, value: d.id }));
          setPermanentFilteredDistricts(filteredD);
        }
        if (restData.presentDistrict) {
          const filteredT = allThanas
            .filter((t) => t.district_id === restData.presentDistrict)
            .map((t) => ({ label: t.name, value: t.id }));
          setPermanentFilteredThanas(filteredT);
        }
      } else {
        if (restData.permanentDivision) {
          const filteredD = allDistricts
            .filter((d) => d.division_id === restData.permanentDivision)
            .map((d) => ({ label: d.name, value: d.id }));
          setPermanentFilteredDistricts(filteredD);
          if (restData.permanentDistrict) {
            const filteredT = allThanas
              .filter((t) => t.district_id === restData.permanentDistrict)
              .map((t) => ({ label: t.name, value: t.id }));
            setPermanentFilteredThanas(filteredT);
          }
        }
      }
    }
  }, [formData.residentialInfo, form]);

  useEffect(() => {
    if (!isStepEditable("residentialInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  function onSubmit(data: ResidentialInfoValues) {
    updateFormData("residentialInfo", data);
    router.push("/user/loan-application/step-3");
  }

  return (
    <Card className="border-[#E9EFF6] text-tertiary-primary">
      <CardHeader>
        <CardTitle className="text-xl">Residential Information</CardTitle>
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
                    placeholder="e.g., House 123, Road 4, Block B"
                    required
                  />
                </div>
                <SelectInput
                  form={form}
                  name="presentDivision"
                  label="Division"
                  options={divisionOptions}
                  placeholder="Select Division"
                  required
                />
                {/* Replaced SelectInput with ComboBoxInput for Present District */}
                <ComboBoxInput
                  form={form}
                  name="presentDistrict"
                  label="District"
                  options={presentFilteredDistricts}
                  placeholder="Select District"
                  searchPlaceholder="Search districts..."
                  notFoundText="No district found."
                  required
                  disabled={
                    !watchPresentDivision ||
                    presentFilteredDistricts.length === 0
                  }
                />
                {/* Replaced SelectInput with ComboBoxInput for Present Thana */}
                <ComboBoxInput
                  form={form}
                  name="presentThana"
                  label="Thana"
                  options={presentFilteredThanas}
                  placeholder="Select Thana"
                  searchPlaceholder="Search thanas..."
                  notFoundText="No thana found."
                  required
                  disabled={
                    !watchPresentDistrict || presentFilteredThanas.length === 0
                  }
                />
                <TextInput
                  form={form}
                  name="presentPostalCode"
                  label="Postal Code"
                  placeholder="e.g., 1200"
                  required
                />
                <TextInput
                  form={form}
                  name="presentLengthOfStay"
                  label="Length of Stay (Present)"
                  placeholder="e.g., 5 years 2 months"
                  required
                />
                <SelectInput
                  form={form}
                  name="presentOwnershipStatus"
                  label="Ownership Status (Present)"
                  options={ownershipStatusOptions}
                  placeholder="Select Ownership Status"
                  required
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Permanent Address</h3>
              <CheckboxInput
                form={form}
                name="isPermanentSameAsPresent"
                label="Permanent address is the same as Present Address"
              />
              {!isPermanentSameAsPresent && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <TextInput
                        form={form}
                        name="permanentAddress"
                        label="Address"
                        placeholder="e.g., House 123, Road 4, Block B"
                        required
                      />
                    </div>
                    <SelectInput
                      form={form}
                      name="permanentDivision"
                      label="Division"
                      options={divisionOptions}
                      placeholder="Select Division"
                      required
                    />
                    {/* Replaced SelectInput with ComboBoxInput for Permanent District */}
                    <ComboBoxInput
                      form={form}
                      name="permanentDistrict"
                      label="District"
                      options={permanentFilteredDistricts}
                      placeholder="Select District"
                      searchPlaceholder="Search districts..."
                      notFoundText="No district found."
                      required
                      disabled={
                        !watchPermanentDivision ||
                        permanentFilteredDistricts.length === 0
                      }
                    />
                    {/* Replaced SelectInput with ComboBoxInput for Permanent Thana */}
                    <ComboBoxInput
                      form={form}
                      name="permanentThana"
                      label="Thana"
                      options={permanentFilteredThanas}
                      placeholder="Select Thana"
                      searchPlaceholder="Search thanas..."
                      notFoundText="No thana found."
                      required
                      disabled={
                        !watchPermanentDistrict ||
                        permanentFilteredThanas.length === 0
                      }
                    />
                    <TextInput
                      form={form}
                      name="permanentPostalCode"
                      label="Postal Code"
                      placeholder="e.g., 1200"
                      required
                    />
                    <TextInput
                      form={form}
                      name="permanentLengthOfStay"
                      label="Length of Stay (Permanent)"
                      placeholder="e.g., 10 years"
                      required
                    />
                    <SelectInput
                      form={form}
                      name="permanentOwnershipStatus"
                      label="Ownership Status (Permanent)"
                      options={ownershipStatusOptions}
                      placeholder="Select Ownership Status"
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
                onClick={() => router.push("/user/loan-application/step-1")}
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
