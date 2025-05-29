"use client";

import {
  documentInfoSchema,
  type DocumentInfoValues,
} from "@/app/(withApplicationLayout)/user/loan-application/schemas/document-info-schema";
import { FileUpload } from "@/components/loan-application/file-upload";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "@/context/loan-application-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function DocumentsPage() {
  const router = useRouter();
  const { formData, updateFormData, isFormSubmitted, isStepEditable } =
    useFormContext();

  // Initialize form with react-hook-form
  const form = useForm<DocumentInfoValues>({
    resolver: zodResolver(documentInfoSchema),
    defaultValues: {
      profileImage: null as any,
      passport: null as any,
      certificate: null as any,
    },
  });

  // Load saved data if available
  useEffect(() => {
    if (formData.documentInfo) {
      form.reset(formData.documentInfo);
    }
  }, [formData.documentInfo, form]);

  // Check if this step is editable
  const isEditable = isStepEditable("documentInfo");

  // Handle form submission
  function onSubmit(data: DocumentInfoValues) {
    updateFormData("documentInfo", data);

    // If form is already submitted, go back to success page
    if (isFormSubmitted) {
      router.push("/user/loan-application/success");
    } else {
      router.push("/user/loan-application/preview");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Verification</CardTitle>
        <CardDescription>
          {isFormSubmitted
            ? "Update your documents for verification."
            : "Please upload the required documents for verification."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Profile Image <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload a clear photo of yourself
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Passport or ID <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload a copy of your passport or government-issued ID
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certificate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Certificate <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      Upload your educational or professional certificate
                    </FormDescription>
                    <FormControl>
                      <FileUpload
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-sm text-muted-foreground">
              <p>All documents must be:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Clear and legible</li>
                <li>Less than 5MB in size</li>
                <li>In JPG, PNG, WEBP, or PDF format</li>
              </ul>
            </div>

            <CardFooter className="flex justify-between px-0">
              {isFormSubmitted ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/user/loan-application/success")}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/user/loan-application/step-5")}
                >
                  Back
                </Button>
              )}
              <Button type="submit">
                {isFormSubmitted ? "Update Documents" : "Continue to Preview"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
