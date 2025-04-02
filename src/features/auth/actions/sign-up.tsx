"use server";

import { left } from "@/shared/lib/either";

export async function signUpAction(state: unknown, formData: FormData) {
  console.log(formData.get("login"));
  console.log(formData.get("password"));

  return left("message");
}
