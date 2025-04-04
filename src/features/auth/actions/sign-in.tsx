"use server";

import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { AuthFormState } from "@/shared/types/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const formDataSchems = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export async function signInAction(
  state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchems.safeParse(data);

  if (!result.success) {
    const formatedErrors = result.error.format();
    return {
      formData,
      errors: {
        login: formatedErrors.login?._errors.join(", "),
        password: formatedErrors.password?._errors.join(", "),
        _errors: formatedErrors._errors.join(", "),
      },
    };
  }

  const verifyUserResult = await verifyUserPassword(result.data);

  if (verifyUserResult.type === "right") {
    await sessionService.addSession(verifyUserResult.value);
    redirect("/");
  }

  const errors = {
    "wrong-login-or-password": "Неверный логин или пароль",
  }[verifyUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
}
