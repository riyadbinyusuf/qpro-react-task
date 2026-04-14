'use server';

import type { FormStateType } from "@/utils/types";
import toast from "react-hot-toast";

export async function formAction(_:unknown, formData: FormData) : Promise<FormStateType> {

  const payload = Object.fromEntries(formData.entries());

  console.log('Submitted data', payload);
  toast.success("Form submitted successfully!");
  return {
    status: "Success",
    message: "Submitted successfully",
    data: payload,
  }
}