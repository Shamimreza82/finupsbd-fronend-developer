import { z } from "zod"

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

// Allowed file types
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_DOCUMENT_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]

// Schema for document validation
export const documentInfoSchema = z.object({
  profileImage: z
    .object({
      name: z.string(),
      type: z.string().refine((val) => ACCEPTED_IMAGE_TYPES.includes(val), {
        message: "File must be JPEG, JPG, PNG, or WEBP",
      }),
      size: z.number().refine((val) => val <= MAX_FILE_SIZE, {
        message: `File size must be less than 5MB`,
      }),
      dataUrl: z.string(),
    })
    .refine((val) => val.dataUrl.length > 0, {
      message: "Profile image is required",
    }),
  passport: z
    .object({
      name: z.string(),
      type: z.string().refine((val) => ACCEPTED_DOCUMENT_TYPES.includes(val), {
        message: "File must be JPEG, JPG, PNG, WEBP, or PDF",
      }),
      size: z.number().refine((val) => val <= MAX_FILE_SIZE, {
        message: `File size must be less than 5MB`,
      }),
      dataUrl: z.string(),
    })
    .refine((val) => val.dataUrl.length > 0, {
      message: "Passport document is required",
    }),
  certificate: z
    .object({
      name: z.string(),
      type: z.string().refine((val) => ACCEPTED_DOCUMENT_TYPES.includes(val), {
        message: "File must be JPEG, JPG, PNG, WEBP, or PDF",
      }),
      size: z.number().refine((val) => val <= MAX_FILE_SIZE, {
        message: `File size must be less than 5MB`,
      }),
      dataUrl: z.string(),
    })
    .refine((val) => val.dataUrl.length > 0, {
      message: "Certificate is required",
    }),
})

export type DocumentInfoValues = z.infer<typeof documentInfoSchema>

export type FileWithPreview = {
  name: string
  type: string
  size: number
  dataUrl: string
}
