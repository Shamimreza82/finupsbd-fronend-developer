'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { applicationTracking } from "@/services/public";
import { useState } from "react";
import { toast } from "sonner";
import TrackApplicationStatus from "./TrackApplicationStatus";
import { ApplicationStatusData } from "./TrackingApplicationTypes";
import { motion } from 'framer-motion'

const FormSchema = z.object({
  applicationId: z.string().min(12, "Application ID must be at least 12 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 characters").max(11, "Phone number must be at most 11 characters"),
});

export default function TrackApplicationForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [applicationStatusData, setApplicationStatusData] = useState<ApplicationStatusData | null | undefined>();

  console.log(applicationStatusData)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationId: "325050700002",
      phone: "01910479167",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({data});
    setIsLoading(true);
    const res = await applicationTracking(data);
    setIsLoading(false);
    setApplicationStatus(true);
    if (res.success) {
      console.log(res.data);
      toast.success("Application status fetched successfully!");
      setApplicationStatusData(res.data);
      setApplicationStatus(true);
    }
    else {
      console.log(res.error);
      toast.error(res.error.message || "Please provide a valid application ID and phone number");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1.04 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {applicationStatus && applicationStatusData ? <TrackApplicationStatus applicationStatusData={applicationStatusData} /> : <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Track your Application</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              Enter your tracking number to see your application status
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Tracking Number */}
                <div>
                  <Label htmlFor="applicationId">Application ID</Label>
                  <Input
                    id="applicationId"
                    placeholder="Enter your Application ID"
                    {...form.register("applicationId")}
                  />
                  {form.formState.errors.applicationId && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.applicationId.message}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="01XXXXXXXXXX"
                    {...form.register("phone")}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Loading... " : "Track Application"}
              </Button>

              <div className="text-center text-sm">
                <Link href="/track-application/forgot-application" className="text-blue-600 hover:underline">
                  Forgot Application ID?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>}
      </motion.div>

    </div>
  );
}

