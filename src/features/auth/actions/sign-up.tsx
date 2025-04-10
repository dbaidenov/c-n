"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { AuthFormState } from "@/shared/types/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const formDataSchems = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export async function signUpAction(
  prevState: AuthFormState,
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

  const createUserResult = await createUser(result.data);

  if (createUserResult.type === "right") {
    await sessionService.addSession(createUserResult.value);
    redirect("/");
  }

  const errors = {
    "user-login-exists": "Пользователь с таким login уже существует",
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
}
