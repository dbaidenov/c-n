"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { right } from "@/shared/lib/either";
import { AuthFields } from "../ui/auth-fields";
import { useState } from "react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {};
  return (
    <AuthFormLayout
      onSubmit={handleSubmit}
      title="Sign In"
      fields={<AuthFields />}
      error={<ErrorMessage error={right(null)} />}
      description="Wellcome back!"
      actions={<SubmitButton>Sign Up</SubmitButton>}
      link={
        <BottomLink
          text="Dont have an account?"
          linkText="Sign up"
          url="/sign-up"
        />
      }
    />
  );
}
