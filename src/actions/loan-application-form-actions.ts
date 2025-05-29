"use server";

import type { FormData } from "@/context/loan-application-form-context";
import { revalidatePath } from "next/cache";

// Your backend API URL and token
const BACKEND_API_URL = process.env.BACKEND_API_URL;
const API_TOKEN = process.env.API_TOKEN;

// Check if environment variables are available
if (!BACKEND_API_URL) {
  console.warn("BACKEND_API_URL environment variable is not set");
}

if (!API_TOKEN) {
  console.warn("API_TOKEN environment variable is not set");
}

export async function submitApplication(formData: FormData) {
  console.log(formData.personalInfo);
  try {
    if (!BACKEND_API_URL) {
      throw new Error("Backend API URL is not configured");
    }

    // Send data to your backend server
    const response = await fetch(`${BACKEND_API_URL}/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : "",
      },
      body: JSON.stringify(formData.personalInfo),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(
        errorData.message ||
          `Failed to submit application: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();

    revalidatePath("/loan-application");
    return {
      success: true,
      applicationId: result.applicationId || result.id || "APP-" + Date.now(),
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to submit application",
    };
  }
}

export async function updateApplication(
  applicationId: string,
  formData: FormData,
) {
  try {
    if (!BACKEND_API_URL) {
      throw new Error("Backend API URL is not configured");
    }

    // Update data on your backend server
    const response = await fetch(
      `${BACKEND_API_URL}/application/${applicationId}`,
      {
        method: "PUT", // or PATCH depending on your API
        headers: {
          "Content-Type": "application/json",
          Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : "",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(
        errorData.message ||
          `Failed to update application: ${response.status} ${response.statusText}`,
      );
    }

    revalidatePath("/loan-application");
    return { success: true };
  } catch (error) {
    console.error("Error updating application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update application",
    };
  }
}

export async function getApplication(applicationId: string) {
  try {
    if (!BACKEND_API_URL) {
      throw new Error("Backend API URL is not configured");
    }

    // Fetch data from your backend server
    const response = await fetch(
      `${BACKEND_API_URL}/application/${applicationId}`,
      {
        headers: {
          Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : "",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(
        errorData.message ||
          `Application not found: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching application:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch application",
    };
  }
}
