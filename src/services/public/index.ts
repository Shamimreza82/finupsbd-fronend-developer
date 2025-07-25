"use server";

import { EmiCalculatorPayload } from "@/types/public/emiCalculator";





export const emiCalculatorApi = async (payload: EmiCalculatorPayload) => {
    // console.log(payload)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/public/emi-calculator`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const jsonData = await res.json();
    // console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error Emi calculator:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};



export const applicationTracking = async (payload: {applicationId: string, phone: string}) => {
    console.log(payload)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/application/application-tracking`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const jsonData = await res.json();
    // console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error Application Tracking api call faild:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};


export const forgotApplication = async (payload: {email: string}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/application/application-forget`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const jsonData = await res.json();
    // console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error forgot application api call:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};



// export const guarantorInfoUpdate = async (payload:  ) => {
//     console.log(payload)
//   try {
//     const res = await fetch( `${process.env.NEXT_PUBLIC_BASE_API}/application/applicant-guarator-info`, 
//       {
//         method: "POST",
//         body: JSON.stringify(payload),
//       },
//     );

//     const jsonData = await res.json();
//     // console.log(jsonData)
//     return jsonData;
//   } catch (error) {
//     console.error("Error forgot application api call:", error);
//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : "An unknown error occurred",
//     };
//   }
// };
