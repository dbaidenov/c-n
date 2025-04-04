import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import React, { useId } from "react";

export function AuthFields({
  formData,
  errors,
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
}) {
  const loginId = useId();
  const passwordId = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type="login"
          placeholder="Enter your login"
          name="login"
          required
          defaultValue={String(formData?.get("login") || "")}
        />
        {errors?.login && <div>{errors.login}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          defaultValue={String(formData?.get("password") || "")}
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
}
