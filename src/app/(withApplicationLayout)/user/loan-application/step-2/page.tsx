"use client";

import { CheckboxInput } from "@/components/loan-application/checkbox-input";
import {
  ComboBoxInput,
  SelectInput,
  TextInput,
  type SelectOption,
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
import { useFormContext as useAppFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  residentialInfoSchema,
  type ResidentialInfoValues,
} from "../schemas/residential-info-schema";

import { districts as allDistricts } from "@/_data/districts";
import { divisions as allDivisions } from "@/_data/divisions";
import { thanas as allThanas } from "@/_data/thanas";

export default function ResidentialInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, isStepEditable } = useAppFormContext();
  const [isPermanentSameAsPresent, setIsPermanentSameAsPresent] = useState(
    formData.residentialInfo?.isPermanentSameAsPresent || false,
  );

  const isInitializing = useRef(true); // Flag to manage initial load and cascading effects

  const form = useForm<ResidentialInfoValues>({
    resolver: zodResolver(residentialInfoSchema),
    mode: "onTouched",
    defaultValues: formData.residentialInfo || {
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

  // Effect to initialize and update form when formData.residentialInfo changes
  useEffect(() => {
    isInitializing.current = true;
    if (formData.residentialInfo) {
      form.reset(formData.residentialInfo);
      setIsPermanentSameAsPresent(
        formData.residentialInfo.isPermanentSameAsPresent || false,
      );

      // Populate Present Address filtered options
      if (formData.residentialInfo.presentDivision) {
        const filteredD = allDistricts
          .filter(
            (d) => d.division_id === formData.residentialInfo!.presentDivision,
          )
          .map((d) => ({ label: d.name, value: d.id }));
        setPresentFilteredDistricts(filteredD);
        if (formData.residentialInfo.presentDistrict) {
          const filteredT = allThanas
            .filter(
              (t) =>
                t.district_id === formData.residentialInfo!.presentDistrict,
            )
            .map((t) => ({ label: t.name, value: t.id }));
          setPresentFilteredThanas(filteredT);
        } else {
          setPresentFilteredThanas([]);
        }
      } else {
        setPresentFilteredDistricts([]);
        setPresentFilteredThanas([]);
      }

      // Populate Permanent Address filtered options
      if (formData.residentialInfo.isPermanentSameAsPresent) {
        if (formData.residentialInfo.presentDivision) {
          const filteredD = allDistricts
            .filter(
              (d) =>
                d.division_id === formData.residentialInfo!.presentDivision,
            )
            .map((d) => ({ label: d.name, value: d.id }));
          setPermanentFilteredDistricts(filteredD);
          if (formData.residentialInfo.presentDistrict) {
            const filteredT = allThanas
              .filter(
                (t) =>
                  t.district_id === formData.residentialInfo!.presentDistrict,
              )
              .map((t) => ({ label: t.name, value: t.id }));
            setPermanentFilteredThanas(filteredT);
          } else {
            setPermanentFilteredThanas([]);
          }
        } else {
          setPermanentFilteredDistricts([]);
          setPermanentFilteredThanas([]);
        }
      } else {
        if (formData.residentialInfo.permanentDivision) {
          const filteredD = allDistricts
            .filter(
              (d) =>
                d.division_id === formData.residentialInfo!.permanentDivision,
            )
            .map((d) => ({ label: d.name, value: d.id }));
          setPermanentFilteredDistricts(filteredD);
          if (formData.residentialInfo.permanentDistrict) {
            const filteredT = allThanas
              .filter(
                (t) =>
                  t.district_id === formData.residentialInfo!.permanentDistrict,
              )
              .map((t) => ({ label: t.name, value: t.id }));
            setPermanentFilteredThanas(filteredT);
          } else {
            setPermanentFilteredThanas([]);
          }
        } else {
          setPermanentFilteredDistricts([]);
          setPermanentFilteredThanas([]);
        }
      }
    } else {
      // No saved data, reset to initial default values defined in useForm
      form.reset(form.formState.defaultValues);
      setIsPermanentSameAsPresent(
        form.formState.defaultValues?.isPermanentSameAsPresent || false,
      );
      setPresentFilteredDistricts([]);
      setPresentFilteredThanas([]);
      setPermanentFilteredDistricts([]);
      setPermanentFilteredThanas([]);
    }
    // Use a timeout or rAF to ensure initialization completes before allowing cascading effects
    const timer = setTimeout(() => {
      isInitializing.current = false;
    }, 0);
    return () => clearTimeout(timer);
  }, [formData.residentialInfo, form]); // form is a stable dependency

  // Effect for Present Division change (Cascading)
  useEffect(() => {
    if (isInitializing.current) return;

    if (watchPresentDivision) {
      const filtered = allDistricts
        .filter((district) => district.division_id === watchPresentDivision)
        .map((d) => ({ label: d.name, value: d.id }));
      setPresentFilteredDistricts(filtered);
      // Only reset if the current district is not valid for the new division
      const currentDistrict = form.getValues("presentDistrict");
      if (
        currentDistrict &&
        !filtered.find((d) => d.value === currentDistrict)
      ) {
        form.setValue("presentDistrict", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("presentDistrict");
        form.setValue("presentThana", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("presentThana");
        setPresentFilteredThanas([]);
      } else if (!currentDistrict) {
        // If district was already empty, ensure thana is also cleared
        form.setValue("presentThana", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("presentThana");
        setPresentFilteredThanas([]);
      }
    } else {
      // No division selected
      setPresentFilteredDistricts([]);
      form.setValue("presentDistrict", "", {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
      form.clearErrors("presentDistrict");
      setPresentFilteredThanas([]);
      form.setValue("presentThana", "", {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
      form.clearErrors("presentThana");
    }
  }, [watchPresentDivision, form]);

  // Effect for Present District change (Cascading)
  useEffect(() => {
    if (isInitializing.current) return;

    if (watchPresentDistrict) {
      const filtered = allThanas
        .filter((thana) => thana.district_id === watchPresentDistrict)
        .map((t) => ({ label: t.name, value: t.id }));
      setPresentFilteredThanas(filtered);
      // Only reset if the current thana is not valid for the new district
      const currentThana = form.getValues("presentThana");
      if (currentThana && !filtered.find((t) => t.value === currentThana)) {
        form.setValue("presentThana", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("presentThana");
      }
    } else {
      // No district selected
      setPresentFilteredThanas([]);
      form.setValue("presentThana", "", {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
      form.clearErrors("presentThana");
    }
  }, [watchPresentDistrict, form]);

  // Effect for Permanent Division change (Cascading)
  useEffect(() => {
    if (isInitializing.current || watchIsPermanentSameAsPresent) return;

    if (watchPermanentDivision) {
      const filtered = allDistricts
        .filter((district) => district.division_id === watchPermanentDivision)
        .map((d) => ({ label: d.name, value: d.id }));
      setPermanentFilteredDistricts(filtered);
      const currentDistrict = form.getValues("permanentDistrict");
      if (
        currentDistrict &&
        !filtered.find((d) => d.value === currentDistrict)
      ) {
        form.setValue("permanentDistrict", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("permanentDistrict");
        form.setValue("permanentThana", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("permanentThana");
        setPermanentFilteredThanas([]);
      } else if (!currentDistrict) {
        form.setValue("permanentThana", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("permanentThana");
        setPermanentFilteredThanas([]);
      }
    } else {
      setPermanentFilteredDistricts([]);
      form.setValue("permanentDistrict", "", {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
      form.clearErrors("permanentDistrict");
      setPermanentFilteredThanas([]);
      form.setValue("permanentThana", "", {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
      form.clearErrors("permanentThana");
    }
  }, [watchPermanentDivision, form, watchIsPermanentSameAsPresent]);

  // Effect for Permanent District change (Cascading)
  useEffect(() => {
    if (isInitializing.current || watchIsPermanentSameAsPresent) return;

    if (watchPermanentDistrict) {
      const filtered = allThanas
        .filter((thana) => thana.district_id === watchPermanentDistrict)
        .map((t) => ({ label: t.name, value: t.id }));
      setPermanentFilteredThanas(filtered);
      const currentThana = form.getValues("permanentThana");
      if (currentThana && !filtered.find((t) => t.value === currentThana)) {
        form.setValue("permanentThana", "", {
          shouldValidate: false,
          shouldDirty: true,
          shouldTouch: false,
        });
        form.clearErrors("permanentThana");
      }
    } else {
      setPermanentFilteredThanas([]);
      form.setValue("permanentThana", "", {
        shouldValidate: false,
        shouldDirty: true,
        shouldTouch: false,
      });
      form.clearErrors("permanentThana");
    }
  }, [watchPermanentDistrict, form, watchIsPermanentSameAsPresent]);

  // Effect for "isPermanentSameAsPresent" checkbox
  useEffect(() => {
    // This effect should run regardless of isInitializing, as it's a direct data sync
    // However, we need to be careful not to clear loaded permanent data if it's different
    // and the checkbox is initially false.
    const currentFormValues = form.getValues();
    setIsPermanentSameAsPresent(watchIsPermanentSameAsPresent);

    if (watchIsPermanentSameAsPresent) {
      form.setValue("permanentAddress", currentFormValues.presentAddress, {
        shouldDirty: true,
      });
      form.setValue("permanentDivision", currentFormValues.presentDivision, {
        shouldDirty: true,
      });
      form.setValue("permanentDistrict", currentFormValues.presentDistrict, {
        shouldDirty: true,
      });
      form.setValue("permanentThana", currentFormValues.presentThana, {
        shouldDirty: true,
      });
      form.setValue(
        "permanentPostalCode",
        currentFormValues.presentPostalCode,
        { shouldDirty: true },
      );
      form.setValue(
        "permanentLengthOfStay",
        currentFormValues.presentLengthOfStay,
        { shouldDirty: true },
      );
      form.setValue(
        "permanentOwnershipStatus",
        currentFormValues.presentOwnershipStatus,
        { shouldDirty: true },
      );

      if (currentFormValues.presentDivision) {
        const filteredD = allDistricts
          .filter((d) => d.division_id === currentFormValues.presentDivision)
          .map((d) => ({ label: d.name, value: d.id }));
        setPermanentFilteredDistricts(filteredD);
      } else {
        setPermanentFilteredDistricts([]);
      }
      if (currentFormValues.presentDistrict) {
        const filteredT = allThanas
          .filter((t) => t.district_id === currentFormValues.presentDistrict)
          .map((t) => ({ label: t.name, value: t.id }));
        setPermanentFilteredThanas(filteredT);
      } else {
        setPermanentFilteredThanas([]);
      }
      const permanentFieldsToClearErrors: Array<keyof ResidentialInfoValues> = [
        "permanentAddress",
        "permanentDivision",
        "permanentDistrict",
        "permanentThana",
        "permanentPostalCode",
        "permanentLengthOfStay",
        "permanentOwnershipStatus",
      ];
      permanentFieldsToClearErrors.forEach((field) => form.clearErrors(field));
    } else {
      // If unchecking, and it's not the initial load where permanent data might be different
      if (!isInitializing.current) {
        const fieldsToClear: Array<keyof ResidentialInfoValues> = [
          "permanentAddress",
          "permanentDivision",
          "permanentDistrict",
          "permanentThana",
          "permanentPostalCode",
          "permanentLengthOfStay",
          "permanentOwnershipStatus",
        ];
        fieldsToClear.forEach((field) => {
          form.setValue(field, "", {
            shouldDirty: true,
            shouldTouch: false,
            shouldValidate: false,
          });
          form.clearErrors(field);
        });
        setPermanentFilteredDistricts([]);
        setPermanentFilteredThanas([]);
      }
      // If it IS initializing and permanent address is different, the values from form.reset() should persist.
      // The cascading effects for permanentDivision/District will handle their options.
    }
  }, [watchIsPermanentSameAsPresent, form]); // Removed isInitializing from deps here, logic inside handles it

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
    <Card>
      <CardHeader>
        <CardTitle>Residential Information</CardTitle>
        <CardDescription>Update your residential details here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Present Address Section */}
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

            {/* Permanent Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Permanent Address</h3>
              <CheckboxInput
                form={form}
                name="isPermanentSameAsPresent"
                label="Permanent address is the same as Present Address"
              />
              {!watchIsPermanentSameAsPresent && ( // Use watchIsPermanentSameAsPresent for rendering
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
