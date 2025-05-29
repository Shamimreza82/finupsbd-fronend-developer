"use client";

import { submitApplication } from "@/actions/loan-application-form-actions";
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
import { Separator } from "@/components/ui/separator";
import { useFormContext } from "@/context/loan-application-form-context";
import {
  AlertCircle,
  FileText,
  ImageIcon,
  Loader2,
  PenSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PreviewPage() {
  const router = useRouter();
  const {
    formData,
    setIsFormSubmitted,
    setSubmittedData,
    setAllStepsToNonDraft,
  } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update the isFormComplete check to include loanRequest
  const isFormComplete =
    formData.personalInfo &&
    formData.residentialInfo &&
    formData.employmentInfo &&
    formData.loanInfo &&
    formData.loanRequest &&
    formData.documentInfo;

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormComplete) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Set all steps to non-draft mode before submission
      setAllStepsToNonDraft();

      const result = await submitApplication(formData);
      if (result.success) {
        setIsFormSubmitted(true);
        setSubmittedData(formData);
        // Pass the application ID to the success page
        router.push(`/loan-application/success?id=${result.applicationId}`);
      } else {
        console.error("Error submitting application:", result.error);
        setError(
          result.error ||
            "Failed to submit application. Please try again later.",
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to edit a specific step
  const navigateToStep = (step: string) => {
    router.push(`/loan-application/${step}`);
  };

  // Render personal info section
  const renderPersonalInfo = () => {
    const info = formData.personalInfo;
    if (!info) return <p>Personal information not completed.</p>;

    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm">{info.fullName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Father's/Husband's Name</p>
            <p className="text-sm">{info.fatherOrHusbandName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Mother's Name</p>
            <p className="text-sm">{info.motherName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Gender</p>
            <p className="text-sm capitalize">{info.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Date of Birth</p>
            <p className="text-sm">
              {info.dateOfBirth instanceof Date
                ? info.dateOfBirth.toLocaleDateString()
                : info.dateOfBirth}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Place of Birth</p>
            <p className="text-sm">{info.placeOfBirth}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Nationality</p>
            <p className="text-sm">{info.nationality}</p>
          </div>
          {/* 
          <div>
            <p className="text-sm font-medium">Educational Level</p>
            <p className="text-sm capitalize">{info.educationalLevel}</p>
          </div>
          */}
          <div>
            <p className="text-sm font-medium">Identification Type</p>
            <p className="text-sm capitalize">{info.identificationType}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Identification Number</p>
            <p className="text-sm">{info.identificationNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Marital Status</p>
            <p className="text-sm capitalize">{info.maritalStatus}</p>
          </div>
          {info.maritalStatus === "MARRIED" && (
            <div>
              <p className="text-sm font-medium">Spouse's Name</p>
              <p className="text-sm">{info.spouseName}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">Residential Status</p>
            <p className="text-sm capitalize">{info.residentialStatus}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Religion</p>
            <p className="text-sm capitalize">{info.religion}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Mobile Number</p>
            <p className="text-sm">{info.mobileNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Alternate Mobile Number</p>
            <p className="text-sm">{info.alternateMobileNumber || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm">{info.emailAddress}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Social Media</p>
            {info.socialMediaProfiles && info.socialMediaProfiles.length > 0 ? (
              <div className="space-y-1">
                {info.socialMediaProfiles.map((link, index) => (
                  <p key={index} className="break-all text-sm">
                    {link || "N/A"}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm">N/A</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render residential info section
  const renderResidentialInfo = () => {
    const info = formData.residentialInfo;
    if (!info) return <p>Residential information not completed.</p>;

    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-md mb-2 font-medium">Present Address</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm">{info.presentAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Division</p>
              <p className="text-sm capitalize">{info.presentDivision}</p>
            </div>
            <div>
              <p className="text-sm font-medium">District</p>
              <p className="text-sm capitalize">{info.presentDistrict}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Thana</p>
              <p className="text-sm capitalize">{info.presentThana}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Postal Code</p>
              <p className="text-sm">{info.presentPostalCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Length of Stay</p>
              <p className="text-sm">{info.presentLengthOfStay}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Ownership Status</p>
              <p className="text-sm capitalize">
                {info.presentOwnershipStatus}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {info.isPermanentSameAsPresent ? (
          <div>
            <h4 className="text-md mb-2 font-medium">Permanent Address</h4>
            <p className="text-sm">Same as present address</p>
          </div>
        ) : (
          <div>
            <h4 className="text-md mb-2 font-medium">Permanent Address</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm">{info.permanentAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Division</p>
                <p className="text-sm capitalize">{info.permanentDivision}</p>
              </div>
              <div>
                <p className="text-sm font-medium">District</p>
                <p className="text-sm capitalize">{info.permanentDistrict}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Thana</p>
                <p className="text-sm capitalize">{info.permanentThana}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Postal Code</p>
                <p className="text-sm">{info.permanentPostalCode}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Length of Stay</p>
                <p className="text-sm">{info.permanentLengthOfStay}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ownership Status</p>
                <p className="text-sm capitalize">
                  {info.permanentOwnershipStatus}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render employment info section
  const renderEmploymentInfo = () => {
    const info = formData.employmentInfo;
    if (!info) return <p>Employment information not completed.</p>;

    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-md mb-2 font-medium">Employment Details</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Employment Status</p>
              <p className="text-sm capitalize">
                {info.employmentStatus.replace("_", " ").toLowerCase()}
              </p>
            </div>

            {info.employmentStatus === "SALARIED" && (
              <>
                <div>
                  <p className="text-sm font-medium">Job Title</p>
                  <p className="text-sm">{info.jobTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Designation</p>
                  <p className="text-sm">{info.designation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm">{info.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Employee ID</p>
                  <p className="text-sm">{info.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Employment Type</p>
                  <p className="text-sm capitalize">
                    {info.employmentType.replace("_", " ").toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date of Joining</p>
                  <p className="text-sm">
                    {info.dateOfJoining instanceof Date
                      ? info.dateOfJoining.toLocaleDateString()
                      : info.dateOfJoining}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Organization Name</p>
                  <p className="text-sm">{info.organizationName}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Organization Address</p>
                  <p className="text-sm">{info.organizationAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Length of Service</p>
                  <p className="text-sm">
                    {info.serviceYears} years, {info.serviceMonths} months
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">E-TIN</p>
                  <p className="text-sm">{info.eTin}</p>
                </div>
                {info.officialContact && (
                  <div>
                    <p className="text-sm font-medium">Official Contact</p>
                    <p className="text-sm">{info.officialContact}</p>
                  </div>
                )}

                {info.hasPreviousOrganization && (
                  <>
                    <div className="col-span-2 mt-2">
                      <h5 className="text-sm font-medium">
                        Previous Organization
                      </h5>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Organization Name</p>
                      <p className="text-sm">{info.previousOrganizationName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Designation</p>
                      <p className="text-sm">{info.previousDesignation}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Length of Service</p>
                      <p className="text-sm">
                        {info.previousServiceYears} years,{" "}
                        {info.previousServiceMonths} months
                      </p>
                    </div>
                  </>
                )}

                <div className="col-span-2 mt-2">
                  <h5 className="text-sm font-medium">Total Experience</h5>
                  <p className="text-sm">
                    {info.totalExperienceYears} years,{" "}
                    {info.totalExperienceMonths} months
                  </p>
                </div>
              </>
            )}

            {info.employmentStatus === "BUSINESS_OWNER" && (
              <>
                <div>
                  <p className="text-sm font-medium">Business Name</p>
                  <p className="text-sm">{info.businessName}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Business Address</p>
                  <p className="text-sm">{info.businessAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Business Owner Type</p>
                  <p className="text-sm capitalize">
                    {info.businessOwnerType.replace("_", " ").toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Business Type</p>
                  <p className="text-sm capitalize">
                    {info.businessType.replace("_", " ").toLowerCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Share Portion</p>
                  <p className="text-sm">{info.sharePortion}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Business Registration Number
                  </p>
                  <p className="text-sm">{info.businessRegistrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Trade License Age</p>
                  <p className="text-sm">
                    {info.tradeLicenseAge}{" "}
                    {Number.parseInt(info.tradeLicenseAge) === 1
                      ? "year"
                      : "years"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-md mb-2 font-medium">Property Details</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Property Type</p>
              <p className="text-sm capitalize">{info.propertyType}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Approximate Value (BDT)</p>
              <p className="text-sm">{info.propertyValue}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-md mb-2 font-medium">Income Details</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Gross Monthly Income</p>
              <p className="text-sm">{info.grossMonthlyIncome}</p>
            </div>
            {info.rentIncome && (
              <div>
                <p className="text-sm font-medium">Rent Income</p>
                <p className="text-sm">{info.rentIncome}</p>
              </div>
            )}
            {info.otherIncome && (
              <div>
                <p className="text-sm font-medium">Other Income</p>
                <p className="text-sm">{info.otherIncome}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Total Income</p>
              <p className="text-sm">{info.totalIncome}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render loan info section
  const renderLoanInfo = () => {
    const info = formData.loanInfo;
    if (!info) return <p>Loan information not completed.</p>;

    return (
      <div className="space-y-4">
        {/* Existing Loans */}
        <div>
          <h4 className="text-md mb-2 font-medium">Existing Loans</h4>
          {info.hasExistingLoan ? (
            <div className="space-y-4">
              {info.existingLoans?.map((loan, index) => (
                <div key={index} className="rounded-md border p-3">
                  <h5 className="mb-2 text-sm font-medium">Loan {index + 1}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium">Loan Type</p>
                      <p className="text-sm capitalize">
                        {loan.loanType === "OTHER_LOAN"
                          ? loan.otherLoanType
                          : loan.loanType.replace(/_/g, " ").toLowerCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lender's Name</p>
                      <p className="text-sm">{loan.lenderName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Disbursed Amount</p>
                      <p className="text-sm">{loan.disbursedAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Outstanding</p>
                      <p className="text-sm">{loan.outstanding}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">EMI</p>
                      <p className="text-sm">{loan.emi}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Adjustment Plan</p>
                      <p className="text-sm capitalize">
                        {loan.adjustmentPlan.replace(/_/g, " ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">No existing loans</p>
          )}
        </div>

        <Separator />

        {/* Credit Cards */}
        <div>
          <h4 className="text-md mb-2 font-medium">Credit Cards</h4>
          {info.hasCreditCard ? (
            <div className="space-y-4">
              {info.creditCards?.map((card, index) => (
                <div key={index} className="rounded-md border p-3">
                  <h5 className="mb-2 text-sm font-medium">Card {index + 1}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium">Issuer Name</p>
                      <p className="text-sm">{card.issuerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Card Limit</p>
                      <p className="text-sm">{card.cardLimit}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium">
                        To Be Closed Before Disbursement
                      </p>
                      <p className="text-sm">
                        {card.toBeClosedBeforeDisbursement ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm">No credit cards</p>
          )}
        </div>

        <Separator />

        {/* Bank Account Details */}
        <div>
          <h4 className="text-md mb-2 font-medium">Bank Account Details</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Bank Name</p>
              <p className="text-sm">{info.bankName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Account Number</p>
              <p className="text-sm">{info.accountNumber}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add a function to render loan request information
  const renderLoanRequest = () => {
    const info = formData.loanRequest;
    if (!info) return <p>Loan request information not completed.</p>;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm font-medium">Loan Amount Requested (BDT)</p>
            <p className="text-sm">{info.loanAmount}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Preferred Loan Tenure</p>
            <p className="text-sm">{info.loanTenure} Months</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium">Purpose of Loan</p>
            <p className="text-sm">{info.loanPurpose}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Proposed EMI Start Date</p>
            <p className="text-sm">{info.emiStartDate}th of the month</p>
          </div>
        </div>
      </div>
    );
  };

  // Render document info section
  const renderDocumentInfo = () => {
    const info = formData.documentInfo;
    if (!info) return <p>Document information not completed.</p>;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Profile Image</p>
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-md border p-2">
              {info.profileImage.type.startsWith("image/") ? (
                <img
                  src={info.profileImage.dataUrl || "/placeholder.svg"}
                  alt="Profile"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="mb-1 h-8 w-8" />
                  <p className="text-xs">{info.profileImage.name}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Passport/ID</p>
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-md border p-2">
              {info.passport.type === "application/pdf" ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileText className="mb-1 h-8 w-8" />
                  <p className="text-xs">{info.passport.name}</p>
                </div>
              ) : (
                <img
                  src={info.passport.dataUrl || "/placeholder.svg"}
                  alt="Passport"
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Certificate</p>
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-md border p-2">
              {info.certificate.type === "application/pdf" ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileText className="mb-1 h-8 w-8" />
                  <p className="text-xs">{info.certificate.name}</p>
                </div>
              ) : (
                <img
                  src={info.certificate.dataUrl || "/placeholder.svg"}
                  alt="Certificate"
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Application Preview</CardTitle>
          <CardDescription>
            Review your application details before submission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToStep("step-1")}
                >
                  <PenSquare className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
              {renderPersonalInfo()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Residential Information</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToStep("step-2")}
                >
                  <PenSquare className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
              {renderResidentialInfo()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Employment & Financial Information
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToStep("step-3")}
                >
                  <PenSquare className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
              {renderEmploymentInfo()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Loan Information</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToStep("step-4")}
                >
                  <PenSquare className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
              {renderLoanInfo()}
            </div>

            {/* Add the loan request section to the render */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Loan Request & Specifications
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToStep("step-5")}
                >
                  <PenSquare className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
              {renderLoanRequest()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Documents</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToStep("step-6")}
                >
                  <PenSquare className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
              {renderDocumentInfo()}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/loan-application/step-6")}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
