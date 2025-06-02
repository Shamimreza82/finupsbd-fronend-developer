"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"

// Zod schema for form validation
const personalGuarantorSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    fatherHusbandName: z.string().min(1, "Father's/Husband's name is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    nationality: z.string().min(1, "Nationality is required"),
    nationalIdNumber: z.string().min(1, "National ID number is required"),
    mobileNumber: z.string().min(1, "Mobile number is required"),
    emailAddress: z.string().email("Invalid email address").optional().or(z.literal("")),
    relationWithApplicant: z.string().min(1, "Relation with applicant is required"),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentMailingAddress: z.string().min(1, "Permanent & mailing address is required"),
    workAddress: z.string().min(1, "Work address is required"),
    photo: z.any().optional(),
    nidFront: z.any().optional(),
    nidBack: z.any().optional(),
    supportingDocument: z.any().optional(),
})

type PersonalGuarantorFormData = z.infer<typeof personalGuarantorSchema>

const nationalities = ["Bangladeshi", "Indian", "Pakistani", "American", "British", "Canadian", "Australian", "Other"]

const relations = [
    "Father",
    "Mother",
    "Spouse",
    "Brother",
    "Sister",
    "Son",
    "Daughter",
    "Friend",
    "Colleague",
    "Business Partner",
    "Other",
]

