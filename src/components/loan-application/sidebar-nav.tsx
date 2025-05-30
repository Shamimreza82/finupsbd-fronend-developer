"use client";

import type React from "react";

import { buttonVariants } from "@/components/ui/button";
import { useFormContext } from "@/context/loan-application-form-context";
import { cn } from "@/lib/utils";
import { AlertCircle, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoChecklist } from "react-icons/go";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
    step?:
      | "personalInfo"
      | "residentialInfo"
      | "employmentInfo"
      | "loanInfo"
      | "loanRequest"
      | "documentInfo"
      | "guarantorInfo";
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const { isStepCompleted, isFormSubmitted, isStepEditable } = useFormContext();

  return (
    <nav
      className={cn(
        "flex justify-evenly gap-2 space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = pathname === item.href;
        const isCompleted = item.step
          ? isStepCompleted(item.step as any)
          : false;
        const isEditable = item.step ? isStepEditable(item.step as any) : true;

        // If step is not editable, render a disabled button
        if (item.step && !isEditable) {
          return (
            <div
              key={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "cursor-not-allowed justify-start gap-2",
                className,
              )}
            >
              {item.icon}
              {item.title}
              <div className="ml-auto">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "border-l-4 bg-green-lighter text-primary hover:bg-green-lighter hover:text-primary"
                : "hover:bg-transparent",
              "justify-start gap-2 text-sm lg:py-5 lg:text-base [&_svg]:size-5",
              className,
            )}
          >
            {item.icon}
            {item.title}
            {item.step && (
              <div className="ml-auto">
                {isCompleted ? (
                  // <CheckCircle className="h-4 w-4 text-primary" />
                  <GoChecklist className="!size-6 h-6 w-6 text-primary" />
                ) : (
                  <AlertCircle className="!size-5 h-6 w-6 text-muted-foreground" />
                )}
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
