"use server"

import { DecodedUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { getCurrentUser } from "../AuthService";




const url = process.env.NEXT_PUBLIC_BASE_API

export const getAllApplicationFromUser = async (id: string) => {

    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
        throw new Error("No authentication token found in cookies");
    }


    try {
        const res = await fetch(`${url}/users/get_all_application/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })

        return res.json()

    } catch (error) {
        console.log(error)
    }

}