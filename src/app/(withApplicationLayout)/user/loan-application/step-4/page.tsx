"use client";

import type {
  CreditCardValues,
  ExistingLoanValues,
} from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-info-schema";
import {
  loanInfoSchema,
  type LoanInfoValues,
} from "@/app/(withApplicationLayout)/user/loan-application/schemas/loan-info-schema";
import { CheckboxInput } from "@/components/loan-application/checkbox-input";
import {
  SelectInput,
  TextInput,
} from "@/components/loan-application/form-inputs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "@/context/loan-application-form-context";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function DocumentsPage() {
  const router = useRouter();
  const { formData, updateFormData, isFormSubmitted, isStepEditable } =
    useFormContext();
  const [hasExistingLoan, setHasExistingLoan] = useState(false);
  const [hasCreditCard, setHasCreditCard] = useState(false);
  const [existingLoans, setExistingLoans] = useState<ExistingLoanValues[]>([
    {
      loanType: "",
      otherLoanType: "",
      lenderName: "",
      disbursedAmount: "",
      outstanding: "",
      emi: "",
      adjustmentPlan: "",
    },
  ]);
  const [creditCards, setCreditCards] = useState<CreditCardValues[]>([
    {
      issuerName: "",
      cardLimit: "",
      toBeClosedBeforeDisbursement: false,
    },
  ]);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with react-hook-form
  const form = useForm<LoanInfoValues>({
    resolver: zodResolver(loanInfoSchema) as any,
    defaultValues: {
      hasExistingLoan: false,
      existingLoans: [],
      hasCreditCard: false,
      creditCards: [],
      bankName: "",
      accountNumber: "",
    },
  });

  // Watch for toggle changes
  const watchHasExistingLoan = form.watch("hasExistingLoan");
  const watchHasCreditCard = form.watch("hasCreditCard");

  // Update state when watched values change
  useEffect(() => {
    setHasExistingLoan(watchHasExistingLoan);
    if (!watchHasExistingLoan) {
      form.setValue("existingLoans", []);
    } else if (form.getValues("existingLoans")?.length === 0) {
      form.setValue("existingLoans", [...existingLoans]);
    }
  }, [watchHasExistingLoan, form, existingLoans]);

  useEffect(() => {
    setHasCreditCard(watchHasCreditCard);
    if (!watchHasCreditCard) {
      form.setValue("creditCards", []);
    } else if (form.getValues("creditCards")?.length === 0) {
      form.setValue("creditCards", [...creditCards]);
    }
  }, [watchHasCreditCard, form, creditCards]);

  // Load saved data if available
  useEffect(() => {
    if (formData.loanInfo) {
      form.reset(formData.loanInfo);
      setHasExistingLoan(formData.loanInfo.hasExistingLoan);
      setHasCreditCard(formData.loanInfo.hasCreditCard);

      if (
        formData.loanInfo.existingLoans &&
        formData.loanInfo.existingLoans.length > 0
      ) {
        setExistingLoans(formData.loanInfo.existingLoans);
      }

      if (
        formData.loanInfo.creditCards &&
        formData.loanInfo.creditCards.length > 0
      ) {
        setCreditCards(formData.loanInfo.creditCards);
      }
    }
  }, [formData.loanInfo, form]);

  // Redirect if step is not editable
  useEffect(() => {
    if (!isStepEditable("loanInfo")) {
      router.push("/user/loan-application/preview");
    }
  }, [isStepEditable, router]);

  // Handle form submission
  function onSubmit(data: LoanInfoValues) {
    try {
      updateFormData("loanInfo", data);
      router.push("/user/loan-application/step-5");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while saving your data. Please try again.");
    }
  }

  // Add a new existing loan
  const addExistingLoan = () => {
    if (existingLoans.length < 3) {
      const newLoan: ExistingLoanValues = {
        loanType: "",
        otherLoanType: "",
        lenderName: "",
        disbursedAmount: "",
        outstanding: "",
        emi: "",
        adjustmentPlan: "",
      };
      const updatedLoans = [...existingLoans, newLoan];
      setExistingLoans(updatedLoans);
      form.setValue("existingLoans", updatedLoans);
    } else {
      setError("You can add a maximum of 3 existing loans.");
    }
  };

  // Remove an existing loan
  const removeExistingLoan = (index: number) => {
    if (existingLoans.length > 1) {
      const updatedLoans = [...existingLoans];
      updatedLoans.splice(index, 1);
      setExistingLoans(updatedLoans);
      form.setValue("existingLoans", updatedLoans);
    }
  };

  // Add a new credit card
  const addCreditCard = () => {
    if (creditCards.length < 5) {
      const newCard: CreditCardValues = {
        issuerName: "",
        cardLimit: "",
        toBeClosedBeforeDisbursement: false,
      };
      const updatedCards = [...creditCards, newCard];
      setCreditCards(updatedCards);
      form.setValue("creditCards", updatedCards);
    } else {
      setError("You can add a maximum of 5 credit cards.");
    }
  };

  // Remove a credit card
  const removeCreditCard = (index: number) => {
    if (creditCards.length > 1) {
      const updatedCards = [...creditCards];
      updatedCards.splice(index, 1);
      setCreditCards(updatedCards);
      form.setValue("creditCards", updatedCards);
    }
  };

  // Loan type options
  const loanTypes = [
    { label: "Personal Loan", value: "PERSONAL_LOAN" },
    { label: "Home Loan", value: "HOME_LOAN" },
    { label: "Car Loan", value: "CAR_LOAN" },
    { label: "SME Loan", value: "SME_LOAN" },
    { label: "Other Loan", value: "OTHER_LOAN" },
  ];

  // Bank list options
  const bankLists = [
    { label: "Bank One", value: "bank_one" },
    { label: "Bank Two", value: "bank_two" },
    { label: "Bank Three", value: "bank_three" },
    { label: "Bank Four", value: "bank_four" },
    { label: "Bank Five", value: "bank_five" },
    { label: "Bank Six", value: "bank_six" },
    { label: "Bank Seven", value: "bank_seven" },
    { label: "Bank Eight", value: "bank_eight" },
    { label: "Bank Nine", value: "bank_nine" },
    { label: "Bank Ten", value: "bank_ten" },
  ];

  // Adjustment plan options
  const adjustmentPlans = [
    { label: "Take Over", value: "take_over" },
    { label: "Own Source", value: "own_source" },
    { label: "Costing", value: "costing" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Existing Financial Obligations</CardTitle>
        <CardDescription>
          Provide details about your loan requirements and existing financial
          obligations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Existing Loan Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Existing Loan Information
                </h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasExistingLoan"
                    checked={hasExistingLoan}
                    onCheckedChange={(checked) => {
                      form.setValue("hasExistingLoan", checked);
                      setError(null);
                    }}
                  />
                  <Label htmlFor="hasExistingLoan">I have existing loans</Label>
                </div>
              </div>

              {hasExistingLoan && (
                <div className="space-y-6">
                  {existingLoans.map((loan, index) => (
                    <div
                      key={index}
                      className="space-y-4 rounded-md border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Loan {index + 1}</h4>
                        {existingLoans.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExistingLoan(index)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <SelectInput
                          form={form}
                          name={`existingLoans.${index}.loanType`}
                          label="Loan Type"
                          options={loanTypes}
                          required
                        />

                        {form.watch(`existingLoans.${index}.loanType`) ===
                          "OTHER_LOAN" && (
                          <TextInput
                            form={form}
                            name={`existingLoans.${index}.otherLoanType`}
                            label="Please Specify Loan Type"
                            placeholder="Enter loan type"
                            required
                          />
                        )}

                        <SelectInput
                          form={form}
                          name={`existingLoans.${index}.lenderName`}
                          label="Lender's Name"
                          options={bankLists}
                          required
                        />

                        <TextInput
                          form={form}
                          name={`existingLoans.${index}.disbursedAmount`}
                          label="Disbursed Amount"
                          placeholder="Enter amount"
                          required
                        />

                        <TextInput
                          form={form}
                          name={`existingLoans.${index}.outstanding`}
                          label="Outstanding"
                          placeholder="Enter outstanding amount"
                          required
                        />

                        <TextInput
                          form={form}
                          name={`existingLoans.${index}.emi`}
                          label="EMI"
                          placeholder="Enter EMI amount"
                          required
                        />

                        <SelectInput
                          form={form}
                          name={`existingLoans.${index}.adjustmentPlan`}
                          label="Adjustment Plan"
                          options={adjustmentPlans}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  {existingLoans.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addExistingLoan}
                      className="mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Another Loan
                    </Button>
                  )}
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Credit Card Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Credit Card Information</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasCreditCard"
                    checked={hasCreditCard}
                    onCheckedChange={(checked) => {
                      form.setValue("hasCreditCard", checked);
                      setError(null);
                    }}
                  />
                  <Label htmlFor="hasCreditCard">I have credit cards</Label>
                </div>
              </div>

              {hasCreditCard && (
                <div className="space-y-6">
                  {creditCards.map((card, index) => (
                    <div
                      key={index}
                      className="space-y-4 rounded-md border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Card {index + 1}</h4>
                        {creditCards.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCreditCard(index)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <SelectInput
                          form={form}
                          name={`creditCards.${index}.issuerName`}
                          label="Issuer Name"
                          options={bankLists}
                          required
                        />

                        <TextInput
                          form={form}
                          name={`creditCards.${index}.cardLimit`}
                          label="Card Limit"
                          placeholder="Enter card limit"
                          required
                        />

                        <div className="md:col-span-2">
                          <CheckboxInput
                            form={form}
                            name={`creditCards.${index}.toBeClosedBeforeDisbursement`}
                            label="Card To Be Closed Before Loan Disbursement"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {creditCards.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addCreditCard}
                      className="mt-2"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Another Card
                    </Button>
                  )}
                </div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Bank Account Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bank Account Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Bank Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "h-10 w-full justify-between border-[#D0D5DD] bg-white max-sm:h-11",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? bankLists.find(
                                    (bank) => bank.value === field.value,
                                  )?.label
                                : "Select bank"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search bank..." />
                            <CommandList>
                              <CommandEmpty>No bank found.</CommandEmpty>
                              <CommandGroup>
                                {bankLists.map((bank) => (
                                  <CommandItem
                                    key={bank.value}
                                    value={bank.value}
                                    onSelect={() => {
                                      form.setValue("bankName", bank.value, {
                                        shouldValidate: true,
                                      });
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === bank.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {bank.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TextInput
                  form={form}
                  name="accountNumber"
                  label="Account Number"
                  placeholder="Enter account number"
                  type="number"
                  required
                  onChange={(e) => {
                    // Allow only numeric input
                    const value = e.target.value.replace(/\D/g, "");
                    form.setValue("accountNumber", value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/loan-application/step-3")}
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