export default function PersonalGuarantorForm() {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [nidFrontPreview, setNidFrontPreview] = useState<string | null>(null)
    const [nidBackPreview, setNidBackPreview] = useState<string | null>(null)
    const [supportingDocPreview, setSupportingDocPreview] = useState<string | null>(null)

    const photoInputRef = useRef<HTMLInputElement>(null)
    const cameraInputRef = useRef<HTMLInputElement>(null)
    const nidFrontInputRef = useRef<HTMLInputElement>(null)
    const nidBackInputRef = useRef<HTMLInputElement>(null)
    const supportingDocInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<PersonalGuarantorFormData>({
        resolver: zodResolver(personalGuarantorSchema),
        defaultValues: {
            fullName: "Shamim Reza",
            fatherHusbandName: "Shadsfdsfdsf",
            motherName: "sdfdsfdsfdsf",
            dateOfBirth: "",
            nationality: "",
            nationalIdNumber: "",
            mobileNumber: "+880",
            emailAddress: "",
            relationWithApplicant: "",
            presentAddress: "",
            permanentMailingAddress: "",
            workAddress: "",
        },
    })

    const handleFileUpload = (
        file: File,
        setPreview: (preview: string | null) => void,
        fieldName: keyof PersonalGuarantorFormData,
    ) => {
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setPreview(result)
                form.setValue(fieldName, file)
            }
            reader.readAsDataURL(file)
        }
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file, setPhotoPreview, "photo")
        }
    }

    const handleNidFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file, setNidFrontPreview, "nidFront")
        }
    }

    const handleNidBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file, setNidBackPreview, "nidBack")
        }
    }

    const handleSupportingDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileUpload(file, setSupportingDocPreview, "supportingDocument")
        }
    }

    const removeFile = (setPreview: (preview: string | null) => void, fieldName: keyof PersonalGuarantorFormData) => {
        setPreview(null)
        form.setValue(fieldName, undefined)
    }

    const onSubmit = (data: PersonalGuarantorFormData) => {
        // Create FormData object to send to the server
        const formData = new FormData()

        // Add all text fields
        formData.append("fullName", data.fullName)
        formData.append("fatherHusbandName", data.fatherHusbandName)
        formData.append("motherName", data.motherName)
        formData.append("dateOfBirth", data.dateOfBirth)
        formData.append("nationality", data.nationality)
        formData.append("nationalIdNumber", data.nationalIdNumber)
        formData.append("mobileNumber", data.mobileNumber)

        if (data.emailAddress) {
            formData.append("emailAddress", data.emailAddress)
        }

        formData.append("relationWithApplicant", data.relationWithApplicant)
        formData.append("presentAddress", data.presentAddress)
        formData.append("permanentMailingAddress", data.permanentMailingAddress)
        formData.append("workAddress", data.workAddress)

        // Add file fields if they exist
        if (data.photo) {
            formData.append("photo", data.photo)
        }

        if (data.nidFront) {
            formData.append("nidFront", data.nidFront)
        }

        if (data.nidBack) {
            formData.append("nidBack", data.nidBack)
        }

        if (data.supportingDocument) {
            formData.append("supportingDocument", data.supportingDocument)
        }

        console.log("Form submitted as FormData", formData)

        // Example of how to send the FormData to a server
        // const submitForm = async () => {
        //   try {
        //     const response = await fetch('/api/submit-guarantor', {
        //       method: 'POST',
        //       body: formData,
        //     })
        //     const result = await response.json()
        //     console.log('Success:', result)
        //   } catch (error) {
        //     console.error('Error:', error)
        //   }
        // }
        // submitForm()
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600">Personal Guarantor</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Row 1: Full Name and Father's/Husband's Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Full Name (as per National ID) <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fatherHusbandName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Father's/Husband's Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter father's/husband's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 2: Mother's Name and Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="motherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Mother's Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter mother's name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Date of Birth <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 3: Nationality and National ID Number */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nationality"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Nationality <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select nationality" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {nationalities.map((nationality) => (
                                                    <SelectItem key={nationality} value={nationality}>
                                                        {nationality}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nationalIdNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            National ID Number (NID) <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter NID number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 4: Mobile Number and Email Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="mobileNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            Mobile Number <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="+880" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emailAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email address" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 5: Relation with Applicant */}
                        <FormField
                            control={form.control}
                            name="relationWithApplicant"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Relation with Applicant <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select relation" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {relations.map((relation) => (
                                                <SelectItem key={relation} value={relation}>
                                                    {relation}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Photo Upload Section */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Photo</Label>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => cameraInputRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Camera className="h-4 w-4" />
                                    Take Photo
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => photoInputRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Photo
                                </Button>
                            </div>
                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="user"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                            <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            {photoPreview && (
                                <div className="relative inline-block">
                                    <Image
                                        height={300}
                                        width={300}
                                        src={photoPreview || "/placeholder.svg"}
                                        alt="Photo preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                        onClick={() => removeFile(setPhotoPreview, "photo")}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* NID Document Upload - Front and Back */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">NID Front Side</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => nidFrontInputRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload NID Front
                                </Button>
                                <input
                                    ref={nidFrontInputRef}
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleNidFrontUpload}
                                    className="hidden"
                                />
                                {nidFrontPreview && (
                                    <div className="relative inline-block">
                                        <Image
                                            height={300}
                                            width={300}
                                            src={nidFrontPreview || "/placeholder.svg"}
                                            alt="NID front preview"
                                            className="w-32 h-32 object-cover rounded-lg border"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                            onClick={() => removeFile(setNidFrontPreview, "nidFront")}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium">NID Back Side</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => nidBackInputRef.current?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload NID Back
                                </Button>
                                <input
                                    ref={nidBackInputRef}
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleNidBackUpload}
                                    className="hidden"
                                />
                                {nidBackPreview && (
                                    <div className="relative inline-block">
                                        <Image
                                            height={300}
                                            width={300}
                                            src={nidBackPreview || "/placeholder.svg"}
                                            alt="NID back preview"
                                            className="w-32 h-32 object-cover rounded-lg border"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                            onClick={() => removeFile(setNidBackPreview, "nidBack")}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Supporting Document Upload */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Supporting Document</Label>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => supportingDocInputRef.current?.click()}
                                className="flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Supporting Document
                            </Button>
                            <input
                                ref={supportingDocInputRef}
                                type="file"
                                accept="image/*,.pdf,.doc,.docx"
                                onChange={handleSupportingDocUpload}
                                className="hidden"
                            />
                            {supportingDocPreview && (
                                <div className="relative inline-block">
                                    <Image
                                        height={300}
                                        width={300}
                                        src={supportingDocPreview || "/placeholder.svg"}
                                        alt="Supporting document preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                        onClick={() => removeFile(setSupportingDocPreview, "supportingDocument")}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Address Fields */}
                        <FormField
                            control={form.control}
                            name="presentAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Present Address <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter present address" className="min-h-[80px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="permanentMailingAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Permanent & Mailing Address <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter permanent & mailing address" className="min-h-[80px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="workAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Work Address <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter work address" className="min-h-[80px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Submit Personal Guarantor Information
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
