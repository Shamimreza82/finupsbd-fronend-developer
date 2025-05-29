import { Separator } from "@/components/ui/separator";
import type React from "react";

import { FormProgress } from "@/components/loan-application/form-progress";
import { SidebarNav } from "@/components/loan-application/sidebar-nav";
import { FormProvider } from "@/context/loan-application-form-context";
import {
  Briefcase,
  CreditCard,
  Eye,
  FileText,
  Home,
  Upload,
  User,
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "Personal Information",
    href: "/user/loan-application/step-1",
    icon: <User className="h-4 w-4" />,
    step: "personalInfo" as const,
  },
  {
    title: "Residential Information",
    href: "/user/loan-application/step-2",
    icon: <Home className="h-4 w-4" />,
    step: "residentialInfo" as const,
  },
  {
    title: "Employment & Financial",
    href: "/user/loan-application/step-3",
    icon: <Briefcase className="h-4 w-4" />,
    step: "employmentInfo" as const,
  },
  {
    title: "Existing Financial Obligations",
    href: "/user/loan-application/step-4",
    icon: <CreditCard className="h-4 w-4" />,
    step: "loanInfo" as const,
  },
  {
    title: "Loan Request & Specifications",
    href: "/user/loan-application/step-5",
    icon: <FileText className="h-4 w-4" />,
    step: "loanRequest" as const,
  },
  {
    title: "Documents",
    href: "/user/loan-application/step-6",
    icon: <Upload className="h-4 w-4" />,
    step: "documentInfo" as const,
  },
  {
    title: "Preview & Submit",
    href: "/user/loan-application/preview",
    icon: <Eye className="h-4 w-4" />,
  },
];

interface LoanApplicationLayoutProps {
  children: React.ReactNode;
}

export default function LoanApplicationLayout({
  children,
}: LoanApplicationLayoutProps) {
  return (
    <FormProvider>
      <div className="container text-tertiary-primary">
        <div className="space-y-6 py-10 pb-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Personal Loan Application
            </h2>
            <p className="text-tertiary-primary">
              Please fill out the following details carefully. Required
              documents can be uploaded in the relevant sections. All
              information provided will be kept strictly confidential and used
              solely for the purpose of processing your loan application
            </p>
          </div>

          {/* <div className="my-6">
            <FormProgress />
          </div> */}

          <Separator className="my-6 bg-[#D0D5DD]" />

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="rounded-xl border border-[#E9EFF6] bg-white px-2 py-4 pb-6 shadow-[0_1px_12px_rgba(0,0,0,0.1)] lg:sticky lg:top-24 lg:w-4/12 lg:self-start 2xl:w-3/12">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1">
              <FormProgress />
              {children}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
